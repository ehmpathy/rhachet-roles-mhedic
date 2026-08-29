# db.access — provider access-profile db (local on-disk, one JSON per practice)

## .what

a local on-disk db of **access profiles** for every dermatology provider in
`inventory.of=dermatologists-near-panama-city-beach`. one JSON file per **practice** (the real
schedule unit — phone / portal / book-page are shared across a practice's clinicians), each with
the providers who work there nested inside.

## .why practice-primary, not one-file-per-doctor

the appointment mechanism is a **practice-level** fact: a solo doctor and a 10-doctor group each
expose ONE phone line, ONE patient portal, ONE book-page. a per-doctor db would duplicate that
access object N times and drift. so the record's primary key is the practice; `providers[]` lists
the individual clinicians (with NPI + license) who book through that access surface.

## .the record schema

```jsonc
{
  "practiceKey": "[practice-slug]",                     // slug, the db primary key
  "practiceName": "[CLINIC]",                           // the practice's trade name
  "corporateEntity": "[CLINIC]",                        // NPI org name, if any
  "offices": [                                          // one per physical site in-radius
    { "address": "...", "city": "...", "zip": "...", "driveBandFromPCB": "0-15min" }
  ],
  "providers": [                                        // clinicians who book here
    { "name": "...", "npi": "...", "license": "...", "licenseStatus": "Clear/Active", "mohs": true }
  ],
  "contact": {
    "phonePrimary": "...", "phoneAlt": "...", "fax": "...", "email": "...",
    "site": "https://..."
  },
  "schedule": {
    "mechanism": ["phone", "web-form", "patient-portal", "self-schedule", "app"],  // observed
    "selfScheduleOnline": false,                        // a live-slot self-schedule page?
    "portal": { "name": "...", "url": "..." },          // or null
    "bookUrl": "...",                                   // or null
    "notes": "phone-gated — no live-slot calendar observed"
  },
  "availabilitySignal": {
    "rung": 5,                                          // howto.probe-real-availability ladder 1-5
    "signal": "phone-gated",
    "observedWait": null,                              // filled only if a real slot/turnaround seen
    "reCheckMethod": "call the office; re-run the census availability probe"
  },
  "citations": [ { "field": "...", "url": "...", "verbatim": "..." } ],  // every claim -> a bhrowser read
  "gaps": [ "email unconfirmed", "..." ],
  "retrievedAt": "2026-08-15",
  "via": "bhrowser"
}
```

## .the fields the loop must fill (per provider ask)

1. **contact info** — phone(s), fax, email, site
2. **appointment mechanism** — phone / web-form / portal / self-schedule / app, with the portal
   name + URL and any live-book URL
3. **schedule availability** — the `availabilitySignal` per `howto.probe-real-availability` (rung
   1–5); a real slot or turnaround if observable, else the `phone-gated` flag + re-check method

## .done when

every practice in the inventory has a record here whose `contact`, `schedule`, and
`availabilitySignal` are filled from a **bhrowser read** (cited), or carry an explicit `gaps` entry
that names what could not be observed and how to get it. never a guessed wait
(`rule.require.availability-probe`).

## .the records (2026-08-22 pass)

one JSON per practice. each `mechanism` + `availabilitySignal` was read from a bhrowser probe
(`probe.access.play.ts`, `probe.access.extra.play.ts`) or the CMS NPI frame, and cited.

| record | mechanism | availability rung | note |
|--------|-----------|-------------------|------|
| `[clinic-1]` | phone · portal · self-schedule | **1 (live SolutionReach)** | live-slot probe confirmed a real calendar flow |
| `[clinic-2]` | phone · portal · self-schedule | **2 (live Klara widget)** | probe confirmed reason-select → calendar |
| `[clinic-3]` | phone · portal | **4 (info page, downgraded)** | Make An Appointment is informational, not a calendar |
| `[clinic-4]` | phone · email | 5 (phone-gated) | reception email, no portal |
| `[clinic-5]` | phone · email | 5 (phone-gated) | [PROVIDER] license Retired |
| `[clinic-6]` | phone | 5 (NPI frame only) | own site not located |
| `[clinic-7]` | phone | 5 (NPI frame only) | may dedupe into [clinic-1] |
| `[clinic-8]` | phone | 5 (NPI frame only) | phone unconfirmed |
| `[clinic-9]` | phone | 5 (NPI frame only) | real FL entity found: [ADDRESS], [PHONE] |
| `[clinic-10]-santa-rosa` | phone | 5 (NPI frame only) | new provider, frame-only |
| `[clinic-11]-fwb` | — | 6 (credential-inactive) | DO NOT REFER — license Null And Void |
| `edge-solo-phone-gated` | phone | 5 (phone-gated) | 5 solo providers, [PROVIDER]/[PROVIDER]/[PROVIDER] phones cited |

**the headline result (after the live-slot probe)**: exactly **one** practice —
**[clinic-1]** — exposes a genuine **rung-1 live self-schedule** (SolutionReach: pick New
patient → live calendar). **[clinic-2]** is a real **rung-2** online-book widget (Klara:
select reason → calendar). The third link (**[clinic-3]** "Make An Appointment") turned
out to be an **informational page, not a calendar** — its self-schedule claim was withdrawn to phone
+ portal (rung 4). So the earlier "3 self-schedule links" read was optimistic: only **one** is a true
live-slot surface, one is a real widget, one was a false positive. This correction is the whole point
of following the link instead of trusting it.

**a per-provider index** lives at `providers.json` — 34 rows, one per named clinician, each mapped to
its practice access record. an NPI-frame fold (`frame.npi.play.ts`) now carries a **cited NPI + license
number + registered phone** for every provider the CMS Dermatology frame holds (26 of 34). the fold
also: (a) found the **real FL [clinic-9]** ([ADDRESS], [PHONE] — the earlier .com was a NC
namesake), (b) resolved **[PROVIDER]'s** individual NPI + phone ([PHONE]), (c) gave **three solo
clinicians** their registered phones, (d) proved the **[ADDRESS] roster** (7 out-of-state
clinicians) is **AL/GA-registered** — flagged `localRegistered:
false`, (e) reclassified **one clinician** to [clinic-3], and (f) surfaced a **new provider**
in Santa Rosa Beach.

**license verification is now complete for every frame-held provider.** the FL DOH/MQA license frame
(`frame.license.play.ts`) re-read all 18 cited license numbers by number: **18 Clear/Active, 2 adverse**
— **[PROVIDER] ([LICENSE] = Retired)** and **[PROVIDER] ([LICENSE] = Null And Void)** are the
only DO-NOT-REFER flags, both MQA-confirmed. every other clinician the NPI frame holds now carries a
`licenseStatus: Clear/Active` traced to the MQA registry.

**still-open coverage gaps** (tracked per-record in each file's `gaps`):
- 8 providers are absent from the NPI Dermatology frame — each needs an NPI/taxonomy re-check or a
  PA/DO license-frame pass
- the 7 out-of-state Southeastern rows need a live-local-clinic check before referral
- the two live book surfaces were not driven to an actual next-open DATE (would need form input)
- [clinic-9] + the Santa Rosa Beach solo provider's own websites not yet located (contact from the frame only)

## .access-coverage review (deterministic proof, per provider)

whether each provider was actually access-searched is NOT asserted — it is **proven deterministically**
by `../review.access.play.ts`, which audits these records against `providers.json` (no network; same
db → same verdict) and, per provider, classifies each citation's host as registry / directory /
salespage. only a **salespage** read proves an appointment-mechanism search. it emits `N blockers /
N nitpicks` and names every unproven provider. governed by
`../../../briefs/rule.require.access-coverage-review.[rule].md`.

**live verdict (2026-08-22): `7 blockers / 23 nitpicks`** over 35 providers — 26 PROVEN, 2 EXEMPT
([PROVIDER], [PROVIDER] = do-not-refer). the **7 UNPROVEN** (appointment mechanism inferred from the NPI
registry only, never read on the provider's own salespage) are the honest worklist:

| provider | practiceKey | why unproven |
|----------|-------------|--------------|
| [PROVIDER], MD | [clinic-8] | registry-only; no practice site located |
| [PROVIDER], MD | [clinic-10]-santa-rosa | registry-only; no practice site located |
| [PROVIDER], MD | edge-solo-phone-gated | registry-only; no practice site located |
| [PROVIDER], DO | edge-solo-phone-gated | registry-only; no practice site located |
| [PROVIDER], MD | edge-solo-phone-gated | registry-only; no practice site located |
| [PROVIDER], MD | edge-solo-phone-gated | registry-only; no practice site located |
| [PROVIDER], MD | edge-solo-phone-gated | registry-only; no practice site located |

so the access dimension is **NOT yet access-exhaustive**: 26 of 35 providers are salespage-proven,
7 need their own entrypoint located + read, 2 are do-not-refer. the 21 homepage-only PROVEN rows are
nitpicks (mechanism proven, but the live book/portal slot not followed to a next-open date).

## .see also

- `../../briefs/howto.probe-real-availability.[lesson].md` — the availability ladder these records encode
- `../../briefs/rule.require.availability-probe.[rule].md` — no guessed waits
- `../readme.md` — the census that produced the roster these profiles enrich
- `../../../briefs/inventory/inventory.of=dermatologists-near-panama-city-beach.md` — the source inventory
