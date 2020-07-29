import { trait } from 'miragejs';

import Factory from './application';

export default Factory.extend({
  withItem: trait({
    afterCreate(holding, server) {
      const item = server.create('item');
      holding.items = [item];
      holding.save();
      item.save();
    }
  }),
});
