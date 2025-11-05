import { Link, useLocation } from 'react-router-dom';
import { Layout, LogOut, ChevronDown, Plus, ChevronRight, Kanban } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../shared/ui/button/button';
import { logout } from '../../../shared/utils/logout';
import type { Workspace, Board } from '../../../shared/lib/types';

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    roles: string[];
  } | null;
  workspaces?: Workspace[];
  boards?: Board[];
  currentWorkspace?: Workspace | null;
  onWorkspaceChange?: (workspace: Workspace) => void;
  onCreateWorkspace?: () => void;
  onCreateBoard?: () => void;
}

export function Sidebar({ user, workspaces = [], boards = [], currentWorkspace, onWorkspaceChange, onCreateWorkspace, onCreateBoard }: SidebarProps) {
  const location = useLocation();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isBoardsOpen, setIsBoardsOpen] = useState(true);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  // Filter boards for current workspace
  const currentWorkspaceBoards = boards.filter(board => board.workspace_id === currentWorkspace?.id);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Workspace Switcher */}
      <div className="p-4 border-b border-gray-200 relative">
        {currentWorkspace ? (
          <div>
            <button
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {currentWorkspace.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {currentWorkspace.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {currentWorkspace.description || 'Main workspace'}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>

            {/* Workspace Dropdown Menu */}
            {isWorkspaceMenuOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsWorkspaceMenuOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Workspaces
                  </div>
                  
                  {/* Workspace List */}
                  <div className="max-h-64 overflow-y-auto">
                    {workspaces.map((workspace) => (
                      <button
                        key={workspace.id}
                        onClick={() => {
                          onWorkspaceChange?.(workspace);
                          setIsWorkspaceMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {workspace.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {workspace.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {workspace.description || 'Workspace'}
                          </p>
                        </div>
                        {currentWorkspace.id === workspace.id && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Create Workspace Button */}
                  <div className="border-t border-gray-200 mt-2 pt-2 px-3">
                    <button
                      onClick={() => {
                        onCreateWorkspace?.();
                        setIsWorkspaceMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create workspace</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-2">
            <h1 className="text-xl font-bold text-blue-600">My App</h1>
            <p className="text-xs text-gray-500">Dashboard System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Navigation Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
            Navigation
          </h3>
          <div className="space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Layout className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Boards Section */}
        {currentWorkspace && (
          <div>
            <div className="mb-2">
              <button
                onClick={() => setIsBoardsOpen(!isBoardsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Kanban className="w-4 h-4" />
                  <span>All Boards</span>
                </div>
                {isBoardsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            {isBoardsOpen && (
              <div className="space-y-1">
                {/* Individual Boards */}
                {currentWorkspaceBoards.map((board) => (
                  <Link
                    key={board.id}
                    to={`/board/${board.id}`}
                    className={`flex items-center gap-3 px-6 py-2 text-sm rounded-md transition-colors ${
                      location.pathname === `/board/${board.id}`
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{board.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User Info */}
      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      )}
    </aside>
  );
}
