import { WorkspaceBody } from '~/shared/types';

export const mockBFFResponse = <T>(data: T): WorkspaceBody<T> => ({
  data,
});
