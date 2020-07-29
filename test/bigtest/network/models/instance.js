import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  instanceType: belongsTo('instance-type'),
  holdings: hasMany(),
});
