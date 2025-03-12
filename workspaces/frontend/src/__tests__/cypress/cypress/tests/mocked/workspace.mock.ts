import { WorkspaceState } from '~/shared/types';

const generateMockWorkspace = (
  name: string,
  namespace: string,
  state: WorkspaceState,
  paused: boolean,
  imageConfigId: string,
  imageConfigDisplayName: string,
  podConfigId: string,
  podConfigDisplayName: string,
  pvcName: string,
): {
  name: string;
  namespace: string;
  workspaceKind: { name: string };
  deferUpdates: boolean;
  paused: boolean;
  pausedTime: number;
  pendingRestart: boolean;
  state: WorkspaceState;
  stateMessage: string;
  podTemplate: {
    podMetadata: { labels: object; annotations: object };
    volumes: {
      home: { pvcName: string; mountPath: string; readOnly: boolean };
      data: { pvcName: string; mountPath: string; readOnly: boolean }[];
    };
    options: {
      imageConfig: {
        current: {
          id: string;
          displayName: string;
          description: string;
          labels: { key: string; value: string }[];
        };
      };
      podConfig: {
        current: {
          id: string;
          displayName: string;
          description: string;
          labels: ({ key: string; value: string } | { key: string; value: string })[];
        };
      };
    };
  };
  activity: { last_activity: number; last_update: number };
  services: { httpService: { displayName: string; httpPath: string } }[];
} => {
  const currentTime = Date.now();
  const lastActivityTime = currentTime - Math.floor(Math.random() * 1000000);
  const lastUpdateTime = currentTime - Math.floor(Math.random() * 100000);

  return {
    name,
    namespace,
    workspaceKind: { name: 'jupyterlab' },
    deferUpdates: paused,
    paused,
    pausedTime: paused ? currentTime - Math.floor(Math.random() * 1000000) : 0,
    pendingRestart: false,
    state,
    stateMessage:
      state === WorkspaceState.Running
        ? 'Workspace is running smoothly.'
        : state === WorkspaceState.Paused
          ? 'Workspace is paused.'
          : 'Workspace is operational.',
    podTemplate: {
      podMetadata: {
        labels: {},
        annotations: {},
      },
      volumes: {
        home: {
          pvcName: `${pvcName}-home`,
          mountPath: '/home/jovyan',
          readOnly: false,
        },
        data: [
          {
            pvcName,
            mountPath: '/data/my-data',
            readOnly: paused,
          },
        ],
      },
      options: {
        imageConfig: {
          current: {
            id: imageConfigId,
            displayName: imageConfigDisplayName,
            description: 'JupyterLab environment',
            labels: [{ key: 'python_version', value: '3.11' }],
          },
        },
        podConfig: {
          current: {
            id: podConfigId,
            displayName: podConfigDisplayName,
            description: 'Pod configuration with resource limits',
            labels: [
              { key: 'cpu', value: '100m' },
              { key: 'memory', value: '128Mi' },
            ],
          },
        },
      },
    },
    activity: {
      last_activity: lastActivityTime,
      last_update: lastUpdateTime,
    },
    services: [
      {
        httpService: {
          displayName: 'Jupyter-lab',
          httpPath: `/workspace/${namespace}/${name}/Jupyter-lab/`,
        },
      },
    ],
  };
};

const generateMockWorkspaces = (numWorkspaces: number, byNamespace = false) => {
  const mockWorkspaces = [];
  const podConfigs = [
    { id: 'small-cpu', display_name: 'Small CPU' },
    { id: 'medium-cpu', display_name: 'Medium CPU' },
    { id: 'large-cpu', display_name: 'Large CPU' },
  ];
  const imageConfigs = [
    { id: 'jupyterlab_scipy_180', display_name: 'JupyterLab SciPy 1.8.0' },
    { id: 'jupyterlab_tensorflow_230', display_name: 'JupyterLab TensorFlow 2.3.0' },
    { id: 'jupyterlab_pytorch_120', display_name: 'JupyterLab PyTorch 1.2.0' },
  ];
  const namespaces = byNamespace ? ['kubeflow'] : ['kubeflow', 'system', 'user-example', 'default'];

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
      generateMockWorkspace(
        name,
        namespace,
        state,
        paused,
        imageConfig.id,
        imageConfig.display_name,
        podConfig.id,
        podConfig.display_name,
        pvcName,
      ),
    );
  }

  return mockWorkspaces;
};

// Example usage
export const mockWorkspaces = generateMockWorkspaces(5);
export const mockWorkspacesByNS = generateMockWorkspaces(10, true);
