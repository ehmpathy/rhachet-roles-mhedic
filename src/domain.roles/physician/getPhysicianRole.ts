import { Role } from 'rhachet';

/**
 * .what = the physician role definition
 * .why = defines briefs and skills for the generalist that composes
 *        diagnostician, prescriber, and referrer into one view
 */
export const ROLE_PHYSICIAN: Role = Role.build({
  slug: 'physician',
  name: 'Physician',
  purpose: 'compose the whole-person view across the other roles',
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
            './node_modules/.bin/rhachet roles boot --repo mhedic --role physician',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
