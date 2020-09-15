export default function config() {
  this.get('/_/version', () => '0.0.0');

  this.get('_/proxy/tenants/:id/modules', []);

  this.get('/saml/check', {
    ssoEnabled: false
  });

  this.get('/configurations/entries', {
    configs: []
  });

  this.post('/bl-users/login', () => {
    return new Response(201, {
      'X-Okapi-Token': `myOkapiToken:${Date.now()}`
    }, {
      user: {
        id: 'test',
        username: 'testuser',
        personal: {
          lastName: 'User',
          firstName: 'Test',
          email: 'user@folio.org',
        }
      },
      permissions: {
        permissions: []
      }
    });
  });

  this.get('/location-units/institutions', {
    locinsts: [{
      id: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
      name: 'Københavns Universitet',
      code: 'KU',
    }],
    totalRecords: 2,
  });

  this.get('/location-units/campuses', {
    loccamps: [{
      id: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
      name: 'City Campus',
      code: 'CC',
      institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
    }],
    totalRecords: 2,
  });

  this.get('/location-units/libraries', {
    loclibs: [{
      id: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
      name: 'Datalogisk Institut',
      code: 'DI',
      campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
    }],
    totalRecords: 1,
  });

  this.get('/locations', {
    locations: [
      {
        id: '1',
        name: 'Annex',
        code: 'Code1',
        isActive: true,
        institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
        libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
        primaryServicePoint: '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
        servicePointIds: [
          '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
        ],
      },
      {
        id: '2',
        name: 'Main Library',
        code: 'Code2',
        isActive: true,
        institutionId: '40ee00ca-a518-4b49-be01-0638d0a4ac57',
        campusId: '62cf76b7-cca5-4d33-9217-edf42ce1a848',
        libraryId: '5d78803e-ca04-4b4a-aeae-2c63b924518b',
        primaryServicePoint: '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
        servicePointIds: [
          '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
        ],
      },
    ],
    totalRecords: 2,
  });

  this.get('/contributor-name-types');
  this.get('/instance-types');
  this.get('/identifier-types');
  this.get('/item-note-types');
  this.get('/material-types');
  this.get('/loan-types');
  this.get('/electronic-access-relationships');
  this.get('/instance-statuses');

  this.get('/call-number-types', {
    callNumberTypes: [],
    totalRecords: 0
  });

  this.post('/inventory/instances', ({ instances }, request) => {
    const body = JSON.parse(request.requestBody);
    const instance = instances.create(body);

    return instance.attrs;
  });

  this.post('/holdings-storage/holdings', ({ holdings }, request) => {
    const body = JSON.parse(request.requestBody);
    const holding = holdings.create(body);

    return holding.attrs;
  });

  this.post('/inventory/items', ({ items }, request) => {
    const body = JSON.parse(request.requestBody);
    const item = items.create(body);

    return item.attrs;
  });
}
