# rule.always.spawn-diagnose-route-on-symptom-intake

> **when a human opens with a symptom, stamp the diagnosis route FIRST — then answer.**

`rhx diagnose.health init` is the first move of any health query, never a tool reached for
once the conversation has already wandered. the route is the intake instrument; a
conversation is not.

> .note = the -ing tokens below sit inside owner verbatim quotes.

## .the cue — a symptom query has begun

any of these, and the moment has come:

| the human says | example |
|---|---|
| a bodily complaint, first-person or on behalf of another | *"my cat stopped eating"* |
| a symptom plus a duration | *"this has been going on for days"* |
| *"what is this"* / *"is this normal"* / *"should I worry"* about a body | |
| a reaction after an exposure — a drug, a vaccine, a procedure, a meal | *"she limps since the shot"* |
| a request to reason about a health scenario at all | |

⚠️ **the cue is the FIRST such message, never the third.** by the third the intake is
already scattered across the transcript, and the parts a route would have demanded are the
parts that were never asked.

## .the act

```sh
rhx diagnose.health init --at ".route/v<date>.case=<slug>"
```

then write `0.seed.md` — the verbatim words, the event ledger, the graded facts — and only
then answer in prose. the prose answer and the route are **not** alternatives; the seed is
what the answer draws from.

## .why — a conversation loses what a route demands

- **the verbatim decays.** a human's own words carry detail that paraphrase discards.
  *"like elastic band"* and *"more relief when rub"* are discriminators; a tidied summary
  keeps the site and drops the character, which is the half that discriminates.
- **the gap list is never enumerated.** free prose covers what was asked. the route's
  `1.3.intake.gaps` stone demands what was **not** — and the unasked question is where the
  dangerous scenario hides.
- 🔴 **the human's own prior goes unchallenged.** a conversation is cooperative, so it
  inherits how the human framed it. a route re-ranks against the literature regardless of
  what the human believes is relevant.
- 🔴 **prose has no grade column.** a route forces every datum to carry
  `owner-reported` / `observed` / `record` / `inferred`. prose lets the author's own
  derivation wear the human's authority, invisibly.

## 🔴 .the worked example — 2026-09-05

⚠️ **generalized to its shape.** the case detail is private (`rule.forbid.pii`); what transfers is the
sequence, and the sequence is the lesson.

a human opened with a midline abdominal pain that sharpened over hours, and was answered
free-form. **three follow-up messages later** they added, unprompted:

1. a multi-day gastrointestinal symptom
2. a pain modifier
3. 🔴 **a reproductive-status fact — offered as an aside, with their own guess that it was unrelated**

each re-ranked the differential. **the third was decisive**, because that combination is the shape
of a missed ectopic pregnancy: the gastrointestinal symptom that appears to explain the pain away is
also a feature of the emergency.

⇒ 🔴 **the human volunteered the decisive fact and attached a wrong prior to it.** that is the
general pattern worth the guard: **a layperson's own assessment of relevance is itself unreliable,
and it arrives welded to the datum.** a route demands reproductive status at `1.3.intake.gaps` in
the first minute and never waits for it to be offered. the conversation reached it in the fourth
message, **by luck**.

### what the route then caught that the prose had already shipped

once stamped, the route's self-reviews found the free-form answer had asserted:

| the claim's shape | fate |
|---|---|
| an **onset** time | ❌ **manufactured** — the human had reported how long the *escalation* ran, never the onset. the analysis silently converted one into the other |
| *"the duration is past the self-limit window"* | ❌ **contradicted by the very page cited for it** |
| *"the gastrointestinal picture points away from appendicitis"* | ❌ contradicted — the source lists diarrhoea **as** an appendicitis symptom |
| a pain modifier read as diagnostic | ⚠️ **unsourced** |

⚠️ **all four had already reached the human.** the route did not prevent them; it caught
them. a route stamped at the first message would have graded the onset claim `inferred`
before it was ever spoken.

⇒ that is the cost this rule exists to prevent, and it is not hypothetical.

## ⚠️ .the carve-out — an emergency outranks the ceremony

**if the report reads as an emergency, say so FIRST, in plain words, before you stamp a
single artifact.** a route is a reason instrument, not a triage gate, and no one needs a
stamped stone while they need an ambulance.

per `motto.not-medical-advice`:

> if this is a medical emergency, call your local emergency number now.

stamp the route after the escalation is spoken, never before.

## .the caveats

- **the route does not replace the answer.** a human in pain gets a direct, legible reply.
  the route is the substrate; the reply is the deliverable.
- **do not stamp a route for a general knowledge question.** *"what does metformin do?"* is
  a lookup, not an intake. the cue is a **reported symptom in a specific body**.
- **one route per case, never per message.** a follow-up on a live case drives the extant
  route; it does not stamp a second.
- ⚠️ **the ceremony is real and it is not free.** the worked example spent many turns on
  self-review gates while a human sat with live pain. the rule is *stamp first*, not
  *finish the route before you speak*. **speak early, drive after.**

## .enforcement

- a symptom query answered with no route stamped = **blocker**
- a route stamped with no `0.seed.md` that holds the verbatim words = **blocker**
- an emergency-shaped report where the route was stamped before the escalation was
  spoken = **blocker**
- a general knowledge question that stamped a route = **nitpick** (ceremony with no case)

## .see also

- `motto.not-medical-advice` — the guardrail and the escalation carve-out
- `rule.require.recommendation-disclaimer` — what every reply that carries guidance owes
- `rule.forbid.pii` — the seed holds a persona handle, never an identity
- `rule.require.accrue-research` — persist a citation in the same turn you make it
- `define.causal-chain-frame` — the four-node frame `1.2.intake.structure` builds toward
- `rule.require.superposition-until-elimination` — why the seed keeps rival scenarios live
