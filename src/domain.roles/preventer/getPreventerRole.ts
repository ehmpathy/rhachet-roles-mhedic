import { Role } from 'rhachet';

/**
 * .what = the preventer role definition
 * .why = defines briefs and skills for preventative care — screens,
 *        vaccines, risk factors, and lifestyle
 */
export const ROLE_PREVENTER: Role = Role.build({
  slug: 'preventer',
  name: 'Preventer',
  purpose: 'stay ahead of disease before it starts',
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
            './node_modules/.bin/rhachet roles boot --repo mhedic --role preventer',
          timeout: 'PT60S',
        },
      ],
      onTool: [],
      onStop: [],
    },
  },
});
