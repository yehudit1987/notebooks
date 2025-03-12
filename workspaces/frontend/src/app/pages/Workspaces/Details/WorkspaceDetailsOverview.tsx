import React from 'react';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Divider,
} from '@patternfly/react-core';
import { Workspace } from '~/shared/types';

type WorkspaceDetailsOverviewProps = {
  workspace: Workspace;
};

export const WorkspaceDetailsOverview: React.FunctionComponent<WorkspaceDetailsOverviewProps> = ({
  workspace,
}) => (
  <DescriptionList isHorizontal>
    <DescriptionListGroup>
      <DescriptionListTerm>Name</DescriptionListTerm>
      <DescriptionListDescription>{workspace.name}</DescriptionListDescription>
    </DescriptionListGroup>
    <Divider />
    <DescriptionListGroup>
      <DescriptionListTerm>Kind</DescriptionListTerm>
      <DescriptionListDescription>{workspace.workspaceKind.name}</DescriptionListDescription>
    </DescriptionListGroup>
    <Divider />
    <DescriptionListGroup>
      <DescriptionListTerm>Labels</DescriptionListTerm>
      <DescriptionListDescription>
        {workspace.podTemplate.options.podConfig.current.labels.length > 0
          ? workspace.podTemplate.options.podConfig.current.labels
              .map((label) => `${label.key}=${label.value}`)
              .join(', ')
          : 'No labels available'}
      </DescriptionListDescription>
    </DescriptionListGroup>
    <Divider />
    <DescriptionListGroup>
      <DescriptionListTerm>Pod config</DescriptionListTerm>
      <DescriptionListDescription>
        {JSON.stringify(workspace.podTemplate.options.podConfig, null, 2)}
      </DescriptionListDescription>
    </DescriptionListGroup>
    <Divider />
  </DescriptionList>
);
