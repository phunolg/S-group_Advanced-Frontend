import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useDashboard } from '../../../shared/context/DashboardContext';
import { CreateWorkspaceDialog } from '../../../features/workspace/ui/CreateWorkspaceDialog';
import { CreateBoardDialog } from '../../../features/board/ui/CreateBoardDialog';

export function AppLayout() {
  const {
    user,
    workspaces,
    boards,
    currentWorkspace,
    setCurrentWorkspace,
    refreshWorkspaces,
    refreshBoards
  } = useDashboard();
  
  const [isCreateWorkspaceDialogOpen, setIsCreateWorkspaceDialogOpen] = useState(false);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

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
          refreshWorkspaces();
        }}
      />

      <CreateBoardDialog
        open={isCreateBoardDialogOpen}
        onClose={() => setIsCreateBoardDialogOpen(false)}
        onSuccess={() => {
          refreshBoards();
        }}
        workspaceId={currentWorkspace?.id}
      />
    </>
  );
}
