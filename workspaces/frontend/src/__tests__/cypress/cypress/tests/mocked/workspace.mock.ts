import { WorkspaceState } from '~/shared/types';

export const mockWorkspaces = {
  data: [
    {
      name: 'workspace-1',
      namespace: 'namespace-1',
      paused: false,
      deferUpdates: false,
      kind: 'jupyter-lab',
      podTemplate: {
        volumes: {
          home: '/home',
          data: [
            {
              pvcName: 'data-pvc-1',
              mountPath: '/data',
              readOnly: false,
            },
          ],
        },
      },
      options: {
        imageConfig: 'jupyterlab_scipy_180',
        podConfig: 'Small CPU',
      },
      status: {
        activity: {
          lastActivity: 1678900000,
          lastUpdate: 1678903600,
        },
        pauseTime: 0,
        pendingRestart: false,
        podTemplateOptions: {
          imageConfig: {
            desired: 'jupyterlab_scipy_180',
            redirectChain: [
              {
                source: 'base-image',
                target: 'optimized-image-1',
              },
            ],
          },
        },
        state: WorkspaceState.Running,
        stateMessage: 'Workspace is running smoothly.',
      },
    },
    {
      name: 'workspace-2',
      namespace: 'namespace-2',
      paused: true,
      deferUpdates: true,
      kind: 'jupyter-lab',
      podTemplate: {
        volumes: {
          home: '/home',
          data: [
            {
              pvcName: 'data-pvc-2',
              mountPath: '/data',
              readOnly: true,
            },
          ],
        },
      },
      options: {
        imageConfig: 'jupyterlab_tensorflow_230',
        podConfig: 'Large CPU',
      },
      status: {
        activity: {
          lastActivity: 1678901000,
          lastUpdate: 1678903700,
        },
        pauseTime: 1678910000,
        pendingRestart: true,
        podTemplateOptions: {
          imageConfig: {
            desired: 'jupyterlab_tensorflow_230',
            redirectChain: [
              {
                source: 'base-image',
                target: 'optimized-image-2',
              },
            ],
          },
        },
        state: WorkspaceState.Paused,
        stateMessage: 'Workspace is paused.',
      },
    },
    {
      name: 'workspace-3',
      namespace: 'namespace-3',
      paused: false,
      deferUpdates: true,
      kind: 'jupyter-notebook',
      podTemplate: {
        volumes: {
          home: '/home',
          data: [
            {
              pvcName: 'data-pvc-3',
              mountPath: '/data',
              readOnly: false,
            },
          ],
        },
      },
      options: {
        imageConfig: 'jupyterlab_pytorch_120',
        podConfig: 'Medium CPU',
      },
      status: {
        activity: {
          lastActivity: 1678902000,
          lastUpdate: 1678903800,
        },
        pauseTime: 0,
        pendingRestart: false,
        podTemplateOptions: {
          imageConfig: {
            desired: 'jupyterlab_pytorch_120',
            redirectChain: [
              {
                source: 'base-image',
                target: 'optimized-image-3',
              },
            ],
          },
        },
        state: WorkspaceState.Error,
        stateMessage: 'Workspace is operational.',
      },
    },
  ],
};

export const mockWorkspacesByNS = {
  data: [
    {
      name: 'workspace-1',
      namespace: 'kubeflow',
      paused: false,
      deferUpdates: false,
      kind: 'jupyter-lab',
      podTemplate: {
        volumes: {
          home: '/home',
          data: [
            {
              pvcName: 'data-pvc-1',
              mountPath: '/data',
              readOnly: false,
            },
          ],
        },
      },
      options: {
        imageConfig: 'jupyterlab_scipy_180',
        podConfig: 'Small CPU',
      },
      status: {
        activity: {
          lastActivity: 1678900000,
          lastUpdate: 1678903600,
        },
        pauseTime: 0,
        pendingRestart: false,
        podTemplateOptions: {
          imageConfig: {
            desired: 'jupyterlab_scipy_180',
            redirectChain: [
              {
                source: 'base-image',
                target: 'optimized-image-1',
              },
            ],
          },
        },
        state: WorkspaceState.Running,
        stateMessage: 'Workspace is running smoothly.',
      },
    },
    {
      name: 'workspace-2',
      namespace: 'kubeflow',
      paused: true,
      deferUpdates: true,
      kind: 'jupyter-lab',
      podTemplate: {
        volumes: {
          home: '/home',
          data: [
            {
              pvcName: 'data-pvc-2',
              mountPath: '/data',
              readOnly: true,
            },
          ],
        },
      },
      options: {
        imageConfig: 'jupyterlab_tensorflow_230',
        podConfig: 'Large CPU',
      },
      status: {
        activity: {
          lastActivity: 1678901000,
          lastUpdate: 1678903700,
        },
        pauseTime: 1678910000,
        pendingRestart: true,
        podTemplateOptions: {
          imageConfig: {
            desired: 'jupyterlab_tensorflow_230',
            redirectChain: [
              {
                source: 'base-image',
                target: 'optimized-image-2',
              },
            ],
          },
        },
        state: WorkspaceState.Paused,
        stateMessage: 'Workspace is paused.',
      },
    },
  ],
};
