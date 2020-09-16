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
      await plugin.whenLoaded();
    });

    it('opens a plugin', () => {
      expect(plugin.form.isPresent).to.be.true;
    });

    describe('close plugin', () => {
      beforeEach(async () => {
        await plugin.form.clickCancel();
      });

      it('closes plugin', () => {
        expect(plugin.form.isPresent).to.be.false;
      });
    });

    describe('validate instance', () => {
      beforeEach(async () => {
        await plugin.form.isbnField('456');
        await plugin.form.clickSaveButton();
      });

      it('keeps form open', () => {
        expect(plugin.form.isPresent).to.be.true;
      });
    });

    describe('input partial data, then click cancel', () => {
      beforeEach(async () => {
        await plugin.form.issnField('123');
        await plugin.form.isbnField('456');
        await plugin.form.fillTitleField('title');
        await plugin.form.clickCancel();
        await plugin.whenCancelModalLoaded();
      });

      it('opens the cancel confirm modal', () => {
        expect(plugin.cancelModal.isPresent).to.be.true;
      });

      describe('click confirm', () => {
        beforeEach(async () => {
          await plugin.cancelModal.clickConfirm();
        });
        it('clicking confirm closes modal without closing form', () => {
          expect(plugin.cancelModal.isPresent).to.be.false;
          expect(plugin.form.isPresent).to.be.true;
        });
      });
      describe('click cancel', () => {
        beforeEach(async () => {
          await plugin.cancelModal.clickCancel();
        });
        it('clicking cancel closes modal and form', () => {
          expect(plugin.cancelModal.isPresent).to.be.false;
          expect(plugin.form.isPresent).to.be.false;
        });
      });
    });

    describe('save instance', () => {
      beforeEach(async () => {
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
        await plugin.locationLookup.clickOnLocationBtn();
        await plugin.locationLookup.whenLocationSelectLoaded();
        await plugin.locationLookup.chooseFirstLocation();

        // item
        await plugin.form.selectMaterialType('text');
        await plugin.form.selectPermanentLoanType('Can circulate');
        await plugin.form.circulationNotes.fillNoteField('check out');
        await plugin.form.clickAddElectronicAccess();
        await plugin.form.electronicAccess.selectRelationship('Resource');
        await plugin.form.electronicAccess.fillUriField('uri');

        await plugin.form.clickSaveButton();
      });

      it('saves instance and closes modal', () => {
        expect(plugin.callout.successCalloutIsPresent).to.be.true;
      });
    });
  });
});
