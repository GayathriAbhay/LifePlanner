import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './vision-boards.module.css';

export default function VisionBoards() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Career Dreams',
      mood: 'career',
      items: [
        { id: 1, type: 'text', content: 'CEO by 30', color: 'lavender' },
        { id: 2, type: 'text', content: 'Impact 1M+ lives', color: 'blue' },
      ],
    },
    {
      id: 2,
      title: 'Travel Goals',
      mood: 'travel',
      items: [
        { id: 1, type: 'text', content: 'Japan 🗾', color: 'pink' },
        { id: 2, type: 'text', content: 'Iceland', color: 'blue' },
      ],
    },
  ]);

  const [selectedMood, setSelectedMood] = useState('all');
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

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
        id: boards.length + 1,
        title: newBoardName,
        mood: 'career',
        items: [],
      };
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setShowNewBoard(false);
    }
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
                  <button className={styles['menu-btn']}>⋮</button>
                </div>

                <div className={styles['board-canvas']}>
                  {board.items.length === 0 ? (
                    <p className={styles['empty-state']}>
                      Drag images and quotes here to build your vision
                    </p>
                  ) : (
                    <div className={styles['masonry-grid']}>
                      {board.items.map((item) => (
                        <div
                          key={item.id}
                          className={`${styles['item']} ${styles[`item-${item.color}`]}`}
                        >
                          {item.content}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles['board-actions']}>
                  <button className="btn btn-secondary btn-sm">
                    + Add Item
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    Share
                  </button>
                </div>
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
