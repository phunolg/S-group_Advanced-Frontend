import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../shared/ui/button/button';
import { Input } from '../../../shared/ui/input';
import { createBoard } from '../model/boardApi';

interface CreateBoardDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workspaceId?: string;
}

export function CreateBoardDialog({ open, onClose, onSuccess, workspaceId }: CreateBoardDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      setError('');
      
      console.log('WorkspaceId received:', workspaceId);
      const payload = { name: title, description, workspaceId };
      console.log('Creating board with payload:', payload);
      
      const result = await createBoard(payload);
      console.log('Board created successfully:', result);
      
      setTitle('');
      setDescription('');
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Failed to create board:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to create board');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create Board</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Board Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Project Alpha"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this board for?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading || !title.trim()}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Board'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
