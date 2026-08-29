import { spawnSync } from 'child_process';
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import * as path from 'path';
import { genTempDir, given, then, when } from 'test-fns';

/**
 * .what = integration test for the refer.care shell skill
 * .why  = proves the entry command runs, the referral route stamps, and the
 *         teach-to-search + two-layer stones land (per rule.require.jest-tests-for-skills)
 *
 * .note.contract-gate = this integration suite IS the designated contract gate for
 *         the refer.care cli. per rule.require.test-coverage-by-grain the cli
 *         surface (help text, banners, exit codes, default-route output) is contract
 *         grain, whose usual home is a .acceptance.test.ts. we place it here on
 *         purpose: each case blackboxes the real shell entry via spawn plus a
 *         toMatchSnapshot() assertion, so this suite already fulfils the acceptance
 *         role. a separate .acceptance.test.ts would only duplicate the same
 *         spawn-and-snap with no added coverage — a deliberate call, not an omission.
 *
 * .note.bind-success = the success footer (case17, "branch <BRANCH> <-> route <ROUTE>")
 *         runs against a scripted rhx stub (exit 0), not a real route.bind.set. a real
 *         SUCCESS bind is durably infeasible to reproduce hermetically: the role
 *         registry resolves only at the project root, and from the project root the
 *         current branch already holds the behavior-route bind flag (itself
 *         non-durable), while route.bind.set rejects main/master. so the one real call
 *         a hermetic test can make is the route-not-found REJECTION — which case18
 *         exercises against the REAL rhx binary (exit 2, "route directory does not
 *         exist"). the stub thus covers only the success exit semantics the real
 *         binary cannot reach from here.
 */
