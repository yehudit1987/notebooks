import { WorkspaceState } from '~/shared/types';

const generateMockWorkspace = (
  name: string,
  namespace: string,
  state: WorkspaceState,
  paused: boolean,
  imageConfig: string,
  podConfig: string,
  pvcName: string,
) => {
  const currentTime = Date.now();
  const lastActivity = currentTime - Math.floor(Math.random() * 1000000); // Random last activity time
  const lastUpdate = currentTime - Math.floor(Math.random() * 100000); // Random last update time

  return {
    name: name,
    namespace: namespace,
    paused: paused,
    deferUpdates: paused ? true : false,
    kind: 'jupyter-lab', // or jupyter-notebook, could be randomized too
    podTemplate: {
      volumes: {
        home: '/home',
        data: [
          {
            pvcName: pvcName,
            mountPath: '/data',
            readOnly: paused, // Randomize based on paused state
          },
        ],
      },
    },
    options: {
      imageConfig: imageConfig,
      podConfig: podConfig,
    },
    status: {
      activity: {
        lastActivity: lastActivity,
        lastUpdate: lastUpdate,
      },
      pauseTime: paused ? currentTime - Math.floor(Math.random() * 1000000) : 0,
      pendingRestart: paused ? true : false,
      podTemplateOptions: {
        imageConfig: {
          desired: imageConfig,
          redirectChain: [
            {
              source: 'base-image',
              target: `optimized-${Math.floor(Math.random() * 100)}`,
            },
          ],
        },
      },
      state: state,
      stateMessage:
        state === WorkspaceState.Running
          ? 'Workspace is running smoothly.'
          : state === WorkspaceState.Paused
            ? 'Workspace is paused.'
            : 'Workspace is operational.',
    },
  };
};

const generateMockWorkspaces = (numWorkspaces: number) => {
  const mockWorkspaces = [];
  const podConfigs = ['Small CPU', 'Medium CPU', 'Large CPU'];
  const imageConfigs = [
    'jupyterlab_scipy_180',
    'jupyterlab_tensorflow_230',
    'jupyterlab_pytorch_120',
  ];
  const namespaces = ['kubeflow', 'system', 'user-example'];

  for (let i = 1; i <= numWorkspaces; i++) {
    const state =
      i % 3 === 0
        ? WorkspaceState.Error
        : i % 2 === 0
          ? WorkspaceState.Paused
          : WorkspaceState.Running;
    const paused = state === WorkspaceState.Paused;
    const name = `workspace-${i}`;
    const namespace = namespaces[i % namespaces.length];
    const pvcName = `data-pvc-${i}`;
    const imageConfig = imageConfigs[i % imageConfigs.length];
    const podConfig = podConfigs[i % podConfigs.length];

    mockWorkspaces.push(
      generateMockWorkspace(name, namespace, state, paused, imageConfig, podConfig, pvcName),
    );
  }

  // return { data: mockWorkspaces };
  return mockWorkspaces;
};

// Example usage
export const mockWorkspaces = generateMockWorkspaces(5); // Generate 5 workspaces
export const mockWorkspacesByNS = generateMockWorkspaces(10);
console.log(mockWorkspaces);
