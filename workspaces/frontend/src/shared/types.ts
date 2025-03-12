export interface WorkspaceIcon {
  url: string;
}

export interface WorkspaceLogo {
  url: string;
}

export interface WorkspaceKind {
  name: string;
  displayName: string;
  description: string;
  deprecated: boolean;
  deprecationMessage: string;
  hidden: boolean;
  icon: WorkspaceIcon;
  logo: WorkspaceLogo;
  podTemplate: {
    podMetadata: {
      labels: {
        myWorkspaceKindLabel: string;
      };
      annotations: {
        myWorkspaceKindAnnotation: string;
      };
    };
    volumeMounts: {
      home: string;
    };
    options: {
      imageConfig: {
        default: string;
        values: [
          {
            id: string;
            displayName: string;
            labels: {
              pythonVersion: string;
            };
            hidden: true;
            redirect?: {
              to: string;
              message: {
                text: string;
                level: string;
              };
            };
          },
        ];
      };
      podConfig: {
        default: string;
        values: [
          {
            id: string;
            displayName: string;
            description: string;
            labels: {
              cpu: string;
              memory: string;
            };
          },
        ];
      };
    };
  };
}

export enum WorkspaceState {
  Running,
  Terminating,
  Paused,
  Pending,
  Error,
  Unknown,
}

export interface Workspace {
  name: string;
  namespace: string;
  workspaceKind: WorkspaceKind;
  deferUpdates: boolean;
  paused: boolean;
  pausedTime: number;
  pendingRestart: boolean;
  state: WorkspaceState;
  stateMessage: string;
  podTemplate: {
    podMetadata: {
      labels: Record<string, string>;
      annotations: Record<string, string>;
    };
    volumes: {
      home: {
        pvcName: string;
        mountPath: string;
        readOnly: boolean;
      };
      data: {
        pvcName: string;
        mountPath: string;
        readOnly: boolean;
      }[];
    };
    options: {
      imageConfig: {
        current: {
          id: string;
          displayName: string;
          description: string;
          labels: {
            key: string;
            value: number;
          }[];
        };
      };
      podConfig: {
        current: {
          id: string;
          displayName: string;
          description: string;
          labels: {
            key: string;
            value: string;
          }[];
        };
      };
    };
  };
  activity: {
    lastActivity: number;
    lastUpdate: number;
  };
  services: {
    httpService: {
      displayName: string;
      httpPath: string;
    };
  }[];
}

export type WorkspacesColumnNames = {
  name: string;
  kind: string;
  image: string;
  podConfig: string;
  state: string;
  homeVol: string;
  cpu: string;
  ram: string;
  lastActivity: string;
  redirectStatus: string;
};
