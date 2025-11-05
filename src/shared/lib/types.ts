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
  title: string;
  description?: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt?: Date;
}
