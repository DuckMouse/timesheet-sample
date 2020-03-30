/// <reference types="cypress" />

import { format } from 'date-fns';

context('Timesheet Feature', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/entries', 'fixture:timesheet-entries.json');
    cy.visit('/');
    cy.wait(500);
  });

  it('should start on timeSheet URL for the first page', () => {
    cy.title().should('include', 'Timesheet');
  });

  it('should contain new,submit buttons and default rate', () => {
    cy.get('[data-testid=addEntryButton]').contains('New Entry');
    cy.get('[data-testid=submitEntriesButton]').contains('Submit');
    cy.get('[data-testid=defaultHourlyRateSpan]').contains(
      'Default Hourly Rate'
    );
  });

  it('should contain 4 rows when loaded and should just be submitted', () => {
    expect(getAllRows().should('have.length', 4));
    assertCellValueInRow('state', 'Submitted', 0);
    assertCellValueInRow('state', 'Submitted', 1);
    assertCellValueInRow('state', 'Submitted', 2);
    assertCellValueInRow('state', 'Submitted', 3);
  });

  it('should be able to add a new entry with state of empty, cancel and save actions', () => {
    cy.get('[data-testid=addEntryButton]').click();
    assertCellValueInRow('state', '', 0);
    assertCellValueInRow('date', '', 0);
    getSpecificCell('date', 0).then(cell => {
      expect(cell[0].textContent).to.be.eq(format(new Date(), 'dd/MM/yyyy'));
    });
    cy.wait(100);
    getSpecificCell('actions', 0).then(cell => {
      expect(
        cell.find('[data-testid=newCancelActionButton]')[0].textContent
      ).contains('Cancel');
      expect(
        cell.find('[data-testid=newSaveActionButton]')[0].textContent
      ).contains('Save');
    });
  });

  it('should not have any new rows when submit is pressed without active items', () => {
    expect(getAllRows().should('have.length', 4));
    cy.get('[data-testid=submitEntriesButton]').click();
    expect(getAllRows().should('have.length', 4));
  });

  it('should have default values for new entries', () => {
    cy.get('[data-testid=addEntryButton]').click();
    assertCellValueInRow('state', '', 0);
    assertCellValueInRow('date', '', 0);
  });

  it('should have state of active when saved with edit and delete', () => {
    cy.get('[data-testid=addEntryButton]').click();
    getSpecificCell('actions', 0).then(cell => {
      cell.find('[data-testid=newSaveActionButton]').click();
      cy.wait(500);
    });
    assertCellValueInRow('state', 'Active', 0);
    assertCellValueInRow('hourlyRate', '$250.50', 0);
    getSpecificCell('actions', 0).then(cell => {
      expect(
        cell.find('[data-testid=activeEditActionButton]')[0].textContent
      ).contains('Edit');
      expect(
        cell.find('[data-testid=activeDeleteActionButton]')[0].textContent
      ).contains('Delete');
    });
  });

  function getAllRows() {
    return cy.get('.ag-center-cols-container .ag-row');
  }

  function getSpecificCell(colId, rowIndex) {
    return getAllRows()
      .eq(rowIndex)
      .find(`[col-id="${colId}"]`);
  }

  function assertCellValueInRow(colId, value, rowIndex) {
    getAllRows()
      .eq(rowIndex)
      .find(`[col-id="${colId}"]`)
      .then(cell => {
        expect(cell).contain(value);
      });
  }
});
