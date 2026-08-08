import { Role } from 'rhachet';

/**
 * .what = the diagnostician role definition
 * .why = defines briefs and skills for clinical assessment — intake,
 *        differential, test selection, and urgency
 */
export const ROLE_DIAGNOSTICIAN: Role = Role.build({
  slug: 'diagnostician',
  name: 'Diagnostician',
  purpose: 'trace symptoms to their likely causes',
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
            './node_modules/.bin/rhachet roles boot --repo mhedic --role diagnostician',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
