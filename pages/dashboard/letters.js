import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './letters.module.css';

export default function Letters() {
  const [letters, setLetters] = useState([
    {
      id: 1,
      title: 'To My Future Self - 2025',
      date: '2024-01-15',
      unlockDate: '2025-01-15',
      content: 'I hope by next year you will have achieved...',
      isLocked: true,
      status: 'locked',
    },
    {
      id: 2,
      title: 'When I feel discouraged',
      date: '2024-01-10',
      unlockDate: '2024-02-10',
      content: 'Remember why you started. You are stronger than you think.',
      isLocked: false,
      status: 'opened',
    },
  ]);

  const [showNewLetter, setShowNewLetter] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [newLetter, setNewLetter] = useState({
    title: '',
    content: '',
    unlockDate: '',
  });

  const handleCreateLetter = () => {
    if (newLetter.title.trim() && newLetter.content.trim() && newLetter.unlockDate) {
      const letter = {
        id: letters.length + 1,
        title: newLetter.title,
        content: newLetter.content,
        date: new Date().toISOString().split('T')[0],
        unlockDate: newLetter.unlockDate,
        isLocked: new Date(newLetter.unlockDate) > new Date(),
        status: 'locked',
      };
      setLetters([...letters, letter]);
      setNewLetter({ title: '', content: '', unlockDate: '' });
      setShowNewLetter(false);
    }
  };

  const handleOpenLetter = (letter) => {
    if (!letter.isLocked) {
      setSelectedLetter(letter);
      setShowReadModal(true);
    }
  };

  const handleDeleteLetter = (id) => {
    setLetters(letters.filter(l => l.id !== id));
  };

  const getDaysUntil = (unlockDate) => {
    const today = new Date();
    const unlock = new Date(unlockDate);
    const days = Math.ceil((unlock - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  const unreadLetters = letters.filter(l => !l.isLocked).length;
  const lockedLetters = letters.filter(l => l.isLocked).length;

  return (
    <DashboardLayout activeSection="letters">
      <div className={styles['letters-content']}>
        {/* Header */}
        <div className={styles['letters-header']}>
          <div>
            <h2>Letters to Your Future Self</h2>
            <p>Write messages and unlock them when you need them most</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewLetter(true)}>
            ✉️ Write a Letter
          </button>
        </div>

        {/* Stats */}
        <div className={styles['letter-stats']}>
          <div className="card">
            <p className={styles['stat-label']}>Total Letters</p>
            <p className={styles['stat-value']}>{letters.length}</p>
          </div>
          <div className="card">
            <p className={styles['stat-label']}>Unread Letters</p>
            <p className={styles['stat-value']}>{unreadLetters}</p>
          </div>
          <div className="card">
            <p className={styles['stat-label']}>Locked Letters</p>
            <p className={styles['stat-value']}>{lockedLetters}</p>
          </div>
        </div>

        {/* Write Letter Modal */}
        {showNewLetter && (
          <div className={styles['modal-overlay']} onClick={() => setShowNewLetter(false)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Write a Letter to Your Future Self</h3>
              <div className={styles['form-group']}>
                <label>Letter Title</label>
                <input
                  type="text"
                  placeholder="e.g., To my future self in 1 year"
                  value={newLetter.title}
                  onChange={(e) => setNewLetter({ ...newLetter, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div className={styles['form-group']}>
                <label>Your Message</label>
                <textarea
                  placeholder="Write your thoughts, dreams, and encouragement..."
                  value={newLetter.content}
                  onChange={(e) => setNewLetter({ ...newLetter, content: e.target.value })}
                  rows="6"
                ></textarea>
              </div>

              <div className={styles['form-group']}>
                <label>Unlock on (Date)</label>
                <input
                  type="date"
                  value={newLetter.unlockDate}
                  onChange={(e) => setNewLetter({ ...newLetter, unlockDate: e.target.value })}
                />
              </div>

              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowNewLetter(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateLetter}>
                  Save Letter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Read Letter Modal */}
        {showReadModal && selectedLetter && (
          <div className={styles['modal-overlay']} onClick={() => setShowReadModal(false)}>
            <div className={styles['letter-modal']} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles['close-modal']}
                onClick={() => setShowReadModal(false)}
              >
                ✕
              </button>
              <div className={styles['letter-view']}>
                <h2>{selectedLetter.title}</h2>
                <p className={styles['letter-date']}>Written on {selectedLetter.date}</p>
                <div className={styles['letter-body']}>{selectedLetter.content}</div>
                <div className={styles['letter-footer']}>
                  <p>💌 A message from your past self</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Letters Grid */}
        <div className={styles['letters-grid']}>
          {letters.map((letter) => {
            const daysUntil = getDaysUntil(letter.unlockDate);
            const isUnlocked = daysUntil <= 0;

            return (
              <div
                key={letter.id}
                className={`card ${styles['letter-card']} ${isUnlocked ? styles.unlocked : styles.locked}`}
              >
                {isUnlocked ? (
                  <>
                    <div className={styles['letter-icon']}>✉️</div>
                    <h3>{letter.title}</h3>
                    <p className={styles['letter-preview']}>
                      {letter.content.substring(0, 100)}...
                    </p>
                    <div className={styles['letter-meta']}>
                      <span>📅 {letter.date}</span>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: '1rem' }}
                      onClick={() => handleOpenLetter(letter)}
                    >
                      Read Letter
                    </button>
                  </>
                ) : (
                  <>
                    <div className={`${styles['letter-icon']} ${styles['locked-icon']}`}>
                      🔒
                    </div>
                    <h3>{letter.title}</h3>
                    <p className={styles['locked-message']}>
                      This letter is locked and will unlock in {daysUntil} days
                    </p>
                    <p className={styles['unlock-date']}>
                      Opens: {letter.unlockDate}
                    </p>
                  </>
                )}

                <button
                  className={styles['delete-btn']}
                  onClick={() => handleDeleteLetter(letter.id)}
                  title="Delete letter"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {letters.length === 0 && (
          <div className={`card ${styles['empty-state']}`}>
            <p className={styles['empty-icon']}>💌</p>
            <h3>No letters yet</h3>
            <p>Write your first letter to your future self and get a moment of reflection whenever you need it.</p>
            <button className="btn btn-primary" onClick={() => setShowNewLetter(true)}>
              Write Your First Letter
            </button>
          </div>
        )}

        {/* Tips */}
        <div className={`card ${styles['tips-card']}`}>
          <h3>💝 Letter Writing Tips</h3>
          <ul>
            <li>Be honest and vulnerable - this is just for you</li>
            <li>Include your current challenges and how you're feeling</li>
            <li>Share your dreams and what you're working towards</li>
            <li>Write encouraging messages for difficult moments</li>
            <li>Set different unlock dates for different purposes</li>
            <li>"Small steps still count" - remind yourself of this when you feel discouraged</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
