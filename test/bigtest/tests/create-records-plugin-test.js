import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/helpers';
import CreateRecordsPluginInteractor from '../interactors/createRecordsPlugin';

const plugin = new CreateRecordsPluginInteractor();

describe('CreateInventoryRecords', () => {
  setupApplication();

  it('renders button', () => {
    expect(plugin.button.isPresent).to.be.true;
  });

  describe('click "New fast add record" button', () => {
    beforeEach(async () => {
      await plugin.button.click();
    });

    it('opens a plugin', () => {
      expect(plugin.form.isPresent).to.be.true;
    });

    describe('save instance', () => {
      beforeEach(async function () {
        // instance record
        await plugin.form.issnField('123');
        await plugin.form.isbnField('456');
        await plugin.form.fillTitleField('title');
        await plugin.form.publicationDateField('2020');
        await plugin.form.selectInstanceStatus('Cataloged');
        await plugin.form.selectInstanceType('computer dataset');
        await plugin.form.contributors.clickAddNewContributor();
        await plugin.form.contributors.fillNameField('name');
        await plugin.form.contributors.selectNameTypeField('Personal name');

        await plugin.form.contributors.makeFirstContributorPrimary();

        // holdings record
        await plugin.form.openLocationLookup();
        await plugin.locationLookup.whenLoaded();
        await plugin.locationLookup.clickOnLocationBtn();
        await plugin.locationLookup.chooseFirstLocation();
        await plugin.locationLookup.clickSaveBtn();
        await plugin.locationLookup.whenClosed();

        // item
        await plugin.form.selectMaterialType('text');
        await plugin.form.selectPermanentLoanType('Can circulate');
        await plugin.form.circulationNotes.fillNoteField('check out');

        await plugin.form.clickSaveButton();
      });

      it('saves instance and closes modal', () => {
        expect(plugin.form.isPresent).to.be.false;
        expect(plugin.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('click cancel', () => {
      beforeEach(async () => {
        await plugin.form.clickCancel();
      });

      it('closes plugin', () => {
        expect(plugin.form.isPresent).to.be.false;
      });
    });
  });
});
