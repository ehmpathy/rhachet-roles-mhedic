# inventory.of=dermatologists-near-panama-city-beach

- **topic**: every dermatology provider that serves within ~1-hour drive of Panama City Beach, FL, with phone, distance, patient-review score, and skin-cancer / Mohs capability
- **scope**: providers with an office reachable in roughly 60 minutes of Panama City Beach (32407/32413) — Bay County core (PCB, Panama City, Lynn Haven, Callaway) + the western band (Santa Rosa Beach, Miramar Beach/Destin, Niceville) + the northern edge (Marianna). towns beyond ~60 min (Fort Walton Beach, Chipley, Port St. Joe, DeFuniak Springs) are named as edge/out-of-band.
- **disclaimer**: ⚠️ **this tool is for informational purposes only and does not constitute medical advice.** this inventory is a research aid, not a recommendation of any provider. verify credentials, insurance, and current availability directly with each office before you act. patient-review scores reflect bedside-manner sentiment, **not** clinical skill or skin-cancer outcomes.
- **freshness caveat**: providers, addresses, phones, scores, and review counts perish. every row is a snapshot on the retrieval date; **none carries a live bookable slot** (see `.gaps`). re-verify by phone before you rely on it.
- **retrieval-date**: 2026-08-15
- **via**: bhrowser (rhachet-roles-bhrowser), headful session

---

## .how coverage was proven (the exhaustiveness method)

this file was wrong twice before it was right, and both corrections are kept on the record because they are the proof:

- **draft 1 (recall)** listed 6 practices from memory + ad-hoc search and *asserted* completeness. it missed a 10+-provider group at one Panama City address and four solo doctors.
- **draft 2 (single-directory census)** swept one directory — Healthgrades — across 5 towns. bounded and auditable, but **single-source**: it could only ever be "exhaustive of Healthgrades," which is one unproven map of reality.
- **draft 3 (this one) anchors on an authoritative frame.** the escape from single-source is not "more crowd directories" — it is a population frame that is complete by construction. every US clinician who submits insurance claims must hold an **NPI (CMS National Provider Identifier)**, and the registry is queryable by taxonomy + city. so the NPI registry is the **frame**; the crowd directories become capture-recapture cross-checks against it.

the method, in order:

1. **frame** — query the NPI registry (taxonomy = Dermatology) for each anchor city: Panama City (33 results), Panama City Beach (12), Marianna (5), Lynn Haven (0). this is the population, not a sample.
2. **enumeration cross-check** — the Healthgrades per-town census (PCB 15, Panama City 23, Santa Rosa Beach 14, Miramar Beach 18, Marianna 1) supplies the patient-facing star score + review count + distance the NPI frame lacks.
3. **reconcile (capture-recapture)** — diff the two. **the diff is the whole point**: providers/orgs in the NPI frame but absent from Healthgrades are the practices single-source hid (see the NPI-frame fact below — it found at least four local practices Healthgrades never showed).
4. **union + dedupe + geo-filter** — collapse a provider who appears in several sources to one row; drop out-of-area registered locations (many multi-state group clinicians register in GA/AL) and non-derm taxonomies (internal med, ophthalmology).
5. **capability cross-check** — practice sites ([CLINIC] salespages) confirm Mohs / melanoma capability verbatim.

**draft-4 (this pass) mechanized + peer-reviewed both halves.** the method is now two runnable
engines under `src/domain.roles/referrer/skills/census.providers/`:
- **search** (`frame.npi.play.ts`) — a systemic NPI-frame pull, ZIP-partitioned across 20 radius
  ZIPs; found **38 in-radius dermatology providers/orgs** (13 Mohs), and correctly EXCLUDED the
  out-of-area records (Dothan, Athens GA, Tallahassee, Tampa) that the crowd directory over-counted.
- **review** (`review.census.play.ts`) — an INDEPENDENT reproduction over a wider 26-ZIP superset
  that diffs against the claimed roster and emits a `N blockers / N nitpicks` verdict. round 1
  returned **16 blockers** (14 real derm providers the census had missed — a Destin practice,
  a Santa Rosa Beach solo provider, one clinician's own NPI, several individual clinicians,
  a 2nd Chipley office, two [CLINIC] satellites, and two FWB solo providers — plus 2
  non-derm). after those were folded in, round 2 returned **0 blockers,
  2 nitpicks** (the 2 correctly-excluded non-derm: an Internal Medicine + an Ophthalmology record).

