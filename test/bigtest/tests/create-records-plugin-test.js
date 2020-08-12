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

    it('opens a modal', () => {
      expect(plugin.modal.isPresent).to.be.true;
      expect(plugin.modal.form.isPresent).to.be.true;
    });

    describe('save instance', () => {
      beforeEach(async function () {
        // instance record
        await plugin.modal.form.issnField('123');
        await plugin.modal.form.isbnField('456');
        await plugin.modal.form.fillTitleField('title');
        await plugin.modal.form.selectInstanceType('computer dataset');
        await plugin.modal.form.contributors.clickAddNewContributor();
        await plugin.modal.form.contributors.fillNameField('name');
        await plugin.modal.form.contributors.selectNameTypeField('Personal name');
        await plugin.modal.form.contributors.makeFirstContributorPrimary();

        // holdings record
        await plugin.modal.form.openLocationLookup();
        await plugin.locationLookup.whenLoaded();
        await plugin.locationLookup.clickOnLocationBtn();
        await plugin.locationLookup.chooseFirstLocation();
        await plugin.locationLookup.clickSaveBtn();
        await plugin.locationLookup.whenClosed();

        // item
        await plugin.modal.form.selectMaterialType('text');
        await plugin.modal.form.selectPermanentLoanType('Can circulate');
        await plugin.modal.form.circulationNotes.fillNoteField('check out');

        await plugin.modal.clickSaveButton();
      });

      it('saves instance and closes modal', () => {
        expect(plugin.modal.isPresent).to.be.false;
        expect(plugin.callout.successCalloutIsPresent).to.be.true;
      });
    });

    describe('click cancel', () => {
      beforeEach(async () => {
        await plugin.modal.clickCancel();
      });

      it('closes modal', () => {
        expect(plugin.modal.isPresent).to.be.false;
      });
    });
  });
});
