# rule.require.source-tier-carries-the-quantity

## .what

before you conclude *"no rate is available"*, confirm you queried a **tier that publishes rates.**

> 🔴 **a corpus can fail to supply a quantity BY CONSTRUCTION, and that failure is indistinguishable
> from the quantity being unpublished anywhere.**

⇒ so an absent number is a claim about **the corpus** until you have checked the tier. it becomes a
claim about **the world** only after.

## .the tiers, and what each one can and cannot carry

🔴🔴 **READ THIS FIRST — the four are NOT one ordered set.** three sit on a rank; the fourth does
not sit on it at all. a reader who takes all four as one ladder will conclude that `social` is
merely the weakest, and that is false — it is the only row that carries a datum none of the other
three can.

### the ordered triple — a genuine rank, ON ONE AXIS ONLY

**the axis is: how directly the source measures a rate.** each adjacency has a stated, mechanical
reason, per `rule.require.cite-the-adjacency-not-the-item`:

| rank | tier | example | carries | cannot carry | why it outranks the row above |
|---|---|---|---|---|---|
| 1 | **patient** | NHS, MSD consumer | escalation thresholds · normal-course baselines · the named traps | 🔴 **rates. it publishes adjectives** — *"common"*, *"usually"*, *"rarely"* | — |
| 2 | **professional** | MSD professional, StatPearls | ✅ base rates with denominators · time bounds · operational exam definitions | plain-language misreads a layperson makes | it states rates **with denominators**; the patient tier states adjectives |
| 3 | **primary** | the cited study | ✅ the measurement, its method, its population | any synthesis across conditions | it holds the **method and population**; a synthesis may drop a bound the study stated |

⚠️ **the rank holds for RATES and for naught else.** on *"what trap does a layperson fall into?"*
the order **inverts** — patient tier wins and primary tier is silent.

### 🔴 the row that is NOT on that axis

| tier | example | carries | cannot carry |
|---|---|---|---|
| **social** | forums, subreddits | lay attributions · presentation language · **real misreads in the wild** | 🔴 **any rate at all** — the corpus is survivorship-filtered |

**membership test, mechanical**: a source is `social` if its authorship is uncredentialed and its
population is self-selected. ⇒ it can never be ranked against the triple, because it answers a
different question: *how does this present in a real person's own words?*

⚠️ **each tier's strength is another's blind spot**, so the repair for an absent quantity is almost
never *"read more"* — it is *"read elsewhere."*

⇒ 🔴 **and note the tension that sentence has with the word `tier` itself.** *"elsewhere"* is a KIND
relation; *"tier"* asserts a RANK. the word is kept because the triple above genuinely is one — but
the rank is **narrow, one-axis, and stated**, never the general authority ladder the word invites.

## 🔴 the measured case

one publisher, two editions of the same topic, at two URL prefixes:

| edition | prefix | quantities yielded |
|---|---|---|
| MSD **professional** | `/professional/…` | ✅ **8 distinct, each with a primary citation** |
| MSD **consumer** | `/home/…` | 🔴 **none of the eight** |

⇒ **the same publisher, the same condition, the same day.** the only variable was the prefix.

⚠️ **and the consumer page does not announce the omission.** it reads as complete, so a route that
lands on it concludes the rate is unpublished — which is a **corpus-tier error wearing the costume
of an evidential absence.**

## .the test

before you write *"no rate is available"*:

| ask | if no |
|---|---|
| did I query a **professional-tier** source? | 🔴 the absence is untested. query one |
| for a publisher with two editions — did I request the **professional prefix explicitly**? | 🔴 re-request. the default landing page is often the consumer one |
| did I check the **primary study** the professional page cites? | ⚠️ the synthesis may have dropped a bound the study states |

## .the corollary — an adjective is not a small rate

🔴 **do not convert a frequency word into a number.** *"rare"* has no denominator, so it cannot be
ranked against `~2/100`, and a route that quietly promotes it to a magnitude has invented data.

⇒ carry the adjective **as** an adjective, and record that the quantity is **owed by a tier change**.
that is a checkable to-do; *"probably uncommon"* is not.

## .and the denominator travels with the number

a professional tier supplies rates, and it mixes their **kinds** freely on one page:

| kind | example | applies |
|---|---|---|
| cumulative lifetime | `> 5% of the population` | ✅ unconditionally |
| conditional | `~2/100 diagnosed pregnancies` | 🔴 only once pregnancy is established |
| presented-population | `~1/1000 hospital admissions` | ⚠️ only once presented to hospital |

⇒ 🔴 **two rates of different kinds may not be compared**, and the kind is invisible in the number.
**a rate lifted without its denominator is a rate destroyed.**

## .enforcement

- a conclusion that a quantity is unavailable, drawn from a **patient-tier or social-tier** corpus
  alone = **blocker**
- a frequency **adjective** promoted to a number or a rank = **blocker**
- a rate carried **without its denominator** = **blocker**
- two rates of **different denominators** compared or ranked = **blocker**
- a publisher with a professional edition, queried only at its consumer prefix = **nitpick**
- 🔴 the four tiers cited as **one ordered ladder**, with `social` read as merely the weakest =
  **blocker** — it is off the axis, not at the bottom of it
- a tier rank invoked for a question **other than** *"who publishes a rate?"* = **blocker**; on every
  other question the order does not hold, and on some it inverts

## .see also

- `inventory.of=sources.case=trust.msd-manuals-professional` — where the two-prefix split was measured
- `inventory.of=sources.case=trust.nhs-uk` — the patient tier, and what it does carry
- `rule.require.fifty-divergent-citations` — its divergence axes are **source type · community ·
  study group/author · geography**. ⚠️ 🔴 **it declares NO publisher axis**, so under its extant
  rules the two MSD editions measured above would count as **two** sources toward the 50 — while
  they share one editorial board and therefore corroborate each other not at all. **that gap is
  recorded in `term=source._.choice.reason.md`, and closing it is owed to that rule, not to this one.**
- `rule.require.bhrowser-citations` — how any of it must be obtained