per `rule.require.census-peer-review`, **0 blockers on an independent reproduction = exhaustive for
the declared frame + filter** — bounded, never absolute. the bound: *the NPI Dermatology frame for
the declared ZIP set within ~1hr of PCB, 0-blocker reviewed on a 26-ZIP superset reproduction.*

**draft-5 adds a SECOND independent frame — the FL DOH / MQA medical-license registry**
(`frame.license.play.ts`) — because the NPI frame is blind to cash-only providers (a derm who
bills no insurance need not hold an NPI). the license registry is complete for every legally-
licensed FL physician, insurance or not. the engine verifies each roster provider **by license
number** (harvested from the NPI frame; DOs carry `OS` licenses, MDs `ME`) and reads the exact
`License Status` field. live verdict: **16 Clear/Active, 2 blockers, 2 nitpicks (+18 org NPIs)**.
the 2 blockers are real, actionable findings — the license on the NPI record is no longer active:

| provider | NPI license | MQA status | action |
|----------|-------------|-----------|--------|
| **[PROVIDER]** ([CLINIC], Niceville) | [LICENSE] | **Retired** (1/26/2026; "no current FL practice location") | verify a newer active license before referral, or drop |
| **[PROVIDER]** (FWB) | [LICENSE] | **Null And Void** (expired 1/31/2020) | likely a stale NPI record; do not refer against this license |

these two do NOT invalidate the census — they are exactly what the second frame exists to catch: a
provider on the enumeration frame whose license credential is stale. flag for human follow-up, not
silent inclusion. (two other clinicians = nitpicks: no license number harvested from NPI, re-check.)

**residual honesty — what is STILL not proven**:
- **the frame query is not itself peer-reviewed.** one agent (me) ran it; no independent reviewer re-ran the NPI query and diffed the result. a true peer review would be a second pass that reproduces the frame and challenges the geo-filter choices. that has not happened.
- **NPI geo-filter is imperfect.** the registry filters on a provider's *registered location address*, which may be a bill-to / HQ address, not every practice site — so a local doctor registered elsewhere can be missed by a city query, and an out-of-area doctor can appear via a group phone. the fix (not yet done) is a statewide taxonomy pull + radius geo-filter on every listed address.
- **index discovery was convenience, not census.** Healthgrades was picked because it surfaced in a search; the *space of directories* (WebMD, Vitals, Zocdoc, Castle Connolly, insurer directories, Google Maps) was never itself enumerated or peer-reviewed. NPI as the frame reduces the stakes of that gap — but does not close it.

---

## .facts

### fact: Bay County core — dermatology providers within ~10 mi of Panama City Beach

distances are Healthgrades' "miles away" from the PCB centroid (or Panama City centroid where the provider only surfaced there). score = stars out of 5; n = review count.

| provider | practice / address | phone | score (n) | skin-cancer / Mohs |
|---|---|---|---|---|
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PCB / PC | [PHONE] | 4.8 (21) | yes (practice does Mohs) |
| [PROVIDER], DO | [CLINIC] — [ADDRESS], PCB / PC | [PHONE] | 5.0 (1) | yes (Mohs surgeon) |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PC | [PHONE] | 4.4 (20) | yes (skin-cancer focus) |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PC | [PHONE] | 4.2 (110) | yes |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PC | [PHONE] | 5.0 (6) | yes (double-boarded Mohs) |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PCB | [PHONE] | 3.4 (30) | yes (Mohs surgeon) |
| [PROVIDER], DO | [CLINIC] — [ADDRESS], PCB | [PHONE] | 5.0 (1) | practice does skin cancer |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PCB | [PHONE] | no score yet | practice does skin cancer |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], PCB | [PHONE] | 4.7 (69) | skin-cancer treatment + prevention |
| [PROVIDER], MD | [ADDRESS], PCB | (call — verify) | 4.2 (5) | general derm (verify) |
| [PROVIDER], MD | [ADDRESS], PCB (hospital-affiliated) | (call — verify) | 2.9 (54) | general derm; hospital-affiliated |
| [PROVIDER], MD | [ADDRESS], PC (also Marianna) | (call — verify) | 5.0 (2) | general derm |
| [PROVIDER], MD | [ADDRESS], PC | (call — verify) | 5.0 (5) | general derm |

### fact: the [ADDRESS] group — a large Panama City dermatology practice the recall-draft missed

a single address, **[ADDRESS], Panama City, FL 32405** (~2.3 mi from the Panama City centroid, ~10 mi from PCB), returned a roster of dermatologists on the Healthgrades Panama City directory. this is the biggest correction to the earlier draft.

