import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  MenuToggleAction,
} from '@patternfly/react-core';
import { Workspace, WorkspaceState } from '~/shared/types';

type WorkspaceConnectActionProps = {
  workspace: Workspace;
};

export const WorkspaceConnectAction: React.FunctionComponent<WorkspaceConnectActionProps> = ({
  workspace,
}) => {
  const [open, setIsOpen] = React.useState(false);

  const onToggleClick = () => {
    setIsOpen(!open);
  };

  const onSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined,
  ) => {
    setIsOpen(false);
    if (typeof value === 'string') {
      openEndpoint(value);
    }
  };

  const onClickConnect = () => {
    window.open(workspace.services[0].httpService.httpPath, '_blank');
  };

  const openEndpoint = (value: string) => {
    window.open(value, '_blank');
  };

  return (
    <Dropdown
      isOpen={open}
      onSelect={onSelect}
      onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={onToggleClick}
          isExpanded={open}
          isFullWidth
          isDisabled={workspace.state !== WorkspaceState.Running}
          splitButtonItems={[
            <MenuToggleAction
              id="connect-endpoint-button"
              key="connect-endpoint-button"
              onClick={onClickConnect}
            >
              Connect
            </MenuToggleAction>,
          ]}
        />
      )}
      ouiaId="BasicDropdown"
      shouldFocusToggleOnSelect
    >
      <DropdownList>
        {workspace.services.map((service) => (
          <DropdownItem
            value={service.httpService.httpPath}
            key={`${workspace.name}-${service.httpService.displayName}`}
          >
            {service.httpService.displayName}
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
};
