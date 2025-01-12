import { WorkspaceState } from '~/shared/types';
import { home } from '~/__tests__/cypress/cypress/pages/home';
import {
  mockWorkspaces,
  mockWorkspacesByNS,
} from '~/__tests__/cypress/cypress/tests/mocked/workspace.mock';
import { mockNamespaces } from '~/__mocks__/mockNamespaces';
import { mockBFFResponse } from '~/__mocks__/utils';

// Helper function to validate the content of a single workspace row in the table
const validateWorkspaceRow = (workspace: any, index: number) => {
  // Validate the workspace name
  cy.findByTestId(`workspace-row-${index}`)
    .find('[data-testid="workspace-name"]')
    .should('have.text', workspace.name);

  // Map workspace state to the expected label
  const expectedLabel = WorkspaceState[workspace.status.state];

  // Validate the state label and pod configuration
  cy.findByTestId(`workspace-row-${index}`)
    .find('[data-testid="state-label"]')
    .should('have.text', expectedLabel);

  cy.findByTestId(`workspace-row-${index}`)
    .find('[data-testid="pod-config"]')
    .should('have.text', workspace.options.podConfig);
};

// Test suite for workspace-related tests
describe('Workspaces tests', () => {
  beforeEach(() => {
    home.visit();
    cy.intercept('GET', '/api/v1/workspaces', {
      body: mockBFFResponse(mockWorkspaces),
    }).as('getWorkspaces');
    cy.wait('@getWorkspaces');
  });

  it('should display the correct number of workspaces', () => {
    cy.findByTestId('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspaces.length);
  });

  it('should validate all workspace rows', () => {
    mockWorkspaces.forEach((workspace, index) => {
      cy.log(`Validating workspace ${index + 1}: ${workspace.name}`);
      validateWorkspaceRow(workspace, index);
    });
  });

  it('should handle empty workspaces gracefully', () => {
    cy.intercept('GET', '/api/v1/workspaces', { statusCode: 200, body: { data: [] } });
    cy.visit('/');

    cy.findByTestId('workspaces-table').find('tbody tr').should('not.exist');
  });
});

// Test suite for workspace functionality by namespace
describe('Workspace by namespace functionality', () => {
  beforeEach(() => {
    home.visit();

    cy.intercept('GET', '/api/v1/namespaces', {
      body: mockBFFResponse(mockNamespaces),
    }).as('getNamespaces');

    cy.intercept('GET', 'api/v1/workspaces', { body: mockBFFResponse(mockWorkspaces) }).as(
      'getWorkspaces',
    );

    cy.intercept('GET', '/api/v1/workspaces/kubeflow', {
      body: mockBFFResponse(mockWorkspacesByNS),
    }).as('getKubeflowWorkspaces');

    cy.wait('@getNamespaces');
  });

  it('should update workspaces when namespace changes', () => {
    // Verify initial state (default namespace)
    cy.wait('@getWorkspaces');
    cy.findByTestId('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspaces.length);

    // Change namespace to "kubeflow"
    cy.findByTestId('namespace-toggle').click();
    cy.findByTestId('dropdown-item-kubeflow').click();

    // Verify the API call is made with the new namespace
    cy.wait('@getKubeflowWorkspaces')
      .its('request.url')
      .should('include', '/api/v1/workspaces/kubeflow');

    // Verify the length of workspaces list is updated
    cy.findByTestId('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspacesByNS.length);
  });
});
