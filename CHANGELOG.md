# Change history for ui-plugin-create-inventory-records

## (IN PROGRESS)
* *BREAKING* Creating an item barcode using number generator in Fast Add. Refs UIPCIR-97.
* Support interface `item-storage` `11.0`. Refs UIPCIR-98.

## [6.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v6.0.0) (2025-03-13)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v5.0.1...v6.0.0)

* CI: Switch to centralized/shared workflow. Refs UIPCIR-93.
* *BREAKING* Migrate stripes dependencies to their Sunflower versions. Refs UIPCIR-94.
* *BREAKING* Migrate `react-intl` to v7. UIPCIR-95.

## [5.0.1](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v5.0.1) (2024-11-25)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v5.0.0...v5.0.1)

* Jest/RTL: Cover `ContributorFields` component with unit tests. Refs UIPCIR-76.
* Jest/RTL: Cover `CirculationNoteFields` component with unit tests. Refs UIPCIR-77.
* `React v19`: refactor away from default props for functional components. Refs UIPCIR-81.

## [5.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v5.0.0) (2024-10-30)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v4.1.0...v5.0.0)

* Jest/RTL: Cover `useIsLoading` hook with unit tests. Refs UIPCIR-69.
* Jest/RTL: Cover `HoldingAccordion` component with unit tests. Refs UIPCIR-74.
* Jest/RTL: Cover `InstanceAccordion` component with unit tests. Refs UIPCIR-73.
* Jest/RTL: Cover `ElectronicAccessFields` component with unit tests. Refs UIPCIR-75.
* Jest/RTL: Cover `useCallout` hook with unit tests. Refs UIPCIR-71.
* "holdings-storage" API version update. Refs UIPCIR-82.
* Jest/RTL: Cover `useData` hook with unit tests. Refs UIPCIR-70.
* Jest/RTL: Cover `DataProvider` component with unit tests. Refs UIPCIR-67.
* Update `actions/upload-artifact@v2` to `actions/upload-artifact@v4`. Refs UIPCIR-87.
* Also support `inventory` `v14.0`. Refs UIPCIR-85.
* Also support `instance-storage` `11.0`. Refs UIPCIR-86.
* Remove bigtest from github workflows. Refs UIPCIR-91.
* Support `holdings-storage` `8.0`. Refs UIPCIR-83.
* *BREAKING* Bump `stripes` to `v9.2.0` for Ramsons release. Refs UIPCIR-89.

## [4.1.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v4.1.0) (2024-03-21)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v4.0.0...v4.1.0)

* Correctly handle optional `x-okapi-token` request header. Fixes UIPCIR-61.
* Remove not needed Paneset to correctly calculate pane widths when closing plugin. Fixes UIPCIR-78.
* Jest/RTL: Cover `useOptions` hook with unit tests. Refs UIPCIR-68.
* Jest/RTL: Cover `CreateRecordsWrapper` component with unit tests. Refs UIPCIR-64.
* Jest/RTL: Cover `CreateRecordsForm` component with unit tests. Refs UIPCIR-66.
* Jest/RTL: Cover `CreateRecordsPlugin` component with unit tests. Refs UIPCIR-65.
* Jest/RTL: Cover util.js with unit tests. Refs UIPCIR-63.
* Jest/RTL: Cover `PrimaryToggleButton` component with unit tests. Refs UIPCIR-72.

## [4.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v4.0.0) (2023-10-12)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v3.3.0...v4.0.0)

* To support UX consistency, the translation key from the stripes components for the save and close button is now used. Fixes UIPCIR-52.
* Also support `circulation` `14.0`. Refs UIPCIR-53.
* *BREAKING* bump `react` to `v18`, and dev-deps accordingly (UIPCIR-55)
* Update Node.js to v18 in GitHub Actions (UIPCIR-56)
* Setup Jest for unit testing (UIPCIR-57)
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UIPCIR-58

## [3.3.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v3.3.0) (2023-02-20)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v3.2.0...v3.3.0)

* Set correct `sourceId` on holdings records. Fixes UIPCIR-47.
* Update inventory interface to version 13. Refs UIPCIR-49.

## [3.2.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v3.2.0) (2022-10-24)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v3.1.0...v3.2.0)

* Debounce barcode validation. Fixes UIPCIR-40.
* Also support `instance-storage` `9.0`. Refs UIPCIR-42.
* Also support `holdings-storage` `6.0`. Refs UIPCIR-42.
* Also support `item-storage` `10.0`. Refs UIPCIR-42.
* Also support `inventory` `12.0`. Refs UIPCIR-44.
* Bump `users` interface to version `16.0`. Refs UIPCIR-41.

## [3.1.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v3.1.0) (2022-03-03)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v3.0.0...v3.1.0)

* Update mocha version. Refs UIPCIR-32.
* Also support `circulation` `12.0`. Refs UIPCIR-30.
* Also support `circulation` `13.0`. Refs UIPCIR-31.

## [3.0.0](https://github.com/folio-org/ui-plugin-create-inventory-records/tree/v3.0.0) (2021-10-05)
[Full Changelog](https://github.com/folio-org/ui-plugin-create-inventory-records/compare/v2.1.0...v3.0.0)

* Increment stripes to v7, react to v17. Refs UIPCIR-25.

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
