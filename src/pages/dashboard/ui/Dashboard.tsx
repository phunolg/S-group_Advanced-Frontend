import { useState, useEffect } from 'react';
import { Plus, Users, Kanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/button/button';
import { getWorkspaces } from '../../../features/workspace/model/workspaceApi';
import { getAllBoards } from '../../../features/board/model/boardApi';
import { CreateWorkspaceDialog } from '../../../features/workspace/ui/CreateWorkspaceDialog';
import { CreateBoardDialog } from '../../../features/board/ui/CreateBoardDialog';
import type { Workspace, Board } from '../../../shared/lib/types';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateWorkspaceDialogOpen, setIsCreateWorkspaceDialogOpen] = useState(false);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [workspacesData, boardsData] = await Promise.all([
        getWorkspaces(),
        getAllBoards()
      ]);
      console.log('Fetched boards:', boardsData);
      setWorkspaces(workspacesData);
      setBoards(boardsData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getWorkspaceBoards = (workspaceId: string) => {
    const filtered = boards.filter(board => board.workspace_id === workspaceId);
    console.log(`Boards for workspace ${workspaceId}:`, filtered);
    return filtered;
  };

  const handleCreateBoard = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    setIsCreateBoardDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your workspaces and boards</p>
        </div>
        <Button 
          onClick={() => setIsCreateWorkspaceDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Workspace
        </Button>
      </div>

      {/* Create Dialogs */}
      <CreateWorkspaceDialog
        open={isCreateWorkspaceDialogOpen}
        onClose={() => setIsCreateWorkspaceDialogOpen(false)}
        onSuccess={fetchData}
      />
      
      <CreateBoardDialog
        open={isCreateBoardDialogOpen}
        onClose={() => setIsCreateBoardDialogOpen(false)}
        onSuccess={fetchData}
        workspaceId={selectedWorkspaceId}
      />

      {/* Workspaces List */}
      {workspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">No workspaces yet</h3>
              <p className="text-gray-600 mt-2">Create your first workspace to get started</p>
            </div>
            <Button 
              onClick={() => setIsCreateWorkspaceDialogOpen(true)}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create Your First Workspace
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {workspaces.map((workspace) => {
            const workspaceBoards = getWorkspaceBoards(workspace.id);
            
            return (
              <div key={workspace.id} className="space-y-4">
                {/* Workspace Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {workspace.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{workspace.name}</h2>
                      {workspace.description && (
                        <p className="text-sm text-gray-600">{workspace.description}</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleCreateBoard(workspace.id)}
                    className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add Board
                  </Button>
                </div>

                {/* Boards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {workspaceBoards.map((board) => (
                    <Link
                      key={board.id}
                      to={`/board/${board.id}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => console.log('Navigating to board:', board.id, board)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Kanban className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{board.name}</h3>
                          {board.description && (
                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                              {board.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Create Board Card */}
                  <button
                    onClick={() => handleCreateBoard(workspace.id)}
                    className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-center">
                      <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Create new board</p>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
