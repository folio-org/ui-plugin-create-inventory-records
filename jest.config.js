const config = require('@folio/jest-config-stripes');

const additionalModules = ['@k-int/stripes-kint-components'].join('|');
const combinedModules = config.transformIgnorePatterns[0].replace(')', `|${additionalModules})`);

module.exports = {
  ...config,
  transformIgnorePatterns: [combinedModules],
};
