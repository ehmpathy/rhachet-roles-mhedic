import { Role } from 'rhachet';

/**
 * .what = the prescriber role definition
 * .why = defines briefs and skills to turn a diagnosed cause into a care plan
 */
export const ROLE_PRESCRIBER: Role = Role.build({
  slug: 'prescriber',
  name: 'Prescriber',
  purpose: 'turn a cause into a concrete course of care',
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
            './node_modules/.bin/rhachet roles boot --repo mhedic --role prescriber',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
