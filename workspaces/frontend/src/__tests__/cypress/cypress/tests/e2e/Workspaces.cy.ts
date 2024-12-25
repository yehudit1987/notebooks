import { BFF_API_VERSION } from '../../support/commands/api';
import { mockWorkspaces, mockWorkspacesByNS } from '../mocked/workspace.mock';
import { WorkspaceState } from '~/shared/types';
import { home } from '~/__tests__/cypress/cypress/pages/home';

// Helper function to validate the content of a single workspace row in the table
const validateWorkspaceRow = (workspace: any, index: number) => {
  // Validate the workspace name
  cy.getDataTest(`workspace-row-${index}`)
    .find('[data-test="workspace-name"]')
    .should('have.text', workspace.name);

  // Map workspace state to the expected label
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
    home.visit();
    cy.interceptApi(
      'GET /api/:apiVersion/workspaces',
      {
        path: {
          apiVersion: BFF_API_VERSION,
        },
      },
      mockWorkspaces,
    ).as('getWorkspaces');
    cy.wait('@getWorkspaces');
  });

  it('should display the correct number of workspaces', () => {
    cy.getDataTest('workspaces-table')
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

    cy.getDataTest('workspaces-table').find('tbody tr').should('not.exist');
  });
});

// Test suite for workspace functionality by namespace
describe('Workspace by namespace functionality', () => {
  beforeEach(() => {
    home.visit();
    const nameSpaceToTest = 'kubeflow';
    cy.interceptApi(
      'GET /api/:apiVersion/workspaces/:nameSpace',
      {
        path: {
          apiVersion: BFF_API_VERSION,
          nameSpace: nameSpaceToTest,
        },
      },
      mockWorkspacesByNS,
    ).as('getWorkspaces');
    cy.wait('@getWorkspaces');
  });

  it('should display the correct number of workspaces', () => {
    cy.getDataTest('workspaces-table')
      .find('tbody tr')
      .should('have.length', mockWorkspacesByNS.length);
  });

  it('should display workspaces for the correct namespace', () => {
    mockWorkspacesByNS.forEach((workspace) => {
      cy.getDataTest('workspaces-table').contains(workspace.name).should('exist');
    });
  });
});
