import * as React from 'react';
import { CubesIcon } from '@patternfly/react-icons';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
  PageSection,
} from '@patternfly/react-core';
import useNamespaces from '~/app/hooks/useNamespaces';

const Settings: React.FunctionComponent = () => {
  const [mv, mvLoaded, mvLoadError, refreshModelVersion] = useNamespaces();
  console.log([mv, mvLoaded, mvLoadError, refreshModelVersion]);

  return (
    <PageSection>
      <EmptyState
        variant={EmptyStateVariant.full}
        titleText="Empty State (Stub Settings Module)"
        icon={CubesIcon}
      >
        <EmptyStateBody>
          This represents an the empty state pattern in Patternfly 6. Hopefully it&apos;s simple
          enough to use but flexible enough to meet a variety of needs.
        </EmptyStateBody>
        <EmptyStateFooter>
          <Button variant="primary">Primary Action</Button>
        </EmptyStateFooter>
      </EmptyState>
    </PageSection>
  );
};

export { Settings };
