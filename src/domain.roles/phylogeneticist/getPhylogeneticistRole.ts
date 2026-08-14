import { Role } from 'rhachet';

/**
 * .what = the phylogeneticist role definition
 * .why = declares clades and files each biological mechanism at the branch
 *        of the tree of life where it arose, so other roles can tell whether
 *        a mechanism transfers across species (conancestral) or diverged
 */
export const ROLE_PHYLOGENETICIST: Role = Role.build({
  slug: 'phylogeneticist',
  name: 'Phylogeneticist',
  purpose: 'reconstruct where a mechanism arose on the tree of life and who inherits it',
  readme: { uri: `${__dirname}/readme.md` },
  boot: { uri: `${__dirname}/boot.yml` },
  keyrack: { uri: `${__dirname}/keyrack.yml` },
  traits: [],
  briefs: {
    dirs: { uri: `${__dirname}/briefs` },
  },
  skills: {
    dirs: { uri: `${__dirname}/skills` },
    refs: [],
  },
  inits: {
    dirs: { uri: `${__dirname}/inits` },
    exec: [],
  },
  hooks: {
    onBrain: {
      onBoot: [
        {
          command:
            './node_modules/.bin/rhachet roles boot --repo mhedic --role phylogeneticist',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
