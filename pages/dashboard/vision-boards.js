import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './vision-boards.module.css';

const COLORS = ['lavender', 'blue', 'pink', 'gold', 'sage'];

export default function VisionBoards() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Career Dreams',
      mood: 'career',
      items: [
        { id: 1, type: 'text', content: 'CEO by 30', color: 'lavender', x: 10, y: 10, width: 120, height: 80 },
        { id: 2, type: 'text', content: 'Impact 1M+ lives', color: 'blue', x: 150, y: 50, width: 120, height: 80 },
      ],
    },
    {
      id: 2,
      title: 'Travel Goals',
      mood: 'travel',
      items: [
        { id: 1, type: 'text', content: '🗾 Japan', color: 'pink', x: 30, y: 30, width: 120, height: 80 },
        { id: 2, type: 'text', content: '🏔️ Iceland', color: 'blue', x: 180, y: 100, width: 120, height: 80 },
      ],
    },
  ]);

  const [selectedMood, setSelectedMood] = useState('all');
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showAddItem, setShowAddItem] = useState(null);
  const [newItemData, setNewItemData] = useState({ type: 'text', content: '', color: 'lavender', imageUrl: '' });

  // Load boards from localStorage on mount
  useEffect(() => {
    const savedBoards = localStorage.getItem('visionBoards');
    if (savedBoards) {
      try {
        setBoards(JSON.parse(savedBoards));
      } catch (e) {
        console.error('Failed to load boards:', e);
      }
    }
  }, []);

  // Save boards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('visionBoards', JSON.stringify(boards));
  }, [boards]);

  const moods = [
    { id: 'all', label: 'All Boards', icon: '📌' },
    { id: 'career', label: 'Career', icon: '💼' },
    { id: 'love', label: 'Love & Relationships', icon: '💕' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'health', label: 'Health & Wellness', icon: '🏃' },
    { id: 'finance', label: 'Finance', icon: '💰' },
  ];

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const newBoard = {
        id: Math.max(...boards.map(b => b.id), 0) + 1,
        title: newBoardName,
        mood: 'career',
        items: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setShowNewBoard(false);
    }
  };

  const handleAddItem = (boardId) => {
    if (!newItemData.content.trim()) return;

    setBoards(boards.map(board => {
      if (board.id === boardId) {
        const newItem = {
          id: Math.max(...(board.items?.map(i => i.id) || [0]), 0) + 1,
          type: newItemData.type,
          content: newItemData.content,
          color: newItemData.color,
          imageUrl: newItemData.imageUrl,
          x: Math.random() * 200,
          y: Math.random() * 200,
          width: 120,
          height: 80,
        };
        return { ...board, items: [...(board.items || []), newItem] };
      }
      return board;
    }));

    setNewItemData({ type: 'text', content: '', color: 'lavender', imageUrl: '' });
    setShowAddItem(null);
  };

  const handleDragStart = (e, boardId, itemId) => {
    setDraggedItem({ boardId, itemId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, boardId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setBoards(boards.map(board => {
      if (board.id === draggedItem.boardId) {
        return {
          ...board,
          items: board.items.map(item => {
            if (item.id === draggedItem.itemId) {
              return { ...item, x, y };
            }
            return item;
          }),
        };
      }
      return board;
    }));

    setDraggedItem(null);
  };

  const handleDeleteItem = (boardId, itemId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return { ...board, items: board.items.filter(item => item.id !== itemId) };
      }
      return board;
    }));
  };

  const handleDeleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const filteredBoards = selectedMood === 'all'
    ? boards
    : boards.filter(board => board.mood === selectedMood);

  return (
    <DashboardLayout activeSection="vision-boards">
      <div className={styles['vision-content']}>
        {/* Header */}
        <div className={styles['vision-header']}>
          <div>
            <h2>Vision Boards</h2>
            <p>Create beautiful mood boards to visualize your dreams</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewBoard(true)}>
            + New Board
          </button>
        </div>

        {/* Create New Board Modal */}
        {showNewBoard && (
          <div className={styles['modal-overlay']} onClick={() => setShowNewBoard(false)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Create New Vision Board</h3>
              <input
                type="text"
                placeholder="Board name (e.g., Dream Home)"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
                autoFocus
              />
              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowNewBoard(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateBoard}>
                  Create Board
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mood Filter */}
        <div className={styles['mood-filter']}>
          {moods.map((mood) => (
            <button
              key={mood.id}
              className={`${styles['mood-btn']} ${selectedMood === mood.id ? styles.active : ''}`}
              onClick={() => setSelectedMood(mood.id)}
            >
              <span>{mood.icon}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Vision Boards Grid */}
        {filteredBoards.length > 0 ? (
          <div className={styles['boards-grid']}>
            {filteredBoards.map((board) => (
              <div key={board.id} className={`card ${styles['board-card']}`}>
                <div className={styles['board-header']}>
                  <h3>{board.title}</h3>
                  <button
                    className={styles['menu-btn']}
                    onClick={() => handleDeleteBoard(board.id)}
                    title="Delete board"
                  >
                    🗑️
                  </button>
                </div>

                <div
                  className={styles['board-canvas']}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, board.id)}
                >
                  {board.items.length === 0 ? (
                    <p className={styles['empty-state']}>
                      Drag items here or click "Add Item" to build your vision
                    </p>
                  ) : (
                    <div className={styles['canvas-items']}>
                      {board.items.map((item) => (
                        <div
                          key={item.id}
                          className={`${styles['canvas-item']} ${styles[`item-${item.color}`]}`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, board.id, item.id)}
                          style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            width: `${item.width}px`,
                            height: `${item.height}px`,
                          }}
                        >
                          <div className={styles['item-content']}>
                            {item.type === 'image' && item.imageUrl ? (
                              <img src={item.imageUrl} alt="Vision item" />
                            ) : (
                              <p>{item.content}</p>
                            )}
                          </div>
                          <button
                            className={styles['item-delete']}
                            onClick={() => handleDeleteItem(board.id, item.id)}
                            title="Delete item"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles['board-actions']}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowAddItem(board.id)}
                  >
                    + Add Item
                  </button>
                </div>

                {/* Add Item Modal */}
                {showAddItem === board.id && (
                  <div className={styles['modal-overlay']} onClick={() => setShowAddItem(null)}>
                    <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                      <h3>Add to Vision Board</h3>

                      <div className={styles['form-group']}>
                        <label>Type</label>
                        <select
                          value={newItemData.type}
                          onChange={(e) => setNewItemData({ ...newItemData, type: e.target.value })}
                        >
                          <option value="text">Quote/Text</option>
                          <option value="image">Image</option>
                        </select>
                      </div>

                      {newItemData.type === 'text' ? (
                        <div className={styles['form-group']}>
                          <label>Quote or Goal</label>
                          <textarea
                            placeholder="e.g., 'Be kind to yourself' or 'Travel to 5 countries'"
                            value={newItemData.content}
                            onChange={(e) => setNewItemData({ ...newItemData, content: e.target.value })}
                            rows="3"
                          />
                        </div>
                      ) : (
                        <div className={styles['form-group']}>
                          <label>Image URL</label>
                          <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={newItemData.imageUrl}
                            onChange={(e) => setNewItemData({ ...newItemData, imageUrl: e.target.value, content: e.target.value })}
                          />
                        </div>
                      )}

                      <div className={styles['form-group']}>
                        <label>Color</label>
                        <div className={styles['color-picker']}>
                          {COLORS.map(color => (
                            <button
                              key={color}
                              className={`${styles['color-option']} ${styles[`color-${color}`]} ${newItemData.color === color ? styles.selected : ''}`}
                              onClick={() => setNewItemData({ ...newItemData, color })}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={styles['modal-buttons']}>
                        <button className="btn btn-ghost" onClick={() => setShowAddItem(null)}>
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddItem(board.id)}
                        >
                          Add to Board
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['no-results']}>
            <p>No boards in this category. Create one to get started!</p>
          </div>
        )}

        {/* Info Section */}
        <div className={`card ${styles['info-card']}`}>
          <h3>💡 Vision Board Tips</h3>
          <ul>
            <li>Mix images, quotes, and goals to create an inspiring mood board</li>
            <li>Use mood categories to organize by life area (career, health, love, etc.)</li>
            <li>Save and revisit your boards regularly to stay motivated</li>
            <li>Share your vision with friends for accountability</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
