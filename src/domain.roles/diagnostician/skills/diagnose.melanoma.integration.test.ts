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
 * .what = integration test for the diagnose.melanoma shell skill
 * .why  = proves the entry command runs, the route stamps, and the
 *         melanoma-specific stones + guards land (per rule.require.jest-tests-for-skills)
 *
 * .note.contract-gate = this integration suite IS the designated contract gate for
 *         the diagnose.melanoma cli. per rule.require.test-coverage-by-grain the cli
 *         surface (help text, banners, exit codes, default-route output) is contract
 *         grain, whose usual home is a .acceptance.test.ts. we place it here on
 *         purpose: each case blackboxes the real shell entry via spawn plus a
 *         toMatchSnapshot() assertion, so this suite already fulfils the acceptance
 *         role. a separate .acceptance.test.ts would only duplicate the same
 *         spawn-and-snap with no added coverage — a deliberate call, not an omission.
 *
 * .note.bind-success = the success footer (case13, "branch <BRANCH> <-> route <ROUTE>")
 *         runs against a scripted rhx stub (exit 0), not a real route.bind.set. a real
 *         SUCCESS bind is durably infeasible to reproduce hermetically: the role
 *         registry resolves only at the project root, and from the project root the
 *         current branch already holds the behavior-route bind flag (itself
 *         non-durable), while route.bind.set rejects main/master. so the one real call
 *         a hermetic test can make is the route-not-found REJECTION — which case14
 *         exercises against the REAL rhx binary (exit 2, "route directory does not
 *         exist"). the stub thus covers only the success exit semantics the real
 *         binary cannot reach from here.
 */
describe('diagnose.melanoma.sh', () => {
  const entryPath = path.join(__dirname, 'diagnose.melanoma.sh');

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
    const sub = path.join(input.into, 'diagnose.melanoma');
    mkdirSync(sub, { recursive: true });
    copyFileSync(entryPath, path.join(input.into, 'diagnose.melanoma.sh'));
    copyFileSync(
      path.join(__dirname, 'diagnose.melanoma', 'init.sh'),
      path.join(sub, 'init.sh'),
    );
    copyFileSync(
      path.join(__dirname, 'diagnose.melanoma', 'output.sh'),
      path.join(sub, 'output.sh'),
    );
    if (input.withTemplatesDir)
      mkdirSync(path.join(sub, 'templates'), { recursive: true });
    return path.join(input.into, 'diagnose.melanoma.sh');
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

  given('[case1] a human asks for help', () => {
    when('[t0] --help is passed', () => {
      const result = runSkill({ args: ['--help'] });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then('it prints the usage, snapshot holds', () => {
        expect(result.stdout).toContain('diagnose.melanoma');
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

  given('[case3] init stamps a route at a target dir', () => {
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-init' });

    when('[t0] init --at <dir> runs (bind skipped for hermeticity)', () => {
      const result = runSkill({
        args: ['init', '--at', tempDir],
        env: { SKIP_ROUTE_BIND: '1' },
      });

      then('it exits 0', () => {
        expect(result.exitCode).toBe(0);
      });

      then('it stamps the intake stone + its guard', () => {
        expect(existsSync(path.join(tempDir, '1.1.intake.stone'))).toBe(true);
        expect(existsSync(path.join(tempDir, '1.1.intake.guard'))).toBe(true);
      });

      then('it stamps the compiled-core stones (score + redteam)', () => {
        expect(existsSync(path.join(tempDir, '2.1.score.stone'))).toBe(true);
        expect(existsSync(path.join(tempDir, '3.1.redteam.stone'))).toBe(true);
      });

      then('it stamps the binary-acuity + two-layer-output stones', () => {
        expect(existsSync(path.join(tempDir, '4.1.acuity.stone'))).toBe(true);
        expect(existsSync(path.join(tempDir, '5.2.output.patient.stone'))).toBe(
          true,
        );
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
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-bindfail' });
    const binDir = genTempDir({ slug: 'diagnose-melanoma-stubbin' });

    when(
      '[t0] rhx route.bind.set exits non-zero, init runs with bind live',
      () => {
        // documented-unavoidable mock (see genRhxStub): a real bind is not hermetically
        // reachable through the skill. this stub exits non-zero to drive the bind-failure
        // path AND records its args, so the test proves the skill invoked the bind with the
        // correct contract (route.bind.set --route <ROUTE_PATH>) — the very defect a blind
        // stub would hide — rather than a bare non-zero exit alone.
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
          expect(existsSync(path.join(tempDir, '1.1.intake.stone'))).toBe(true);
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
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-badflag' });

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
    const home = genTempDir({ slug: 'diagnose-melanoma-notpl-home' });
    const route = genTempDir({ slug: 'diagnose-melanoma-notpl-route' });

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
    const home = genTempDir({ slug: 'diagnose-melanoma-nostones-home' });
    const route = genTempDir({ slug: 'diagnose-melanoma-nostones-route' });

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
    const cwd = genTempDir({ slug: 'diagnose-melanoma-defaultpath' });

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
        'it stamps at the default .route/v<DATE>.diagnose.melanoma path, snapshot held',
        () => {
          expect(result.stdout).toContain('.route/v');
          expect(result.stdout).toContain('.diagnose.melanoma');
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
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-restamp' });

    when(
      '[t0] init runs twice, with a stone edited between the two runs',
      () => {
        const first = runSkill({
          args: ['init', '--at', tempDir],
          env: { SKIP_ROUTE_BIND: '1' },
        });
        // simulate diagnostic work written into a stamped stone between runs
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

  given('[case12] bind succeeds but the branch cannot be read', () => {
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-badbranch' });
    const binDir = genTempDir({ slug: 'diagnose-melanoma-badbranch-bin' });

    when(
      '[t0] rhx is stubbed to pass but git rev-parse is stubbed to fail',
      () => {
        // UNAVOIDABLE MOCK (rule.forbid.integration.mocks exception, documented inline):
        // this guard fires only when the bind SUCCEEDS yet the very next `git rev-parse`
        // FAILS — an inconsistent-repo race no real tool pair can produce on demand. so we
        // stub `rhx` to exit 0 (bind "succeeds") AND `git` to exit non-zero (rev-parse fails)
        // to reach the exit-1 inconsistency guard (rule.require.clamp-edge-cases). the branch
        // is byte-identical across all three init.sh, so this clamp lives in every suite that
        // ships the branch. the real bind paths cannot run hermetically through the skill
        // either (see genRhxStub) — case4 (fail) and case13 (success) assert the call contract.
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
          expect(existsSync(path.join(tempDir, '4.1.acuity.stone'))).toBe(true);
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

  given('[case13] the bind-success footer (bind ok, REAL git branch)', () => {
    const tempDir = genTempDir({ slug: 'diagnose-melanoma-bindok' });
    const binDir = genTempDir({ slug: 'diagnose-melanoma-bindok-bin' });

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
            // the current branch is sanitized to <BRANCH>, so the snapshot is hermetic
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
    '[case14] a REAL rhx route.bind.set against a route that does not exist',
    () => {
      // the ONE durably-hermetic REAL (non-stubbed) `rhx route.bind.set` invocation reachable
      // from a test: an ABSENT route path. setRouteBind fs.access-rejects the route BEFORE any
      // branch/flag logic (verified in rhachet-roles-bhrain dist), so this real call is
      // independent of the current git branch, the already-bound behavior-route flag, and cwd —
      // it reproduces on any machine and in CI. it is the masked-LIVE-layer companion to case13's
      // injected-layer success footer: case13 proves the exact bind-success STRING against a
      // stubbed source; this proves the real bind CONTRACT (its arg validation + rejection shape)
      // against the real `rhx` binary the skill actually shells out to. per
      // rule.require.contract-snapshot-exhaustiveness, the live and injected snapshots are
      // complementary, not substitutes — the injected layer pins the volatile value against a
      // stub, the live layer pins the contract shape against the real source.
      const parent = genTempDir({ slug: 'diagnose-melanoma-bind-absent' });
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
