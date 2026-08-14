import { RoleRegistry } from 'rhachet';

import { ROLE_DIAGNOSTICIAN } from './diagnostician/getDiagnosticianRole';
import { ROLE_PHYLOGENETICIST } from './phylogeneticist/getPhylogeneticistRole';
import { ROLE_PHYSICIAN } from './physician/getPhysicianRole';
import { ROLE_PRESCRIBER } from './prescriber/getPrescriberRole';
import { ROLE_PREVENTER } from './preventer/getPreventerRole';
import { ROLE_REFERRER } from './referrer/getReferrerRole';

/**
 * .what = returns the mhedic registry of predefined roles
 * .why =
 *   - enables CLI or thread logic to load available roles
 *   - avoids dynamic mutation
 */
export const getRoleRegistry = (): RoleRegistry =>
  new RoleRegistry({
    slug: 'mhedic',
    readme: { uri: `${__dirname}/readme.md` },
    roles: [
      ROLE_DIAGNOSTICIAN,
      ROLE_PHYLOGENETICIST,
      ROLE_PHYSICIAN,
      ROLE_PRESCRIBER,
      ROLE_PREVENTER,
      ROLE_REFERRER,
    ],
  });
