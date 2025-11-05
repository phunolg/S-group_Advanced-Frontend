import { axios } from '../../../shared/config/axiosInterceptor';
import type { Workspace } from '../../../shared/lib/types';

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await axios.get<Workspace[]>('/api/workspaces');
  return response as unknown as Workspace[];
}

export async function createWorkspace(data: { name: string; description?: string }): Promise<Workspace> {
  const response = await axios.post<Workspace>('/api/workspaces', data);
  return response as unknown as Workspace;
}

export async function updateWorkspace(id: string, data: { name?: string; description?: string }): Promise<Workspace> {
  const response = await axios.patch<Workspace>(`/api/workspaces/${id}`, data);
  return response as unknown as Workspace;
}

export async function deleteWorkspace(id: string): Promise<void> {
  await axios.delete(`/api/workspaces/${id}`);
}
