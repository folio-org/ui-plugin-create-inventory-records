# ui-plugin-create-inventory-records

Copyright (C) 2017-2020 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

This package furnishes a single Stripes plugin of type `create-inventory-records`,
which can be included in Stripes modules by means of a `<Pluggable
type="create-inventory-records">` element. See [the *Plugins*
section](https://github.com/folio-org/stripes-core/blob/master/doc/dev-guide.md#plugins)
of the Module Developer's Guide.

## Props

The following props can be passed to the `Pluggable` component. They will be passed through to this plugin.

| prop | type | description |
|------|------|-------------|
| `buttonVisible` | boolean | When true, this plugin will render its own trigger that opens the modal |
| `onClose` | Object: `{ instanceRecord, holdingsRecord, itemRecord }` | Function called upon closing the modal. If the close is the result of a successful record creation, then an object will be passed that contains info about the created records. |
| `open` | boolean | When true, this plugin will render the record-creation modal. |

## Additional information

Other [modules](https://dev.folio.org/source-code/#client-side).

See project [UIPFU](https://issues.folio.org/browse/UIPFU)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker/).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)
