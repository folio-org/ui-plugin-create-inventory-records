import {
  interactor,
  scoped,
  clickable,
  selectable,
  fillable,
  is,
  isPresent,
} from '@bigtest/interactor';

import CalloutInteractor from '@folio/stripes-components/lib/Callout/tests/interactor';

@interactor class ContributorsInteractor {
  makeFirstContributorPrimary = clickable('button[data-test-primary-toggle-button]');
  clickAddNewContributor = clickable('#clickable-add-contributor-add-button');
  fillNameField = fillable('[name="instance.contributors[0].name"]');
  selectNameTypeField = selectable('[name="instance.contributors[0].contributorNameTypeId"]');
}

@interactor class CirculationNotesInteractor {
  fillNoteField = fillable('[name="item.circulationNotes[0].note"]');
}

@interactor class LocationLookupInteractor {
  clickOnLocationBtn = clickable('#select_permanent_location');
  chooseFirstLocation = clickable('#option-select_permanent_location-1-1');
  locationSelectLoaded = isPresent('#sl-container-select_permanent_location');

  whenLocationSelectLoaded() {
    return this.when(() => this.locationSelectLoaded);
  }
}

@interactor class CancelConfirmModalInteractor {
  clickConfirm = clickable('#clickable-cancel-editing-confirmation-confirm');
  clickCancel = clickable('#clickable-cancel-editing-confirmation-cancel');
}

@interactor class FormInteractor {
  contributors = new ContributorsInteractor();
  circulationNotes = new CirculationNotesInteractor();
  fillTitleField = fillable('#input_instance_title');
  issnField = fillable('#issn');
  isbnField = fillable('#isbn');
  publicationDateField = fillable('#input_publication_date');
  selectInstanceType = selectable('#select_instance_type');
  openLocationLookup = clickable('[data-test-location-lookup-button]');
  selectMaterialType = selectable('#material_type');
  selectPermanentLoanType = selectable('#permanent_loan_type');
  selectInstanceStatus = selectable('#select_instance_status_term');
  clickSaveButton = clickable('#save-records');
  clickCancel = clickable('#cancel');
}

@interactor class CreateRecordsWrapperInteractor {
  button = scoped('[data-test-add-inventory-records]', {
    click: clickable(),
    isFocused: is(':focus'),
  });

  form = new FormInteractor('[data-test-create-records-form]');
  isLoaded = isPresent('[data-test-create-records-form]');

  callout = new CalloutInteractor();
  locationLookup = new LocationLookupInteractor();
  cancelModal = new CancelConfirmModalInteractor('#cancel-editing-confirmation');
  cancelModalLoaded = isPresent('#cancel-editing-confirmation');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  whenCancelModalLoaded() {
    return this.when(() => this.cancelModalLoaded);
  }
}

export default CreateRecordsWrapperInteractor;
