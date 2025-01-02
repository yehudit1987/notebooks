import React from 'react';
import { APIState } from '~/shared/api/types';
import { NotebookAPIs } from '~/app/types';
import { getNamespaces, getWorkspaces } from '~/shared/api/notebookService';
import useAPIState from '~/shared/api/useAPIState';
import { APIOptions } from '~/shared/api/types';

export type NotebookAPIState = APIState<NotebookAPIs>;

const useNotebookAPIState = (
  hostPath: string | null,
): [apiState: NotebookAPIState, refreshAPIState: () => void] => {
  const createAPI = React.useCallback(
    (path: string) => ({
      getNamespaces: getNamespaces(path),
      getWorkspaces: (opts: APIOptions, namespace: string = '') =>
        getWorkspaces(path, namespace)(opts),
    }),
    [],
  );

  return useAPIState(hostPath, createAPI);
};

export default useNotebookAPIState;
