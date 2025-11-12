import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getUser, type User } from '../../features/dashboard/model/getUser';
import { getWorkspaces } from '../../features/workspace/model/workspaceApi';
import { getAllBoards } from '../../features/board/model/boardApi';
import type { Workspace, Board } from '../lib/types';

interface DashboardContextType {
  user: User | null;
  workspaces: Workspace[];
  boards: Board[];
  currentWorkspace: Workspace | null;
  
  isLoading: boolean;
  isLoadingUser: boolean;
  isLoadingWorkspaces: boolean;
  isLoadingBoards: boolean;
  
  setCurrentWorkspace: (workspace: Workspace) => void;
  refreshWorkspaces: () => Promise<void>;
  refreshBoards: () => Promise<void>;
  refreshAll: () => Promise<void>;
  
  getCurrentWorkspaceBoards: () => Board[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(true);
  const [isLoadingBoards, setIsLoadingBoards] = useState(true);
  
  const isLoading = isLoadingUser || isLoadingWorkspaces || isLoadingBoards;

  const fetchUser = async () => {
    try {
      setIsLoadingUser(true);
      const userData = await getUser();
      setUser(userData);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const fetchWorkspaces = async () => {
    try {
      setIsLoadingWorkspaces(true);
      const workspacesData = await getWorkspaces();
      setWorkspaces(workspacesData);
      
      if (workspacesData.length > 0 && !currentWorkspace) {
        setCurrentWorkspace(workspacesData[0]);
      }
    } catch (err) {
      console.error('Failed to fetch workspaces:', err);
    } finally {
      setIsLoadingWorkspaces(false);
    }
  };

  const fetchBoards = async () => {
    try {
      setIsLoadingBoards(true);
      const boardsData = await getAllBoards();
      setBoards(boardsData);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
    } finally {
      setIsLoadingBoards(false);
    }
  };

  const refreshWorkspaces = async () => {
    await fetchWorkspaces();
  };

  const refreshBoards = async () => {
    await fetchBoards();
  };

  const refreshAll = async () => {
    await Promise.all([
      fetchUser(),
      fetchWorkspaces(),
      fetchBoards()
    ]);
  };

  const getCurrentWorkspaceBoards = () => {
    if (!currentWorkspace) return [];
    return boards.filter(board => board.workspace_id === currentWorkspace.id);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const value: DashboardContextType = {
    user,
    workspaces,
    boards,
    currentWorkspace,
    
    isLoading,
    isLoadingUser,
    isLoadingWorkspaces,
    isLoadingBoards,
    
    setCurrentWorkspace,
    refreshWorkspaces,
    refreshBoards,
    refreshAll,
    
    getCurrentWorkspaceBoards
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

export default DashboardContext;