import 'cypress-axe';
import type { GenericStaticResponse, RouteHandlerController } from 'cypress/types/net-stubbing';
import { Workspace } from '~/shared/types';

export const BFF_API_VERSION = 'v1';

type SuccessErrorResponse = {
  success: boolean;
  error?: string;
};

type ApiResponse<V = SuccessErrorResponse> =
  | V
  | GenericStaticResponse<string, V>
  | RouteHandlerController;

type Replacement<R extends string = string> = Record<R, string | undefined>;
type Query<Q extends string = string> = Record<Q, string>;

type Options = { path?: Replacement; query?: Query; times?: number } | null;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      testA11y: (context?: Parameters<cy['checkA11y']>[0]) => void;
      getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
      interceptApi: (
        type: 'GET /api/:apiVersion/workspaces',
        options: { path: { apiVersion: string } },
        response: ApiResponse<Workspace[]>,
      ) => Cypress.Chainable<null>;
    }
  }
}

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});

Cypress.Commands.add('testA11y', { prevSubject: 'optional' }, (subject, context) => {
  const test = (c: Parameters<typeof cy.checkA11y>[0]) => {
    cy.window({ log: false }).then((win) => {
      // inject on demand
      if (!(win as { axe: unknown }).axe) {
        cy.injectAxe();
      }
      cy.checkA11y(
        c,
        {
          includedImpacts: ['serious', 'critical'],
        },
        (violations) => {
          cy.task(
            'error',
            `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
              violations.length === 1 ? 'was' : 'were'
            } detected`,
          );
          // pluck specific keys to keep the table readable
          const violationData = violations.map(({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length,
          }));

          cy.task('table', violationData);

          cy.task(
            'log',
            violations
              .map(
                ({ nodes }, i) =>
                  `${i}. Affected elements:\n${nodes.map(
                    ({ target, failureSummary, ancestry }) =>
                      `\t${failureSummary} - ${target
                        .map((node) => `"${node}"\n${ancestry}`)
                        .join(', ')}`,
                  )}`,
              )
              .join('\n'),
          );
        },
      );
    });
  };
  if (!context && subject) {
    cy.wrap(subject).each(($el) => {
      Cypress.log({ displayName: 'testA11y', $el });
      test($el[0]);
    });
  } else {
    Cypress.log({ displayName: 'testA11y' });
    test(context);
  }
});
