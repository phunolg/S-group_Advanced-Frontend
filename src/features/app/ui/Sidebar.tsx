import { Link, useLocation } from 'react-router-dom';
import { Layout, LogOut } from 'lucide-react';
import { Button } from '../../../shared/ui/button/button';
import { logout } from '../../../shared/utils/logout';

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    roles: string[];
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">My App</h1>
        <p className="text-xs text-gray-500">Dashboard System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
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
