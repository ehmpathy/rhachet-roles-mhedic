# rule.require.excerpt-carries-the-qualifier

## .what

when a quoted passage supports a claim, **read the whole post it came from, and carry any qualifier
the source attached to it.** an excerpt that drops the source's own *"but"* misreports the source.

before a quote enters an artifact:

1. read the **whole** post, not the matched span
2. read the lines **between** your excerpts, when you quote a source twice
3. if the source qualified, reversed, or bounded itself — **the qualifier travels with the quote**

## .why

`rule.require.bhrowser-citations` governs **where** a quote came from. it does not govern **how much
of it you took.** a span defect passes every check that rule imposes:

| the check | a span defect |
|---|---|
| quoted verbatim? | ✅ yes |
| url well-formed? | ✅ yes |
| attributed to the right author? | ✅ yes |
| retrieved via bhrowser? | ✅ yes |

⇒ 🔴 **a wrong span is invisible to provenance checks by construction**, and the arithmetic built on
it is sound. **only a read of the whole source exposes it.**

## .the two failure modes — one genus, two DIFFERENT differentia

🔴 **an earlier draft of this brief called both *"failures of citation scope."* that was a term
over-reach**, caught by `rule.require.enumerate-before-you-name`: `scope` fits one row and was
stretched across two.

the genus is **citation fidelity** — does the artifact represent the source faithfully? it has two
independent properties, and each fails differently:

| property | the question | the defect | the repair |
|---|---|---|---|
| **attribution** | *which* source? | a quote credited to a document that does not hold it | a **re-point** |
| **scope** | *how much* of it? | a quote that omits a clause which bounds or reverses it | a **re-read** |

⚠️ **the repairs are opposite, which is why the two must stay parted** — to fuse them under one word
sends a traveler to the wrong remedy.

🔴 **this rule governs SCOPE only.** attribution is governed by `rule.require.bhrowser-citations`,
and **a scope defect passes that rule cleanly** — which is why it needs its own.

## 🔴 .the direction is what makes it dangerous

a span defect in a methods claim costs a re-count.

🔴 **a span defect that trims a source's own caution costs a reader their guard against an acute
scenario.** ⇒ **audit the excerpts that touch acuity first.**

## .the smells — a source bounded itself

- a `BUT`, `however`, `though`, `that said` in the source, outside your excerpt
- your two quotes come from the same post with a gap between them
- the excerpt reads more certain than a lay poster plausibly is
- an excerpt that settles a question the rest of the post leaves open

## .examples

### 👎 bad — two quotes, an unread gap

> *"Before nidation is NO pregnacny (hcg) measurable…"* … *"Just get a urine test."*

the same post, between those two lines: *"**BUT who knows if there was not a conception prior
Thursday and a nidation already…???** Yes, then it could be that."*

⇒ the excerpt reads as reassurance about when to test. **the source refused to give it.**

### 👍 good — the qualifier travels

> *"Before nidation is NO pregnacny (hcg) measurable…"* — **and the same poster adds** *"BUT who
> knows if there was not a conception prior Thursday…? Yes, then it could be that."*
> ⇒ the two states are not exclusive; the test is what parts them.

## .the test

> **grep the lines between your excerpts.** a `BUT` between two quoted sentences is the cheapest
> signal that a source bounded itself, and it costs one read to find.

## .enforcement

- an excerpt that drops a qualifier the source attached = **blocker**
- an excerpt that touches acuity, taken without a whole-post read = **blocker**
- two quotes from one post with the gap unread = **blocker**

## .the worked example

⚠️ **first seen in a private case route, since removed** (`rule.forbid.pii`) — a correlation stone's
third self-review, 2026-09-06. **both costumes appeared in the same stone:**

- the **wrong source** — a relief quote cited to the one thread that reports the therapy as harmful
- the **wrong span** — the `BUT, BUT, BUT` above, dropped from a passage that bounded a pregnancy
  test's negative result

⚠️ **five review passes and a peer review missed both**, because each excerpt was verbatim,
well-attributed, and correctly counted.

## .see also

- `rule.require.bhrowser-citations.[rule].md` — governs provenance; this governs **scope**
- `rule.require.read-social-comments.[rule].md` — read the replies, not the headline
- `motto.not-medical-advice.[motto].md` — why the direction of an error matters here
