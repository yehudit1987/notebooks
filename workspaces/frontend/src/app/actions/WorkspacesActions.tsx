import { Workspace } from '~/shared/types';

const BFF_API_VERSION = 'v1';
const BASE_URL = `/api/${BFF_API_VERSION}/workspaces`;

/**
 * Fetches all workspaces from the API.
 * @returns {Promise<Workspace[]>} A promise resolving to an array of workspaces.
 * @throws An error if the API call fails.
 */
export async function fetchAllWorkspaces(): Promise<Workspace[]> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch all workspaces: ${response.statusText}`);
    }
    const responseData = await response.json();
    if (responseData.data) {
      return responseData.data;
    }
    throw new Error('Data field not found in response');
  } catch (error) {
    console.error('Error fetching all workspaces:', error);
    throw error;
  }
}

/**
 * Fetches workspaces for a specific namespace.
 * @param namespace - The namespace to filter workspaces by.
 * @returns {Promise<Workspace[]>} A promise resolving to an array of workspaces.
 * @throws An error if the API call fails.
 */
export async function fetchWorkspacesByNamespace(namespace: string): Promise<Workspace[]> {
  try {
    const response = await fetch(`${BASE_URL}/${namespace}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch all workspaces: ${response.statusText}`);
    }
    const responseData = await response.json();
    if (responseData.data) {
      return responseData.data;
    }
    throw new Error('Data field not found in response');
  } catch (error) {
    console.error(`Error fetching workspaces for namespace "${namespace}":`, error);
    throw error;
  }
}
