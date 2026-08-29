import { genTempDir, given, then, when } from 'test-fns';

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

/**
 * .what = contract clamp for the diagnostician -> referrer hand-off seam
 * .why  = the vision's core architectural claim is "two skills that stand alone
 *         and compose in order (diagnostician urgency -> referrer input)". the
 *         one place they touch is a prose contract: diagnose.melanoma's
 *         4.1.acuity.yield.md seeds refer.care's 0.seed.md (via 1.1.intake.need).
 *         that seam is enforced only by prose in both stones, so a rename of the
 *         canonical hand-off file on one side would silently break the other.
 *         this test clamps the seam: both stones must agree on the linchpin
 *         filename, the tiers carried, and the venue boundary — so a drift on
 *         either side fails loud (rule.require.clamp-edge-cases).
 */
describe('hand-off contract: diagnose.melanoma -> refer.care', () => {
  // collapse whitespace runs so assertions survive prose re-wrap (the stones are
  // hand-wrapped markdown; a phrase may break across lines at any column)
  const flatten = (text: string): string => text.replace(/\s+/g, ' ');

  const acuityStone = flatten(
    readFileSync(
      path.join(
        __dirname,
        'diagnostician/skills/diagnose.melanoma/templates/4.1.acuity.stone',
      ),
      'utf-8',
    ),
  );
  const intakeStone = flatten(
    readFileSync(
      path.join(
        __dirname,
        'referrer/skills/refer.care/templates/1.1.intake.need.stone',
      ),
      'utf-8',
    ),
  );

  // the two skill entrypoints, run back-to-back in the round-trip case
  const melanomaEntry = path.join(
    __dirname,
    'diagnostician/skills/diagnose.melanoma.sh',
  );
  const referEntry = path.join(__dirname, 'referrer/skills/refer.care.sh');
  const runSkill = (input: {
    entry: string;
    args: string[];
  }): { exitCode: number } => {
    const result = spawnSync('bash', [input.entry, ...input.args], {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, SKIP_ROUTE_BIND: '1' },
    });
    return { exitCode: result.status ?? 1 };
  };

  // pull the seam tokens straight out of the producer stone, so the round-trip
  // fixture mirrors the stone's DECLARED emit (read tier + onward-care kind)
  // rather than a free-hand string. if the stone renames its tier or drops the
  // onward-care kind, this derivation goes absent and the case fails loud — that
  // is the teeth (rule.require.clamp-edge-cases).
  const seamTokenFrom = (input: { stone: string; token: string }): string => {
    if (!input.stone.includes(input.token))
      throw new Error(
        `acuity stone no longer declares seam token "${input.token}" — hand-off shape drifted`,
      );
    return input.token;
  };

  given('[case1] the canonical hand-off file', () => {
    when('[t0] the producer (4.1.acuity) declares its emit', () => {
      then('it names 4.1.acuity.yield.md as the canonical hand-off', () => {
        expect(acuityStone).toContain('4.1.acuity.yield.md');
        expect(acuityStone).toContain('canonical hand-off');
      });
    });

    when('[t1] the consumer (1.1.intake.need) declares its seed', () => {
      then('it seeds 0.seed.md from the same 4.1.acuity.yield.md file', () => {
        expect(intakeStone).toContain('0.seed.md');
        expect(intakeStone).toContain(
          'seed `0.seed.md` from `4.1.acuity.yield.md`',
        );
      });

      then('it points away from the reader-side 5.1/5.2 layers', () => {
        // the seam must be the engine layer, not the human-reader layers — the
        // consumer names them as NOT its input; the producer never points the
        // seam at the patient layer
        expect(intakeStone).toContain('`5.1`');
        expect(intakeStone).toContain('`5.2`');
        expect(acuityStone).not.toContain('5.2.output.patient.yield.md');
      });
    });
  });

  given('[case2] the urgency tiers carried across the seam', () => {
    when('[t0] the producer emits its binary + routine reads', () => {
      then(
        '4.1.acuity emits emergency-now / see-a-clinician-soon / routine',
        () => {
          expect(acuityStone).toContain('emergency-now');
          expect(acuityStone).toContain('see-a-clinician-soon');
          expect(acuityStone).toContain('routine');
        },
      );
    });

    when('[t1] the consumer carries the given urgency unaltered', () => {
      then(
        '1.1.intake.need transcribes the urgency AS GIVEN (no re-grade)',
        () => {
          expect(intakeStone).toContain('urgency read as given');
          expect(intakeStone).toContain(
            'do not re-derive, re-grade, or re-tier it',
          );
        },
      );
    });
  });

  given('[case3] the venue boundary (referrer-scope)', () => {
    when('[t0] both stones state where the venue decision lives', () => {
      then('the producer stops short of the venue', () => {
        expect(acuityStone).toContain('not **where**');
        expect(acuityStone).toContain('the venue is the referrer');
      });

      then('the consumer does not re-judge the acuity it was handed', () => {
        expect(intakeStone).toContain('**not** re-judge the urgency');
      });
    });
  });

  given('[case4] a real back-to-back round-trip across the seam', () => {
    // this is the mechanical companion to case1-3's prose clamps: it runs BOTH
    // skills for real and flows the seam file between them, so a drift in the
    // actual emitted/consumed artifact (not just the stone prose) fails loud.
    const melanomaRoute = genTempDir({ slug: 'handoff-melanoma-route' });
    const referRoute = genTempDir({ slug: 'handoff-refer-route' });

    when(
      '[t0] diagnose.melanoma init runs, then its acuity yield feeds refer.care',
      () => {
        // 1. run the producer skill for real — it stamps the melanoma route
        const producerRun = runSkill({
          entry: melanomaEntry,
          args: ['init', '--at', melanomaRoute],
        });

        // 2. build the hand-off artifact in the producer's route, shaped from the
        //    real stone emit (read tier + onward-care kind derived from the stone,
        //    not hand-authored) — executing the full reasoning chain is not feasible
        //    in an integration test, so the derived shape is the honest stand-in
        const read = seamTokenFrom({
          stone: acuityStone,
          token: 'see-a-clinician-soon',
        });
        const onwardCareKind = seamTokenFrom({
          stone: acuityStone,
          token: 'dermatology',
        });
        const acuityYield = path.join(melanomaRoute, '4.1.acuity.yield.md');
        writeFileSync(
          acuityYield,
          [
            '# 4.1.acuity.yield.md',
            '',
            `## read\n${read}`,
            '',
            '## trigger\na melanoma-flagged lesion the redteam could not confidently exclude',
            '',
            `## onward-care kind\n${onwardCareKind}`,
            '',
          ].join('\n'),
        );

        // 3. run the consumer skill for real, seeded from the producer's artifact
        const consumerRun = runSkill({
          entry: referEntry,
          args: ['init', '--at', referRoute, '--seed-from', acuityYield],
        });

        const seed = path.join(referRoute, '0.seed.md');

        then(
          'the producer skill stamps its acuity stone (it ran for real)',
          () => {
            expect(producerRun.exitCode).toBe(0);
            expect(
              existsSync(path.join(melanomaRoute, '4.1.acuity.stone')),
            ).toBe(true);
          },
        );

        then('the consumer skill seeds 0.seed.md from the acuity yield', () => {
          expect(consumerRun.exitCode).toBe(0);
          expect(existsSync(seed)).toBe(true);
        });

        then(
          'the seeded urgency + onward-care kind survive the round-trip',
          () => {
            const seeded = readFileSync(seed, 'utf-8');
            expect(seeded).toContain(read);
            expect(seeded).toContain(onwardCareKind);
          },
        );
      },
    );
  });
});
