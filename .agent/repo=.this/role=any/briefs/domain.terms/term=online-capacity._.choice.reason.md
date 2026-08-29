# domain.term.choice.reason: online-capacity

## .etymology

`online-capacity` — *capacity* in the sense of "the capability a provider has", graded rather than
binary. the referrer's wish asks, per provider, "how do i book — online or phoned?". a naive answer
is a boolean (has-online-scheduler / not). the real world is an ordinal: a self-schedule calendar, a
request form, a prior-patient portal, and phone-only are four distinct capabilities, and to blur
them hides the one that matters — whether a NEW patient can actually get a date online.

chosen over `online-scheduler` because that word names only the top of the ladder and reads as a
yes/no. `capacity` admits the tiers and admits the null: a provider can have a portal (online, yes)
and still offer a new patient no online path (capacity, no). the word had to hold that gap.

## .disputes

### dispute: patient-portal counts as online capacity  —  raised 2026-08-22  —  status: RESOLVED (portal-prior ranks BELOW online-request)
- raised.by  = referrer (self)
- claim      = a practice with a patient portal has an online-schedule path — it should count as
               online capacity, arguably the top tier.
- counter    = a patient portal is gated to PRIOR patients; a new patient (the referral's subject)
               cannot use it to get seen. so for the new-patient question it is weaker than an open
               request form, which any new patient may submit. the tier order must be
               `live-calendar` > `online-request` > `portal-prior` > `phone-only`, NOT portal-first.
               to count a portal as top capacity would tell a new patient "schedule online here" when
               they cannot.
- resolution = keep the four-tier ordinal with `portal-prior` below `online-request`; a portal is
               online capacity for prior patients only, never for the new-patient question.

## .evidence

- **the tier was forced by a real false-positive**: an early pass counted any site with a portal or a
  date input as online-schedulable. the probe (`probe.onlinecapacity.earliest.play.ts`) caught two of
  these — one practice's "date input" was a date-of-birth field, and another's `/contact/` was
  a contact form, not a scheduler. both collapsed from a presumed `live-calendar` to `online-request`
  once probed. the tier exists because "has an online form" ≠ "a new patient can pick a date".
- **contract usage**: `online-capacity` is a contract concept — `asOnlineCapacity` returns
  `{ tier, earliest }`, `onlineCapacityTier` is a review row field, and `onlineCapacityByPractice`
  sorts by `tierOrder` — not merely prose.
- **invariant**: only the `live-calendar` tier may carry a non-null `earliest`; every other tier's
  earliest is `null` by construction, because no public concrete date is observable without a call or
  a submitted request.
