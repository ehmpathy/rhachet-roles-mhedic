import { given, then, when } from 'test-fns';

import { readFileSync, realpathSync } from 'node:fs';
import * as path from 'node:path';

/**
 * .what = clamp that no `extends` in `.agent/keyrack.yml` points into THIS repo's
 *         own `dist/`
 * .why  = the keyrack bootstrap reads every extend at test-suite startup and
 *         throws `ConstraintError: extended keyrack not found` when one is absent.
 *         every `.agent/repo=<repo>/` path is a gitignored symlink, so trackedness
 *         tells you naught — what matters is WHERE the symlink points:
 *
 *           - into `node_modules/.../dist/` -> an installed package, so `pnpm
 *             install` supplies it and ci finds it
 *           - into this repo's own `dist/`  -> a BUILD ARTIFACT of the repo under
 *             test. `dist/` is gitignored, and the env bootstrap runs before any
 *             build, so ci never finds it
 *
 *         the asymmetry is invisible locally, because a developer has built
 *         `dist/` at some point and the symlink lands ever after.
 *
 *         measured 2026-09-10: an extend of
 *         `.agent/repo=mhedic/role=diagnostician/keyrack.yml` -> `../../../dist/...`
 *         passed every local run and took down all 3 integration shards in ci.
 *         that manifest also declared zero keys, so the extend bought naught —
 *         this repo's own keys belong in `.agent/keyrack.yml` directly.
 *
 * .the-class = not "that one path", but ANY extend that lands in `dist/`
 *   (rule.require.clamp-edge-cases).
 */
describe('keyrack wiring: .agent/keyrack.yml extends -> ci-reachable paths', () => {
  const repoRoot = path.join(__dirname, '..');
  const manifestPath = path.join(repoRoot, '.agent/keyrack.yml');
  const distDir = path.join(repoRoot, 'dist');

  // the `extends:` block is a flat yaml list of paths, so a line-scan reads it
  // without a yaml dep. stops at the next top-level key.
  const extendsPaths = (() => {
    const lines = readFileSync(manifestPath, 'utf-8').split('\n');
    const start = lines.findIndex((line) => line.trim() === 'extends:');
    if (start === -1) return [];
    const paths: string[] = [];
    for (const line of lines.slice(start + 1)) {
      if (/^\S/.test(line)) break; // a top-level key ends the block
      const match = /^\s+-\s+(\S+)/.exec(line);
      if (match?.[1]) paths.push(match[1]);
    }
    return paths;
  })();

  given('[case0] the .agent/keyrack.yml manifest', () => {
    when('[t0] its extends block is read', () => {
      then('at least one extend is declared', () => {
        // guards the parser itself: a silent [] would make every case below vacuous
        expect(extendsPaths.length).toBeGreaterThan(0);
      });
    });
  });

  given('[case1] each declared extend path', () => {
    when('[t0] its symlink is expanded to a real path', () => {
      then("no extend lands in this repo's own dist/", () => {
        const intoOwnDist = extendsPaths.filter((extendPath) => {
          const landed = realpathSync(path.join(repoRoot, extendPath));
          // an installed package also ends in `dist/`, so the node_modules
          // segment is what parts a supplied path from a built one
          if (landed.includes(`${path.sep}node_modules${path.sep}`))
            return false;
          return landed.startsWith(distDir + path.sep);
        });

        expect(intoOwnDist).toEqual([]);
      });
    });
  });
});
