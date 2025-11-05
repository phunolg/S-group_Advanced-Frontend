import { axios } from '../../../shared/config/axiosInterceptor';
import type { Board, BoardMember, List, Label } from '../../../shared/lib/types';

// Board APIs
export async function createBoard(data: { name: string; description?: string; workspaceId?: string }): Promise<Board> {
  const payload = {
    name: data.name,
    description: data.description,
    workspace_id: data.workspaceId, // Send as snake_case
  };
  console.log('API payload:', payload);
  const response = await axios.post<Board>('/boards', payload);
  return response as unknown as Board;
}

export async function getAllBoards(): Promise<Board[]> {
  const response = await axios.get<Board[]>('/boards');
  return response as unknown as Board[];
}

export async function getBoardById(id: string): Promise<Board> {
  console.log('getBoardById called with id:', id, 'type:', typeof id);
  try {
    const response = await axios.get<Board>(`/boards/${id}`);
    console.log('getBoardById response:', response);
    return response as unknown as Board;
  } catch (error: any) {
    console.error('getBoardById error:', error);
    console.error('Error response:', error?.response);
    console.error('Error data:', error?.response?.data);
    throw error;
  }
}

export async function updateBoard(id: string, data: { name?: string; description?: string }): Promise<Board> {
  const response = await axios.patch<Board>(`/boards/${id}`, data);
  return response as unknown as Board;
}

export async function deleteBoard(id: string): Promise<void> {
  await axios.delete(`/boards/${id}`);
}

// Board Members APIs
export async function getBoardMembers(boardId: string): Promise<BoardMember[]> {
  const response = await axios.get<BoardMember[]>(`/boards/${boardId}/members`);
  return response as unknown as BoardMember[];
}

export async function addBoardMember(boardId: string, data: { userId: string; role?: string }): Promise<BoardMember> {
  const response = await axios.post<BoardMember>(`/boards/${boardId}/members`, data);
  return response as unknown as BoardMember;
}

export async function updateBoardMemberRole(boardId: string, userId: string, data: { role: string }): Promise<BoardMember> {
  const response = await axios.patch<BoardMember>(`/boards/${boardId}/members/${userId}`, data);
  return response as unknown as BoardMember;
}

export async function removeBoardMember(boardId: string, userId: string): Promise<void> {
  await axios.delete(`/boards/${boardId}/members/${userId}`);
}

// List APIs
export async function getBoardLists(boardId: string): Promise<List[]> {
  console.log('getBoardLists called with boardId:', boardId, 'type:', typeof boardId);
  try {
    const response = await axios.get<List[]>(`/boards/${boardId}/lists`);
    console.log('getBoardLists response:', response);
    return response as unknown as List[];
  } catch (error: any) {
    console.error('getBoardLists error:', error);
    console.error('Error response:', error?.response);
    console.error('Error data:', error?.response?.data);
    throw error;
  }
}

export async function createList(boardId: string, data: { title: string; position?: number }): Promise<List> {
  const response = await axios.post<List>(`/boards/${boardId}/lists`, data);
  return response as unknown as List;
}

export async function updateList(boardId: string, listId: string, data: { title?: string; position?: number }): Promise<List> {
  const response = await axios.patch<List>(`/boards/${boardId}/lists/${listId}`, data);
  return response as unknown as List;
}

export async function deleteList(boardId: string, listId: string): Promise<void> {
  await axios.delete(`/boards/${boardId}/lists/${listId}`);
}

// Label APIs
export async function getBoardLabels(boardId: string): Promise<Label[]> {
  const response = await axios.get<Label[]>(`/boards/${boardId}/labels`);
  return response as unknown as Label[];
}

export async function createLabel(boardId: string, data: { name: string; color: string }): Promise<Label> {
  const response = await axios.post<Label>(`/boards/${boardId}/labels`, data);
  return response as unknown as Label;
}

export async function updateLabel(boardId: string, labelId: string, data: { name?: string; color?: string }): Promise<Label> {
  const response = await axios.patch<Label>(`/boards/${boardId}/labels/${labelId}`, data);
  return response as unknown as Label;
}

export async function deleteLabel(boardId: string, labelId: string): Promise<void> {
  await axios.delete(`/boards/${boardId}/labels/${labelId}`);
}
