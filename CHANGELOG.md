# Change history for ui-plugin-create-inventory-records

## [2.1.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v2.1.0) (2021-06-18)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v2.0.0...v2.1.0)

* Also support `circulation` `10.0`. Refs UIPCIR-20.
* Also support `circulation` `11.0`. Refs UIPCIR-21.
* Add async barcode validation. Fixes UIPCIR-24.

## [2.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v2.0.0) (2021-03-11)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v1.0.0...v2.0.0)

* Update permission for because of renaming of instance-bulk endpoint. Refs UIIN-1368.
* Updated `onClose` prop to receive arg containing instance, holdings, and item record data. Refs UICR-91.
* Wrapped rendering in an `IfPermission` check.
* Added `renderTrigger` prop to customize trigger rendering within the `IfPermission` check.
* BREAKING CHANGE - Removed `buttonVisible` prop. `renderTrigger` should be used instead.
* Upgrade to stripes v6. Fixes UIPCIR-16.

## [1.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v1.0.0) (2020-10-13)

* Removed permission allowing access to inventory.  Addresses UIPCIR-12.
* Adding permissions to create holdings and item records.  Partially addresses UIPCIR-6
* Create instance via "fast add" form. Fixes UIPCIR-1.
* Create holdings record via "fast add" form. Refs UIPCIR-2.
* Create item record via "fast add" form. Refs UIPCIR-3.
* Add a confirmation modal to fast add form. Fixes https://issues.folio.org/browse/UIPCIR-5.
* Add defaults from Settings when creating a fast add record. Refs UIPCIR-7.
* Correctly locate `okapiInterfaces` in `package.json`. Fixes UIPCIR-11.
* Provide fast-add permission set. Refs UIPCIR-6.
* Add alternate okapiInterfaces dependencies for `inventory 11.0`, `instance-storage 8.0`, `holdings-storage 5.0`, and `item-storage 9.0`. Refs UIPCIR-26.