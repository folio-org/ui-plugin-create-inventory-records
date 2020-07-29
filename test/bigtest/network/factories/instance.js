import faker from 'faker';
import { trait } from 'miragejs';

import Factory from './application';

const {
  lorem,
  name,
} = faker;

export default Factory.extend({
  title: () => lorem.sentence(),
  contributors: () => [{ name: `${name.lastName()}, ${name.firstName()}` }],
  afterCreate(instance, server) {
    instance.contributors.forEach(contributor => {
      let { contributorNameTypeId } = contributor;
      if (!contributorNameTypeId) {
        let [type] = server.db.contributorNameTypes.where({ name: 'Personal name' });
        if (!type) {
          type = server.create('contributor-name-type', { name: 'Personal name' });
        }
        contributorNameTypeId = type.id;
      }
      contributor.contributorNameTypeId = contributorNameTypeId;
    });
  },

  withHoldingAndItem: trait({
    afterCreate(instance, server) {
      const holding = server.create('holding', 'withItem');
      instance.holdings = [holding];
      instance.save();
    }
  }),
});
