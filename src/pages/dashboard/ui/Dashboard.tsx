import { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { Button } from '../../../shared/ui/button/button';
import { getWorkspaces } from '../../../features/workspace/model/workspaceApi';
import type { Workspace } from '../../../shared/lib/types';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoading(true);
        const data = await getWorkspaces();
        setWorkspaces(data);
      } catch (err) {
        setError('Failed to fetch workspaces');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

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
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Workspace
        </Button>
      </div>

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
            <Button className="flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Create Your First Workspace
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {workspaces.map((workspace) => (
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
                <Button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                  Add Board
                </Button>
              </div>

              {/* Boards Grid - Placeholder for now */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">Create new board</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
