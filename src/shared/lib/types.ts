export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  workspace_id: string;
  workspaceId?: string; // For compatibility
  cover_url?: string;
  is_closed: boolean;
  created_by?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BoardMember {
  userId: string;
  role: string;
}

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  boardId: string;
}
