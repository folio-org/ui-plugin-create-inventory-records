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

  server.create('material-type', { id: 1, name: 'text' });
  server.create('material-type', { id: 2, name: 'book' });

  server.create('loan-type', { id: 1, name: 'Can circulate' });
  server.create('loan-type', { id: 2, name: 'Course reserves' });

  server.create('item-note-type', { id: 1, name: 'Action note' });
  server.create('item-note-type', { id: 2, name: 'Copy note' });

  server.create('electronic-access-relationship', { id: 1, name: 'Resource' });
  server.create('electronic-access-relationship', { id: 2, name: 'Related resource' });

  server.create('instance-status', { id: '1', name: 'Batch Loaded' });
  server.create('instance-status', { id: '2', name: 'Cataloged' });
}
