import { mockWorkspaces, mockWorkspacesByNS } from '../mocked/workspace.mock';
import { WorkspaceState } from '~/shared/types';

// Helper function to validate the content of a single workspace row in the table
const validateWorkspaceRow = (workspace: any, index: number) => {
  // Validate the workspace name
  cy.getDataTest(`workspace-row-${index}`)
    .find('[data-test="workspace-name"]')
    .should('have.text', workspace.name);

  // Map workspace state to the expected color and label
  const stateColors = ['green', 'orange', 'yellow', 'blue', 'red', 'purple'];
  const expectedColor = stateColors[workspace.status.state];
  const expectedLabel = WorkspaceState[workspace.status.state];

  // Validate the state label and pod configuration
  cy.getDataTest(`workspace-row-${index}`)
    .find('[data-test="state-label"]')
    .should('have.text', expectedLabel);

  cy.getDataTest(`workspace-row-${index}`)
    .find('[data-test="pod-config"]')
    .should('have.text', workspace.options.podConfig);
};

// Test suite for workspace-related tests
describe('Workspaces tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/workspaces', { statusCode: 200, body: mockWorkspaces });
    cy.visit('/');
  });

  it('should display the correct number of workspaces', () => {
    cy.getDataTest('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspaces.data.length);
  });

  it('should validate all workspace rows', () => {
    mockWorkspaces.data.forEach((workspace, index) => {
      validateWorkspaceRow(workspace, index);
    });
  });

  it('should handle empty workspaces gracefully', () => {
    cy.intercept('GET', '/api/v1/workspaces', { statusCode: 200, body: { data: [] } });
    cy.visit('/');

    cy.getDataTest('workspaces-table').find('tbody tr').should('not.exist');
  });
});

// Test suite for workspace functionality by namespace
describe('Workspace by namespace functionality', () => {
  beforeEach(() => {
    const namespaceToTest = 'kubeflow';
    cy.intercept('GET', `/api/v1/workspaces/${namespaceToTest}`, {
      statusCode: 200,
      body: mockWorkspacesByNS,
    });
    cy.visit('/');
  });

  it('should display workspaces for the correct namespace', () => {
    cy.getDataTest('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspacesByNS.data.length);

    mockWorkspacesByNS.data.forEach((workspace) => {
      cy.getDataTest('workspaces-table').contains(workspace.name).should('exist');
    });
  });
});