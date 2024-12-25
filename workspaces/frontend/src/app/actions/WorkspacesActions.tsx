import { getWorkspaces } from '~/shared/api/notebookService';
import { Workspace } from '~/shared/types';
const BFF_API_VERSION = 'v1';
const BASE_URL = `/api/${BFF_API_VERSION}`;

/**
 * Fetches all workspaces from the API.
 * @returns {Promise<Workspace[]>} A promise resolving to an array of workspaces.
 * @throws An error if the API call fails.
 */
export async function fetchWorkspaces(namespace = ''): Promise<Workspace[]> {
  try {
    const apiOptions = {
      parseJSON: true,
      headers: {
        Accept: 'application/json',
      },
    };
    const getWorkspacesFunc = getWorkspaces(BASE_URL, namespace);
    const workspaceList = await getWorkspacesFunc(apiOptions);
    return workspaceList;
  } catch (error) {
    console.error('Error fetching all workspaces:', error);
    throw error;
  }
}
