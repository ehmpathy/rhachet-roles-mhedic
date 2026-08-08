import { Role } from 'rhachet';

/**
 * .what = the referrer role definition
 * .why = defines briefs and skills to route a patient to the right care
 */
export const ROLE_REFERRER: Role = Role.build({
  slug: 'referrer',
  name: 'Referrer',
  purpose: 'route to the right care, in the right place',
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
            './node_modules/.bin/rhachet roles boot --repo mhedic --role referrer',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