| provider | score (n) | note |
|---|---|---|
| [PROVIDER], MD | 3.4 (39) | |
| [PROVIDER], MD | 3.6 (33) | virtual visits |
| [PROVIDER], MD | 3.8 (15) | |
| [PROVIDER], MD | 4.8 (5) | virtual visits |
| [PROVIDER], DO | 3.3 (9) | |
| [PROVIDER], MD | 3.2 (5) | |
| [PROVIDER], MD | 5.0 (3) | |
| [PROVIDER], MD | 5.0 (1) | virtual visits |
| [PROVIDER], MD | no score yet | |
| [PROVIDER], MD | 2.9 (54) | also lists a PCB Pkwy address; hospital-affiliated |

- **phone**: not published on the directory rows — **call to confirm** (this group is phone-gated like the rest); the address anchors a group practice whose brand should be verified on-site before you book.
- **caveat**: skin-cancer / Mohs capability for this group was **not** confirmed against a practice website in this pass — flagged in `.gaps` as a verify-next item.

### fact: western band — Santa Rosa Beach / Miramar Beach / Destin / Niceville (~35–70 min)

anchored on a **fellowship-trained Mohs practice ([CLINIC], [ADDRESS], Miramar Beach 32550)** — one that treats melanoma and non-melanoma skin cancer.

| provider | office | phone | score (n) |
|---|---|---|---|
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 4.3 (16) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 4.4 (7) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 4.0 (16) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 3.5 (30) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 5.0 (1) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | 5.0 (1) |
| [PROVIDER], MD | [CLINIC] — Miramar Beach | [PHONE] | no score yet |
| [PROVIDER], PA-C | [CLINIC] — Miramar Beach | [PHONE] | 5.0 (1) |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], Santa Rosa Beach | [PHONE] | 3.4 (30) |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], Santa Rosa Beach | [PHONE] | no score yet |
| [PROVIDER], MD | [CLINIC] — [ADDRESS], Niceville | [PHONE] | 4.7 (69) |
| [PROVIDER], DO | [ADDRESS], Niceville (hospital-affiliated) | (call — verify) | 3.5 (61) |
| [PROVIDER], MD | [ADDRESS], Niceville | (call — verify) | no score yet |

- **edge note**: Miramar Beach/Destin is ~45–55 min from PCB; **Niceville (~60–70 min) sits at or just past the 1-hour edge** — included for completeness, flagged as edge.

### fact: northern edge — Marianna (~1 hour NE)

| provider | office | phone | score (n) |
|---|---|---|---|
| [PROVIDER], MD | [ADDRESS], Marianna 32446 (also Panama City) | (call — verify) | 5.0 (2) |
| *([CLINIC] — Chipley [ADDRESS])* | *satellite of the [CLINIC] group* | [PHONE] | n/a |
| *([CLINIC] — Marianna office)* | *satellite of the [CLINIC] group* | [PHONE] | n/a |

### fact: NPI-frame reconciliation — practices the single-directory census MISSED

the CMS NPI registry (the authoritative frame) surfaced local dermatology entities that were **absent from the Healthgrades sweep** — proof that single-source was incomplete. these are new, bhrowser-read from the registry, and need a capability + phone confirmation pass (flagged in `.gaps`):

| entity (NPI) | address | phone | note |
|---|---|---|---|
| **[CLINIC]** ([NPI]) | [ADDRESS], Panama City 32407 | [PHONE] | a Mohs practice in PCB the census never found |
| **[CLINIC]** ([NPI]) | [ADDRESS], Panama City 32405 | [PHONE] | taxonomy "Dermatology, MOHS-Micrographic Surgery"; a distinct office/entity |
| **[CLINIC]** ([NPI]) | [ADDRESS] | [PHONE] | co-located at the [ADDRESS] PCB complex |
| **[CLINIC]** ([NPI]) | [ADDRESS] | [PHONE] | the corporate entity at the address for the [CLINIC] provider — a group affiliation to verify |
| **[CLINIC]** ([NPI]) | [ADDRESS], PCB | (verify) | one clinician's own practice entity |

the frame **also resolved two open questions** from the census draft:

- the **[ADDRESS]** "mystery group" is a **corporate group entity** ([NPI]) — i.e. the corporate entity behind **[CLINIC]**. the group's clinicians hold NPIs whose registered addresses span FL/GA/AL — many are **not** locally-registered, so a raw Healthgrades "near PCB" listing overstated the local roster.
- the anchor Bay County practice's registered name is a **[CLINIC], P.A.** — offices across PC, PCB, Marianna, Chipley, and Dothan AL — all under one practice phone line.
- a **[CLINIC]** ([NPI]) registers a bill-to address distinct from its clinic address.

