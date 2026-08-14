import { given, then, when } from 'test-fns';

import { getRoleRegistry } from './getRoleRegistry';

describe('getRoleRegistry', () => {
  given('[case1] the mhedic registry', () => {
    when('[t0] the registry is loaded', () => {
      const registry = getRoleRegistry();

      then('it is slugged as mhedic', () => {
        expect(registry.slug).toEqual('mhedic');
      });

      then('it declares the six baseline roles', () => {
        expect(registry.roles.map((role) => role.slug).sort()).toEqual([
          'diagnostician',
          'phylogeneticist',
          'physician',
          'prescriber',
          'preventer',
          'referrer',
        ]);
      });

      then('every role declares a purpose', () => {
        for (const role of registry.roles) {
          expect(role.purpose).toBeTruthy();
        }
      });
    });
  });
});
