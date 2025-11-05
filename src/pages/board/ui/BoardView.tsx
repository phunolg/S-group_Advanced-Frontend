import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, X } from 'lucide-react';
import { getBoardById, getBoardLists, createList } from '../../../features/board/model/boardApi';
import { Button } from '../../../shared/ui/button/button';
import { Input } from '../../../shared/ui/input';
import type { Board, List } from '../../../shared/lib/types';

const BoardView = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [addingCardToList, setAddingCardToList] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState('');

  useEffect(() => {
    if (boardId) {
      fetchBoardData();
    }
  }, [boardId]);

  const fetchBoardData = async () => {
    if (!boardId) return;
    
    console.log('Fetching board data for boardId:', boardId);
    
    try {
      setLoading(true);
      const [boardData, listsData] = await Promise.all([
        getBoardById(boardId),
        getBoardLists(boardId)
      ]);
      console.log('Board data:', boardData);
      console.log('Lists data:', listsData);
      setBoard(boardData);
      setLists(listsData.sort((a, b) => a.position - b.position));
    } catch (err: any) {
      console.error('Failed to fetch board data:', err);
      const errorMessage = err?.response?.status === 404 
        ? 'Board not found'
        : err?.response?.status === 500
        ? 'Server error. Please check backend logs.'
        : err?.response?.data?.message || err?.message || 'Unknown error';
      
      alert(`Failed to load board: ${errorMessage}`);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async () => {
    if (!boardId || !newListTitle.trim()) return;

    const listData = { 
      title: newListTitle,
      position: lists.length 
    };
    console.log('Creating list with data:', listData);

    try {
      const result = await createList(boardId, listData);
      console.log('List created successfully:', result);
      setNewListTitle('');
      setIsAddingList(false);
      fetchBoardData();
    } catch (err) {
      console.error('Failed to create list:', err);
      alert('Failed to create list. Please check backend logs.');
    }
  };

  const handleAddCard = async (listId: string) => {
    if (!newCardTitle.trim()) return;

    try {
      // TODO: Implement card creation API
      console.log('Add card to list:', listId, newCardTitle);
      setNewCardTitle('');
      setAddingCardToList(null);
    } catch (err) {
      console.error('Failed to create card:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading board...</p>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Board not found</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-400 to-blue-600">
      {/* Board Header */}
      <div className="flex-none px-4 py-3 bg-black/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{board.name}</h1>
            {board.description && (
              <p className="text-sm text-white/80 mt-1">{board.description}</p>
            )}
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Lists Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 py-4">
        <div className="flex gap-4 h-full">
          {/* Existing Lists */}
          {lists.map((list) => (
            <div
              key={list.id}
              className="flex-none w-72 bg-gray-100 rounded-lg flex flex-col max-h-full"
            >
              {/* List Header */}
              <div className="flex-none px-3 py-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{list.title}</h3>
                <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200 text-gray-600 border-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-2">
                {/* Sample Card - Replace with actual cards later */}
                <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm text-gray-900">Sample card</p>
                </div>
              </div>

              {/* Add Card Section */}
              <div className="flex-none px-3 pb-3">
                {addingCardToList === list.id ? (
                  <div className="space-y-2">
                    <Input
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      placeholder="Enter card title..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddCard(list.id);
                        } else if (e.key === 'Escape') {
                          setAddingCardToList(null);
                          setNewCardTitle('');
                        }
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleAddCard(list.id)}
                        className="flex-1 h-8 text-sm"
                      >
                        Add Card
                      </Button>
                      <Button
                        onClick={() => {
                          setAddingCardToList(null);
                          setNewCardTitle('');
                        }}
                        className="w-8 h-8 p-0 border border-gray-300"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setAddingCardToList(list.id)}
                    className="w-full justify-start bg-transparent hover:bg-gray-200 text-gray-700 border-0"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add a card
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Add List Section */}
          <div className="flex-none w-72">
            {isAddingList ? (
              <div className="bg-gray-100 rounded-lg p-3 space-y-2">
                <Input
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Enter list title..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateList();
                    } else if (e.key === 'Escape') {
                      setIsAddingList(false);
                      setNewListTitle('');
                    }
                  }}
                />
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCreateList}
                    className="flex-1 h-8 text-sm"
                  >
                    Add List
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingList(false);
                      setNewListTitle('');
                    }}
                    className="w-8 h-8 p-0 border border-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsAddingList(true)}
                className="w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add a list
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
