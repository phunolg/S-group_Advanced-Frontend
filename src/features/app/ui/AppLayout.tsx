import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { getUser, type User } from '../../../features/dashboard/model/getUser';
import { getWorkspaces } from '../../../features/workspace/model/workspaceApi';
import { getAllBoards } from '../../../features/board/model/boardApi';
import { CreateWorkspaceDialog } from '../../../features/workspace/ui/CreateWorkspaceDialog';
import { CreateBoardDialog } from '../../../features/board/ui/CreateBoardDialog';
import type { Workspace, Board } from '../../../shared/lib/types';

export function AppLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isCreateWorkspaceDialogOpen, setIsCreateWorkspaceDialogOpen] = useState(false);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      const workspacesData = await getWorkspaces();
      setWorkspaces(workspacesData);
      if (workspacesData.length > 0 && !currentWorkspace) {
        setCurrentWorkspace(workspacesData[0]);
      }
    } catch (err) {
      console.error('Failed to fetch workspaces:', err);
    }
  };

  const fetchBoards = async () => {
    try {
      const boardsData = await getAllBoards();
      setBoards(boardsData);
    } catch (err) {
      console.error('Failed to fetch boards:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData] = await Promise.all([
          getUser(),
          fetchWorkspaces(),
          fetchBoards()
        ]);
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          user={user} 
          workspaces={workspaces}
          boards={boards}
          currentWorkspace={currentWorkspace}
          onWorkspaceChange={setCurrentWorkspace}
          onCreateWorkspace={() => setIsCreateWorkspaceDialogOpen(true)}
          onCreateBoard={() => setIsCreateBoardDialogOpen(true)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        open={isCreateWorkspaceDialogOpen}
        onClose={() => setIsCreateWorkspaceDialogOpen(false)}
        onSuccess={() => {
          fetchWorkspaces();
        }}
      />

      {/* Create Board Dialog */}
      <CreateBoardDialog
        open={isCreateBoardDialogOpen}
        onClose={() => setIsCreateBoardDialogOpen(false)}
        onSuccess={() => {
          fetchBoards();
        }}
        workspaceId={currentWorkspace?.id}
      />
    </>
  );
}