describe('refer.care.sh', () => {
  const entryPath = path.join(__dirname, 'refer.care.sh');

  const runSkill = (input: {
    args: string[];
    env?: Record<string, string>;
    entry?: string;
    cwd?: string;
  }): { stdout: string; stderr: string; exitCode: number } => {
    const result = spawnSync(
      'bash',
      [input.entry ?? entryPath, ...input.args],
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, ...input.env },
        cwd: input.cwd,
      },
    );
    return {
      stdout: result.stdout ?? '',
      stderr: result.stderr ?? '',
      exitCode: result.status ?? 1,
    };
  };

  // copy the skill's entry + init + output into a fresh SKILL_DIR so a test can
  // doctor the templates dir (absent, or present-but-empty) to exercise the
  // install-integrity guards (rule.require.clamp-edge-cases)
  const copySkill = (input: {
    into: string;
    withTemplatesDir: boolean;
  }): string => {
    const sub = path.join(input.into, 'refer.care');
    mkdirSync(sub, { recursive: true });
    copyFileSync(entryPath, path.join(input.into, 'refer.care.sh'));
    copyFileSync(
      path.join(__dirname, 'refer.care', 'init.sh'),
      path.join(sub, 'init.sh'),
    );
    copyFileSync(
      path.join(__dirname, 'refer.care', 'output.sh'),
      path.join(sub, 'output.sh'),
    );
    if (input.withTemplatesDir)
      mkdirSync(path.join(sub, 'templates'), { recursive: true });
    return path.join(input.into, 'refer.care.sh');
  };

  // write a `rhx` stub on PATH that RECORDS the exact args it was called with (into a
  // sentinel file) and exits with a chosen code. this is the documented-unavoidable-mock
  // machinery for the bind paths (rule.forbid.integration.mocks): a REAL `rhx route.bind.set`
  // through the skill is not hermetically reachable — rhachet resolves its linked-role
  // registry ONLY from the exact project root (a temp repo or subdir throws "no skill
  // route.bind.set found in any linked role"), and from the project root the current branch
  // already holds the behavior-route bind flag (conflict), while setRouteBind rejects
  // main/master outright (so CI on main could never bind). rather than a BLIND stub, this
  // records the invocation so the test asserts the skill's exact call contract
  // (route.bind.set --route <ROUTE_PATH>) — the very defect a blind pass-through would hide.
  const genRhxStub = (input: {
    binDir: string;
    exitCode: number;
  }): { call: string } => {
    mkdirSync(input.binDir, { recursive: true });
    const callFile = path.join(input.binDir, 'rhx.call.txt');
    const stub = path.join(input.binDir, 'rhx');
    writeFileSync(
      stub,
      `#!/usr/bin/env bash\nprintf '%s ' "$@" > ${callFile}\nexit ${input.exitCode}\n`,
    );
    chmodSync(stub, 0o755);
    return { call: callFile };
  };

  // strip the run-specific bits (temp route/home paths, current git branch, the dated
  // default-route stamp, and terminal ANSI escape bytes) so the snapshot captures the output
  // template, not the machine it ran on (hermetic). homes = any temp dirs whose absolute path
  // leaks into output. the ANSI strip keeps the real dim footer render in a live terminal but
  // masks the raw \u001b[..m control bytes so the snapshot contract reads clean (not literal
  // escape garbage) — the dim render is presentation, not content.
  const sanitize = (input: {
    text: string;
    route: string;
    homes?: string[];
  }): string => {
    let out = input.text.split(input.route).join('<ROUTE>');
    for (const home of input.homes ?? []) out = out.split(home).join('<HOME>');
    return (
      out
        // biome-ignore lint/suspicious/noControlCharactersInRegex: strip raw terminal ANSI escape bytes so snapshots read clean, not literal escape garbage
        .replace(/\u001b\[[0-9;]*m/g, '')
        .replace(/branch \S+ <-> route/g, 'branch <BRANCH> <-> route')
        .replace(/v\d{4}_\d{2}_\d{2}/g, 'v<DATE>')
    );
  };

  // derive the hand-off seed tokens from the producer stone's DECLARED emit, so the case12
  // fixture mirrors the real acuity stone contract rather than a hand-authored string. if the
  // stone drops a token, this throws — the same teeth as the round-trip case (case4 in the
  // handoff suite) — per rule.require.clamp-edge-cases.
  const acuityStoneText = readFileSync(
    path.join(
      __dirname,
      '../../diagnostician/skills/diagnose.melanoma/templates/4.1.acuity.stone',
    ),
    'utf-8',
  );
  const acuitySeedTokenFrom = (input: { token: string }): string => {
    if (!acuityStoneText.includes(input.token))
      throw new Error(
        `acuity stone no longer declares "${input.token}" — hand-off seed fixture drifted`,
      );
    return input.token;
  };

  given('[case1] a human asks for help', () => {
    when('[t0] --help is passed', () => {
      const result = runSkill({ args: ['--help'] });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then('it prints the usage, snapshot holds', () => {
        expect(result.stdout).toContain('refer.care');
        expect(result.stdout).toMatchSnapshot();
      });
    });
  });

  given('[case2] an unknown subcommand', () => {
    when('[t0] a bogus subcommand is passed', () => {
      const result = runSkill({ args: ['frobnicate'] });

      then('it exits 2 (constraint: caller must fix the invocation)', () => {
        expect(result.exitCode).toBe(2);
      });

      then('it puts all error context on stderr, not stdout', () => {
        expect(result.stdout).toEqual('');
      });

      then(
        'it prints the error + valid subcommands to stderr, snapshot held',
        () => {
          expect(result.stderr).toContain('init');
          expect(result.stderr).toMatchSnapshot();
        },
      );
    });
  });

  given('[case3] init stamps a referral route at a target dir', () => {
    const tempDir = genTempDir({ slug: 'refer-care-init' });

    when('[t0] init --at <dir> runs (bind skipped for hermeticity)', () => {
      const result = runSkill({
        args: ['init', '--at', tempDir],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then('it stamps the intake-need stone + its guard', () => {
        expect(existsSync(path.join(tempDir, '1.1.intake.need.stone'))).toBe(
          true,
        );
        expect(existsSync(path.join(tempDir, '1.1.intake.need.guard'))).toBe(
          true,
        );
      });

      then('it stamps the teach-to-search + two-layer stones', () => {
        expect(existsSync(path.join(tempDir, '3.1.clinician.find.stone'))).toBe(
          true,
        );
        expect(
          existsSync(path.join(tempDir, '6.2.referral.yield.patient.stone')),
        ).toBe(true);
      });

      then('it seeds the accrue hold', () => {
        expect(existsSync(path.join(tempDir, 'accrue', 'readme.md'))).toBe(
          true,
        );
      });

      then('it copies no .sh into the route', () => {
        expect(existsSync(path.join(tempDir, 'init.sh'))).toBe(false);
        expect(existsSync(path.join(tempDir, 'output.sh'))).toBe(false);
      });

      then('it prints the stamp confirmation, snapshot held', () => {
        const stdout = sanitize({ text: result.stdout, route: tempDir });
        expect(stdout).toContain('<ROUTE>');
        expect(stdout).toMatchSnapshot();
      });
    });
  });

  given('[case4] route bind fails — the skill surfaces it loud', () => {
    const tempDir = genTempDir({ slug: 'refer-care-bindfail' });
    const binDir = genTempDir({ slug: 'refer-care-stubbin' });

    when(
      '[t0] rhx route.bind.set exits non-zero, init runs with bind live',
      () => {
        // documented-unavoidable mock (see genRhxStub): a real bind is not hermetically
        // reachable through the skill. this stub exits non-zero to drive the bind-failure
        // path AND records its args, so the test proves the skill invoked the bind with the
        // correct contract (route.bind.set --route <ROUTE_PATH>) — the very defect a blind
        // stub would hide — rather than merely observing a non-zero exit.
        const { call } = genRhxStub({ binDir, exitCode: 1 });
        const result = runSkill({
          args: ['init', '--at', tempDir],
          env: { PATH: `${binDir}:${process.env.PATH ?? ''}` },
        });

        then(
          'it exits 2 (constraint: caller must bind the route later)',
          () => {
            expect(result.exitCode).toBe(2);
          },
        );

        then(
          'the skill invoked route.bind.set with the correct --route',
          () => {
            // proves the skill's call contract with the bind, not a blind failure
            expect(readFileSync(call, 'utf-8').trim()).toBe(
              `route.bind.set --route ${tempDir}`,
            );
          },
        );

        then('it still stamps the route so work is not lost', () => {
          expect(existsSync(path.join(tempDir, '1.1.intake.need.stone'))).toBe(
            true,
          );
        });

        then('it names the bind fix on stderr, snapshot held', () => {
          const stderr = sanitize({ text: result.stderr, route: tempDir });
          expect(stderr).toContain('route.bind.set');
          expect(stderr).toMatchSnapshot();
        });
      },
    );
  });

  given('[case5] init with an unknown option', () => {
    const tempDir = genTempDir({ slug: 'refer-care-badflag' });

    when('[t0] init --root <dir> runs (--root is not a valid option)', () => {
      const result = runSkill({
        args: ['init', '--root', tempDir],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 2 (constraint: caller must fix the option)', () => {
        expect(result.exitCode).toBe(2);
      });

      then('it names the unknown option on stderr, snapshot held', () => {
        expect(result.stderr).toContain('unknown option');
        expect(result.stderr).toMatchSnapshot();
      });
    });
  });

  given('[case6] init when the templates dir is absent', () => {
    const home = genTempDir({ slug: 'refer-care-notpl-home' });
    const route = genTempDir({ slug: 'refer-care-notpl-route' });

    when('[t0] a skill copy without a templates dir runs init', () => {
      const entry = copySkill({ into: home, withTemplatesDir: false });
      const result = runSkill({
        args: ['init', '--at', route],
        env: { SKIP_ROUTE_BIND: '1' },
        entry,
      });

      then('it exits 1 (malfunction: templates dir absent)', () => {
        expect(result.exitCode).toBe(1);
      });

      then('it names the absent templates dir on stderr, snapshot held', () => {
        expect(result.stderr).toContain('templates dir not found');
        expect(
          sanitize({ text: result.stderr, route, homes: [home] }),
        ).toMatchSnapshot();
      });
    });
  });

  given('[case7] init when the templates dir holds no stones', () => {
    const home = genTempDir({ slug: 'refer-care-nostones-home' });
    const route = genTempDir({ slug: 'refer-care-nostones-route' });

    when('[t0] a skill copy with an empty templates dir runs init', () => {
      const entry = copySkill({ into: home, withTemplatesDir: true });
      const result = runSkill({
        args: ['init', '--at', route],
        env: { SKIP_ROUTE_BIND: '1' },
        entry,
      });

      then('it exits 1 (malfunction: no stones to stamp)', () => {
        expect(result.exitCode).toBe(1);
      });

      then('it names the no-stones condition on stderr, snapshot held', () => {
        expect(result.stderr).toContain('no .stone templates found');
        expect(
          sanitize({ text: result.stderr, route, homes: [home] }),
        ).toMatchSnapshot();
      });
    });
  });

  given('[case8] no subcommand at all', () => {
    when('[t0] the skill runs with zero args', () => {
      const result = runSkill({ args: [] });

      then('it exits 2 (constraint: caller must name a subcommand)', () => {
        expect(result.exitCode).toBe(2);
      });

      then(
        'it says no subcommand was specified, on stderr, snapshot held',
        () => {
          expect(result.stderr).toContain('no subcommand specified');
          expect(result.stderr).toMatchSnapshot();
        },
      );
    });
  });

  given('[case9] init with no --at (default dated route path)', () => {
    const cwd = genTempDir({ slug: 'refer-care-defaultpath' });

    when('[t0] init runs with no --at, from a temp cwd', () => {
      const result = runSkill({
        args: ['init'],
        env: { SKIP_ROUTE_BIND: '1' },
        cwd,
      });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then(
        'it stamps at the default .route/v<DATE>.refer.care path, snapshot held',
        () => {
          expect(result.stdout).toContain('.route/v');
          expect(result.stdout).toContain('.refer.care');
          expect(existsSync(path.join(cwd, '.route'))).toBe(true);
          expect(
            sanitize({ text: result.stdout, route: cwd, homes: [cwd] }),
          ).toMatchSnapshot();
        },
      );
    });
  });

  given('[case10] init --at with no value (the target is absent)', () => {
    when('[t0] init --at runs with --at as the last token', () => {
      const result = runSkill({
        args: ['init', '--at'],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 2 (constraint: caller must supply the --at value)', () => {
        expect(result.exitCode).toBe(2);
      });

      then('it names the absent --at value on stderr, snapshot held', () => {
        expect(result.stderr).toContain('--at requires a directory value');
        expect(result.stderr).toMatchSnapshot();
      });
    });
  });

  given('[case11] init --at an extant route is an idempotent re-stamp', () => {
    const tempDir = genTempDir({ slug: 'refer-care-restamp' });

    when(
      '[t0] init runs twice, with a stone edited between the two runs',
      () => {
        const first = runSkill({
          args: ['init', '--at', tempDir],
          env: { SKIP_ROUTE_BIND: '1' },
        });
        // simulate referral work written into a stamped stone between runs
        // sort for a deterministic pick — readdirSync order is not guaranteed across platforms
        const stoneFiles = readdirSync(tempDir)
          .filter((f) => f.endsWith('.stone'))
          .sort();
        const editedStone = path.join(tempDir, stoneFiles[0] ?? 'absent.stone');
        writeFileSync(editedStone, 'EDITED-BETWEEN-RUNS');
        const second = runSkill({
          args: ['init', '--at', tempDir],
          env: { SKIP_ROUTE_BIND: '1' },
        });

        then('the first init exits 0', () => {
          expect(first.exitCode).toBe(0);
        });

        then('at least one stone was stamped to edit', () => {
          expect(stoneFiles.length).toBeGreaterThan(0);
        });

        then('the second init exits 0 (idempotent re-stamp)', () => {
          expect(second.exitCode).toBe(0);
        });

        then('the edited stone survives, not clobbered by the template', () => {
          // findsert stamp: a re-stamp must preserve edits, not overwrite with cp -f
          expect(readFileSync(editedStone, 'utf-8')).toBe(
            'EDITED-BETWEEN-RUNS',
          );
        });

        then('the re-stamp success output holds, snapshot held', () => {
          // a re-stamp is a distinct invocation path — snap what the user sees
          expect(
            sanitize({ text: second.stdout, route: tempDir, homes: [tempDir] }),
          ).toMatchSnapshot();
        });
      },
    );
  });

  given('[case12] init --seed-from mechanizes the hand-off seam', () => {
    const tempDir = genTempDir({ slug: 'refer-care-seed' });
    const seedSrc = genTempDir({ slug: 'refer-care-seed-src' });
    const acuityYield = path.join(seedSrc, '4.1.acuity.yield.md');

    when('[t0] init --seed-from a real acuity yield runs', () => {
      // the acuity yield fixture mirrors the producer stone's declared emit — the read tier
      // + onward-care kind are derived from 4.1.acuity.stone, not hand-authored
      const read = acuitySeedTokenFrom({ token: 'see-a-clinician-soon' });
      const onwardCareKind = acuitySeedTokenFrom({ token: 'dermatology' });
      writeFileSync(acuityYield, `ACUITY: ${read}\nkind: ${onwardCareKind}`);
      const result = runSkill({
        args: ['init', '--at', tempDir, '--seed-from', acuityYield],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then('0.seed.md lands in the route with the acuity content', () => {
        // the mechanical copy the operator would otherwise do by hand
        const seed = path.join(tempDir, '0.seed.md');
        expect(existsSync(seed)).toBe(true);
        expect(readFileSync(seed, 'utf-8')).toContain('see-a-clinician-soon');
      });

      then('it reports the seed on stdout, snapshot held', () => {
        expect(result.stdout).toContain('seed');
        expect(
          sanitize({
            text: result.stdout,
            route: tempDir,
            homes: [tempDir, seedSrc],
          }),
        ).toMatchSnapshot();
      });
    });
  });

  given('[case13] init --seed-from a source that does not exist', () => {
    const tempDir = genTempDir({ slug: 'refer-care-seed-absent' });
    // the absent seed source lives under its OWN dir (a home), not under the route dir, so
    // its mask reads <HOME> — consistent with case12/case15 where the seed source is also a
    // home, never the route (rule.forbid.snapshot-visual-blemishes: one field, one placeholder)
    const seedSrc = genTempDir({ slug: 'refer-care-seed-absent-src' });

    when('[t0] init --seed-from points at an absent file', () => {
      const result = runSkill({
        args: [
          'init',
          '--at',
          tempDir,
          '--seed-from',
          path.join(seedSrc, 'nope.4.1.acuity.yield.md'),
        ],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 2 (constraint: caller must supply a real source)', () => {
        expect(result.exitCode).toBe(2);
      });

      then('it names the absent seed source on stderr, snapshot held', () => {
        expect(result.stderr).toContain('--seed-from source not found');
        expect(
          sanitize({
            text: result.stderr,
            route: tempDir,
            homes: [tempDir, seedSrc],
          }),
        ).toMatchSnapshot();
      });
    });
  });

  given(
    '[case14] init --seed-from with no value (the source is absent)',
    () => {
      const tempDir = genTempDir({ slug: 'refer-care-seed-noval' });

      when('[t0] init --seed-from runs as the last token', () => {
        const result = runSkill({
          args: ['init', '--at', tempDir, '--seed-from'],
          env: { SKIP_ROUTE_BIND: '1' },
        });

        then('it exits 2 (constraint: caller must supply the value)', () => {
          expect(result.exitCode).toBe(2);
        });

        then(
          'it names the absent --seed-from value on stderr, snapshot held',
          () => {
            expect(result.stderr).toContain('--seed-from requires a file path');
            expect(result.stderr).toMatchSnapshot();
          },
        );
      });
    },
  );

  given(
    '[case15] init --seed-from when 0.seed.md already present keeps it',
    () => {
      const tempDir = genTempDir({ slug: 'refer-care-seed-kept' });
      const seedSrc = genTempDir({ slug: 'refer-care-seed-kept-src' });
      const firstYield = path.join(seedSrc, 'first.4.1.acuity.yield.md');
      const secondYield = path.join(seedSrc, 'second.4.1.acuity.yield.md');

      when(
        '[t0] init --seed-from runs twice with a different source each time',
        () => {
          // both fixtures derive their read tier from the acuity stone's declared emit, not
          // hand-authored strings — so a reshape of the stone's tiers is caught here (teeth)
          const readSoon = acuitySeedTokenFrom({
            token: 'see-a-clinician-soon',
          });
          const readEmergency = acuitySeedTokenFrom({ token: 'emergency-now' });
          const kind = acuitySeedTokenFrom({ token: 'dermatology' });
          // first seed places 0.seed.md from the first acuity yield
          writeFileSync(firstYield, `ACUITY: ${readSoon}\nkind: ${kind}`);
          const first = runSkill({
            args: ['init', '--at', tempDir, '--seed-from', firstYield],
            env: { SKIP_ROUTE_BIND: '1' },
          });
          // second seed from a DIFFERENT source must not clobber the placed 0.seed.md
          writeFileSync(secondYield, `ACUITY: ${readEmergency}\nkind: ${kind}`);
          const second = runSkill({
            args: ['init', '--at', tempDir, '--seed-from', secondYield],
            env: { SKIP_ROUTE_BIND: '1' },
          });

          then('the first init exits 0 and seeds 0.seed.md', () => {
            expect(first.exitCode).toBe(0);
            expect(
              readFileSync(path.join(tempDir, '0.seed.md'), 'utf-8'),
            ).toContain('see-a-clinician-soon');
          });

          then('the second init exits 0 (idempotent)', () => {
            expect(second.exitCode).toBe(0);
          });

          then(
            'the second seed is kept, not clobbered by the new source',
            () => {
              // findsert: a re-seed must preserve the placed 0.seed.md, not overwrite it
              expect(
                readFileSync(path.join(tempDir, '0.seed.md'), 'utf-8'),
              ).toContain('see-a-clinician-soon');
            },
          );

          then(
            'the second run reports the already-present branch, snapshot held',
            () => {
              expect(second.stdout).toContain('already present');
              expect(
                sanitize({
                  text: second.stdout,
                  route: tempDir,
                  homes: [tempDir, seedSrc],
                }),
              ).toMatchSnapshot();
            },
          );
        },
      );
    },
  );

  given('[case16] bind succeeds but the branch cannot be read', () => {
    const tempDir = genTempDir({ slug: 'refer-care-badbranch' });
    const binDir = genTempDir({ slug: 'refer-care-badbranch-bin' });

    when(
      '[t0] rhx is stubbed to pass but git rev-parse is stubbed to fail',
      () => {
        // UNAVOIDABLE MOCK (rule.forbid.integration.mocks exception, documented inline):
        // this guard fires only when the bind SUCCEEDS yet the very next `git rev-parse`
        // FAILS — an inconsistent-repo race no real tool pair can produce on demand. so we
        // stub `rhx` to exit 0 (bind "succeeds") AND `git` to exit non-zero (rev-parse fails)
        // to reach the exit-1 inconsistency guard added with the i018 failhide fix. the real
        // bind paths are covered for real by case4 (fail) and case17 (success);
        // this case exists solely to clamp the un-producible inconsistency edge
        // (rule.require.clamp-edge-cases).
        mkdirSync(binDir, { recursive: true });
        const rhxStub = path.join(binDir, 'rhx');
        writeFileSync(rhxStub, '#!/usr/bin/env bash\nexit 0\n');
        chmodSync(rhxStub, 0o755);
        const gitStub = path.join(binDir, 'git');
        writeFileSync(gitStub, '#!/usr/bin/env bash\nexit 1\n');
        chmodSync(gitStub, 0o755);

        const result = runSkill({
          args: ['init', '--at', tempDir],
          env: { PATH: `${binDir}:${process.env.PATH ?? ''}` },
        });

        then('it exits 1 (malfunction: bound but branch unreadable)', () => {
          expect(result.exitCode).toBe(1);
        });

        then('it still stamps the route so work is not lost', () => {
          expect(existsSync(path.join(tempDir, '1.1.intake.need.stone'))).toBe(
            true,
          );
        });

        then(
          'it names the inconsistent repo state on stderr, snapshot held',
          () => {
            expect(result.stderr).toContain('repo state is inconsistent');
            expect(
              sanitize({
                text: result.stderr,
                route: tempDir,
                homes: [tempDir],
              }),
            ).toMatchSnapshot();
          },
        );
      },
    );
  });

  given('[case17] the bind-success footer (bind ok, REAL git branch)', () => {
    const tempDir = genTempDir({ slug: 'refer-care-bindok' });
    const binDir = genTempDir({ slug: 'refer-care-bindok-bin' });

    when(
      '[t0] rhx route.bind.set exits 0 and REAL git names the branch',
      () => {
        // documented-unavoidable mock (see genRhxStub): a real `rhx route.bind.set` cannot run
        // hermetically through the skill. this stub exits 0 to model a successful bind AND
        // records its args, so the test proves the skill invoked the bind with the correct
        // contract; REAL git (not stubbed) then names the current branch, so the happy-path
        // footer (branch <-> route) is exercised with a live rev-parse, masked to <BRANCH>.
        const { call } = genRhxStub({ binDir, exitCode: 0 });
        const result = runSkill({
          args: ['init', '--at', tempDir],
          env: { PATH: `${binDir}:${process.env.PATH ?? ''}` },
        });

        then('it exits 0', () => {
          expect(result.exitCode).toBe(0);
        });

        then(
          'the skill invoked route.bind.set with the correct --route',
          () => {
            // proves the skill's call contract with the bind — not a blind stub pass-through
            expect(readFileSync(call, 'utf-8').trim()).toBe(
              `route.bind.set --route ${tempDir}`,
            );
          },
        );

        then(
          'the footer names the branch <-> route bind, snapshot held',
          () => {
            // the real branch is masked to <BRANCH>, so the snapshot stays hermetic
            expect(result.stdout).toContain('branch');
            expect(
              sanitize({
                text: result.stdout,
                route: tempDir,
                homes: [tempDir],
              }),
            ).toMatchSnapshot();
          },
        );
      },
    );
  });

  given(
    '[case18] a REAL rhx route.bind.set against a route that does not exist',
    () => {
      // the ONE durably-hermetic REAL (non-stubbed) `rhx route.bind.set` invocation reachable
      // from a test: an ABSENT route path. setRouteBind fs.access-rejects the route BEFORE any
      // branch/flag logic (verified in rhachet-roles-bhrain dist), so this real call is
      // independent of the current git branch, the already-bound behavior-route flag, and cwd —
      // it reproduces on any machine and in CI. it is the masked-LIVE-layer companion to case17's
      // injected-layer success footer: case17 proves the exact bind-success STRING against a
      // stubbed source; this proves the real bind CONTRACT (its arg validation + rejection shape)
      // against the real `rhx` binary the skill actually shells out to. per
      // rule.require.contract-snapshot-exhaustiveness, the live and injected snapshots are
      // complementary, not substitutes — the injected layer pins the volatile value against a
      // stub, the live layer pins the contract shape against the real source.
      const parent = genTempDir({ slug: 'refer-care-bind-absent' });
      const absentRoute = path.join(parent, 'route-does-not-exist');

      when('[t0] rhx route.bind.set --route <ROUTE> runs for real', () => {
        const result = spawnSync(
          'rhx',
          ['route.bind.set', '--route', absentRoute],
          {
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
            env: { ...process.env },
          },
        );
        const stderr = result.stderr ?? '';
        const exitCode = result.status ?? 1;

        then('the real `rhx` binary was reachable (no spawn error)', () => {
          // fail loud if rhx is not on PATH — the skill shells out to bare `rhx`, so an
          // absent binary is a real defect, never a silent skip (rule.require.failfast)
          expect(result.error).toBeUndefined();
        });

        then(
          'it exits 2 (constraint: the caller passed an absent route)',
          () => {
            expect(exitCode).toBe(2);
          },
        );

        then('it names the fix: the route directory does not exist', () => {
          expect(stderr).toContain('route directory does not exist');
        });

        then('the live rejection output holds its shape, snapshot held', () => {
          // snap the STDERR stream only: the real `rhx` prints its `run solid skill` banner
          // to both stdout and stderr, so a combined capture doubles the banner. stderr
          // carries the meaningful constraint-rejection render (single banner + error + json)
          // — the clean contract shape, no duplicated noise (rule.forbid.snapshot-visual-blemishes).
          // trimStart AFTER sanitize: the real render opens with a dim ANSI escape then a
          // newline, so the head blank clears only once sanitize has stripped the escape.
          expect(
            sanitize({
              text: stderr,
              route: absentRoute,
              homes: [parent],
            }).trimStart(),
          ).toMatchSnapshot();
        });
      });
    },
  );
});
