import { given, then, when } from 'test-fns';

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import * as path from 'node:path';

/**
 * .what = clamp that every inventory a stone cites actually exists on disk
 * .why  = the melanoma/referral stones lean on build-time cited inventories
 *         named in their `.inputs`. that reference is pure markdown prose — no
 *         structural check stops a stone from citing an inventory file that was
 *         renamed, moved, or never written. a dangling citation is a silent
 *         trust defect: the stone reads as cited, but the source is absent. this
 *         test looks up every inventory citation in every stone against the repo
 *         inventory dir and fails loud on a dangling ref
 *         (rule.require.clamp-edge-cases, rule.require.accrue-research).
 *
 * .naming-convention = inventory files use the repo convention
 *   `inventory.of=<topic>.md` — the FULL string (prefix included) IS the on-disk
 *   filename, verified by [case0] below against the real inventory dirs. a stone
 *   cites a source by that exact filename, so the citation token equals the
 *   filename verbatim. therefore the citation maps to a file via a direct
 *   `path.join(<inventoryDir>, citedFilename)` — no prefix-strip is correct here,
 *   and stripping `inventory.of=` would make every citation point to a
 *   non-existent bare-topic path (a false-dangling regression).
 *
 * .home = a promoted inventory lives at the MOST-COMMON-DENOMINATOR by role
 *   (rule.require.accrue-research): a single-role fact at that role's
 *   `src/domain.roles/<role>/briefs/inventory/`, a genuinely cross-role fact at
 *   the repo-wide `.agent/repo=.this/role=any/briefs/inventory/`. so a citation
 *   is looked up against the UNION of these dirs, not one fixed dir.
 */
describe('inventory wiring: stone citations -> inventory files', () => {
  const repoRoot = path.join(__dirname, '..', '..');

  // the inventory homes a citation may map to: each role leaf + the repo-wide
  // role=any ancestor. a cited filename is found if it exists in ANY of them.
  const inventoryDirs = [
    path.join(__dirname, 'diagnostician/briefs/inventory'),
    path.join(__dirname, 'referrer/briefs/inventory'),
    path.join(repoRoot, '.agent/repo=.this/role=any/briefs/inventory'),
  ].filter((dir) => existsSync(dir));

  const templateDirs = [
    path.join(__dirname, 'diagnostician/skills/diagnose.melanoma/templates'),
    path.join(__dirname, 'referrer/skills/refer.care/templates'),
  ];

  // collect (stoneFile, citedFilename) pairs across every stone template.
  // extract the cited inventory filenames from a stone's prose. each match is the full
  // `inventory.of=<topic>.md` token, which — per the convention proven in [case0] — is
  // the inventory filename verbatim. a named transformer keeps the raw regex out of the loop.
  const asCitedFilenames = (input: { text: string }): string[] =>
    input.text.match(/inventory\.of=[\w.-]+\.md/g) ?? [];

  // a cited filename is found if it exists in ANY inventory home (union lookup)
  const isCitedFileFound = (input: { citedFilename: string }): boolean =>
    inventoryDirs.some((dir) =>
      existsSync(path.join(dir, input.citedFilename)),
    );

  const collectCitations = (): { stone: string; citedFilename: string }[] => {
    const pairs: { stone: string; citedFilename: string }[] = [];
    for (const dir of templateDirs) {
      const stones = readdirSync(dir).filter((f) => f.endsWith('.stone'));
      for (const stone of stones) {
        const text = readFileSync(path.join(dir, stone), 'utf-8');
        for (const citedFilename of new Set(asCitedFilenames({ text })))
          pairs.push({ stone: path.join(dir, stone), citedFilename });
      }
    }
    return pairs;
  };

  given(
    '[case0] inventory files follow the inventory.of=<topic>.md convention',
    () => {
      when('[t0] the inventory dir is listed', () => {
        then(
          'every inventory filename carries the inventory.of= prefix',
          () => {
            // this proves the on-disk naming: the citation token equals the filename,
            // so a direct join (no prefix-strip) is the correct lookup. scan every
            // inventory home (each role leaf + role=any) as one union.
            const files = inventoryDirs.flatMap((dir) =>
              readdirSync(dir).filter((f) => f.endsWith('.md')),
            );
            const offenders = files.filter(
              (f) => !f.startsWith('inventory.of='),
            );
            expect(files.length).toBeGreaterThan(0);
            expect(offenders).toEqual([]);
          },
        );
      });
    },
  );

  given('[case1] stones cite build-time inventories', () => {
    const citations = collectCitations();

    when('[t0] the stone templates are scanned for inventory citations', () => {
      then(
        'at least one stone cites an inventory (the reference exists)',
        () => {
          expect(citations.length).toBeGreaterThan(0);
        },
      );

      then('every cited inventory file exists in an inventory home', () => {
        // citedFilename IS the on-disk filename (case0); look it up across the
        // union of inventory homes (role leaves + role=any)
        const dangling = citations.filter(
          (pair) => !isCitedFileFound({ citedFilename: pair.citedFilename }),
        );
        // surface the exact dangling (stone -> absent file) pairs on failure
        expect(
          dangling.map(
            (d) => `${path.basename(d.stone)} -> ${d.citedFilename}`,
          ),
        ).toEqual([]);
      });
    });
  });

  given('[case2] the wish-critical inventories are cited by a stone', () => {
    const citations = collectCitations();
    const citedFilenames = new Set(citations.map((c) => c.citedFilename));

    when('[t0] the two answer-bearing inventories are checked', () => {
      then('melanoma-ai-classifiers (phone-limit, wish Q1) is cited', () => {
        // the 5.2 patient layer's "7% classifier floor" traces here
        expect(
          citedFilenames.has('inventory.of=melanoma-ai-classifiers.md'),
        ).toBe(true);
      });

      then(
        'teledermatology-concordance (virtual-vs-in-person, wish Q3) is cited',
        () => {
          // the 2.1 venue stone's telederm tradeoff traces here
          expect(
            citedFilenames.has('inventory.of=teledermatology-concordance.md'),
          ).toBe(true);
        },
      );
    });
  });
});