- **verbatim** (NPI registry, Panama City query, one org record): "[CLINIC] ... [ADDRESS], PANAMA CITY, FL, 324072609"
- **url**: https://npiregistry.cms.hhs.gov/api/?version=2.1&taxonomy_description=Dermatology&state=FL&city=Panama%20City&limit=200

### fact: no provider publishes a live bookable slot — all are phone-gated

- **fact**: across every swept town, not one dermatology office exposed a public live-slot calendar with a next-open date; the strongest access signal is "Call Now" or a "Make an Appointment" form. an earlier Zocdoc query for Panama City / Panama City Beach returned zero bookable dermatology slots. **local access is phone-gated** — a wait figure exists only after you call. the one near-term, online-visible path remains teledermatology (documented in the referral route's availability probe).
- **verbatim** (a practice locations page): "Please note that these additional offices are open on varied days of the week. Please call our office at [PHONE] for this schedule."
- **url**: [CLINIC salespage]/locations/

---

## .gaps

- **no live availability**: no in-radius office publishes a bookable next-open slot; call each to learn its wait.
- **phones absent on some directory rows**: Healthgrades did not surface a phone for several solo listings (seven providers across the core + the group address). rows marked "(call — verify)" need a phone confirmed via the provider's own profile or a call.
- **the group address — resolved, capability still open**: the frame resolved the *name* (a multi-state corporate group = the [CLINIC] brand), but whether every provider at that address performs Mohs is unconfirmed.
- **NPI-frame practices need a capability + phone pass**: the four new entities ([CLINIC] org records read from the registry) were read from the registry, not their own sites — Mohs/melanoma capability and current phone must be verified next.
- **peer review absent**: no independent second pass reproduced the NPI frame query or challenged the geo-filter. this is a solo enumeration, not a reviewed one.
- **NPI geo-filter is city-string, not radius**: a statewide taxonomy pull with a per-address radius filter would be stricter than the per-city query used here (it would catch a locally-practicing derm registered to an out-of-town HQ).
- **index space never enumerated**: WebMD, Vitals, Zocdoc, Castle Connolly, Google Maps, and insurer plan directories were not swept and not cross-checked; directory discovery was convenience, not census.
- **review scores are sentiment, not skill**: star scores reflect bedside manner from small samples (many n=1–6); they must not be read as skin-cancer competence.
- **non-derm results excluded**: the sources also returned internal-medicine, vascular, ENT, ophthalmology, anesthesiology, and plastic-surgery providers who offer some skin services (e.g. a cosmetic-derm provider, [PROVIDER], 4.9/319) — deliberately excluded as not medical-dermatology / skin-cancer primaries.
- **edge towns not frame-queried**: Fort Walton Beach, DeFuniak Springs, Port St. Joe, Chipley were named from practice-group satellite lists, not their own NPI/Healthgrades census — treat their rosters as partial.

---

## .sources

distinct bhrowser-read URLs:

0. https://npiregistry.cms.hhs.gov/api/?version=2.1&taxonomy_description=Dermatology&state=FL&city=Panama%20City&limit=200 — **the authoritative frame** (CMS NPI registry; also queried for Panama City Beach, Lynn Haven, Marianna)
1. https://www.healthgrades.com/dermatology-directory/fl-florida/panama-city-beach — PCB dermatology census (15 derm results)
2. https://www.healthgrades.com/dermatology-directory/fl-florida/panama-city — Panama City census (23 results; surfaced the group address)
3. https://www.healthgrades.com/dermatology-directory/fl-florida/marianna — Marianna census (1 result)
4. https://www.healthgrades.com/dermatology-directory/fl-florida/santa-rosa-beach — Santa Rosa Beach census (14 results)
5. https://www.healthgrades.com/dermatology-directory/fl-florida/miramar-beach — Miramar Beach census (18 results)
6. [CLINIC salespage]/locations/ — a Bay County group practice, offices + phone
7. [CLINIC salespage] — a Mohs-capable solo practice
8. [CLINIC salespage]/locations/florida/panama-city-beach/ — a PCB group practice, office + providers
9. [CLINIC salespage]/dermatology/skin-cancer/ — that group's skin-cancer services
10. [CLINIC salespage]/destinmiramar/ — a Miramar/Destin Mohs practice
11. [CLINIC salespage]/miramar-beach-destin/ — a Miramar/Destin practice, offices + phones
