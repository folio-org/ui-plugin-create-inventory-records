// mimics the StripesTranslationPlugin in @folio/stripes-core
export function prefixKeys(obj, prefix = 'ui-plugin-create-inventory-records') {
  const res = {};

  for (const key of Object.keys(obj)) {
    res[`${prefix}.${key}`] = obj[key];
  }

  return res;
}
