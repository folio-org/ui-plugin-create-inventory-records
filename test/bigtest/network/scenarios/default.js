/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.create('instance-type', {
    id: 1,
    name: 'still image',
    code: 'sti',
    source: 'rdacarrier',
  });
  server.create('instance-type', {
    id: 2,
    name: 'computer dataset',
    code: 'cod',
    source: 'rdacarrier',
  });
  server.create('contributor-name-type', { id: 1, name: 'Personal name' });
  server.create('contributor-name-type', { id: 2, name: 'Corporate name' });
  server.create('contributor-name-type', { id: 3, name: 'Meeting name' });

  server.create('identifier-type', { id: 1, name: 'ISBN' });
  server.create('identifier-type', { id: 2, name: 'ISSN' });
}
