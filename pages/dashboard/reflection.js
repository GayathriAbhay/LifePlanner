import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './reflection.module.css';

const moodEmojis = ['😢', '😕', '😐', '🙂', '😊', '😄'];
const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Great', 'Amazing'];

const defaultEntries = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    journalEntry: 'Started learning deep learning today. It\'s challenging but exciting!',
    mood: 4,
    gratitude: ['Morning coffee', 'A good conversation with a friend', 'Making progress on my goals'],
    lessonsLearned: ['Consistency matters more than perfection', 'Small steps add up to big results'],
  },
];

export default function Reflection() {
  const [entries, setEntries] = useState(defaultEntries);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState(3);
  const [gratitudeItems, setGratitudeItems] = useState(['', '', '']);
  const [lessonsText, setLessonsText] = useState('');
  const [newGratitude, setNewGratitude] = useState('');

  useEffect(() => {
    const savedEntries = localStorage.getItem('reflectionEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    const entry = entries.find(e => e.date === selectedDate);
    if (entry) {
      setJournalText(entry.journalEntry);
      setSelectedMood(entry.mood);
      setGratitudeItems(entry.gratitude);
      setLessonsText(entry.lessonsLearned.join('\n'));
    } else {
      setJournalText('');
      setSelectedMood(3);
      setGratitudeItems(['', '', '']);
      setLessonsText('');
    }
  }, [selectedDate, entries]);

  const handleSaveEntry = () => {
    const existingIndex = entries.findIndex(e => e.date === selectedDate);
    const newEntry = {
      id: existingIndex >= 0 ? entries[existingIndex].id : Date.now(),
      date: selectedDate,
      journalEntry: journalText,
      mood: selectedMood,
      gratitude: gratitudeItems.filter(g => g.trim()),
      lessonsLearned: lessonsText.split('\n').filter(l => l.trim()),
    };

    if (existingIndex >= 0) {
      const updated = [...entries];
      updated[existingIndex] = newEntry;
      setEntries(updated);
    } else {
      setEntries([...entries, newEntry]);
    }

    alert('Entry saved! 📝');
  };

  const handleAddGratitude = () => {
    if (newGratitude.trim()) {
      setGratitudeItems([...gratitudeItems, newGratitude]);
      setNewGratitude('');
    }
  };

  const handleRemoveGratitude = (idx) => {
    setGratitudeItems(gratitudeItems.filter((_, i) => i !== idx));
  };

  const allMoods = entries.map(e => e.mood);
  const averageMood = allMoods.length > 0
    ? Math.round(allMoods.reduce((a, b) => a + b, 0) / allMoods.length)
    : 3;

  return (
    <DashboardLayout activeSection="reflection">
      <div className={styles['reflection-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>🧠 Mind & Reflection</h1>
            <p>Journaling, mood tracking, and gratitude practice</p>
          </div>
        </div>

        <div className={styles['reflection-grid']}>
          {/* Stats */}
          <div className={styles['stats-section']}>
            <div className={styles['stat-card']}>
              <p className={styles['stat-label']}>Your Mood</p>
              <p className={styles['stat-emoji']}>{moodEmojis[selectedMood]}</p>
              <p className={styles['stat-text']}>{moodLabels[selectedMood]}</p>
            </div>

            <div className={styles['stat-card']}>
              <p className={styles['stat-label']}>Average Mood</p>
              <p className={styles['stat-emoji']}>{moodEmojis[averageMood]}</p>
              <p className={styles['stat-text']}>{moodLabels[averageMood]}</p>
            </div>

            <div className={styles['stat-card']}>
              <p className={styles['stat-label']}>Total Entries</p>
              <p className={styles['stat-value']}>{entries.length}</p>
            </div>
          </div>

          {/* Main Form */}
          <div className={styles['form-section']}>
            {/* Date Picker */}
            <div className={styles['date-picker-wrapper']}>
              <label htmlFor="reflection-date">Select Date</label>
              <input
                id="reflection-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles['date-picker']}
              />
            </div>

            {/* Journal Entry */}
            <div className={styles['form-group']}>
              <label>📝 Journal Entry</label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What's on your mind today? How are you feeling?"
                rows={5}
                className={styles['textarea']}
              />
            </div>

            {/* Mood Selector */}
            <div className={styles['mood-section']}>
              <label>How are you feeling today?</label>
              <div className={styles['mood-selector']}>
                {moodEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    className={`${styles['mood-btn']} ${selectedMood === idx ? styles.active : ''}`}
                    onClick={() => setSelectedMood(idx)}
                    title={moodLabels[idx]}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Gratitude */}
            <div className={styles['gratitude-section']}>
              <label>🙏 What are you grateful for today?</label>
              <div className={styles['gratitude-list']}>
                {gratitudeItems.map((item, idx) => (
                  <div key={idx} className={styles['gratitude-item']}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...gratitudeItems];
                        updated[idx] = e.target.value;
                        setGratitudeItems(updated);
                      }}
                      placeholder={`Gratitude ${idx + 1}`}
                      className={styles['gratitude-input']}
                    />
                    {gratitudeItems.length > 1 && (
                      <button
                        onClick={() => handleRemoveGratitude(idx)}
                        className={styles['remove-btn']}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles['add-gratitude']}>
                <input
                  type="text"
                  value={newGratitude}
                  onChange={(e) => setNewGratitude(e.target.value)}
                  placeholder="Add another..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGratitude()}
                  className={styles['gratitude-input']}
                />
                <button onClick={handleAddGratitude} className="btn btn-sm btn-secondary">
                  Add
                </button>
              </div>
            </div>

            {/* Lessons Learned */}
            <div className={styles['form-group']}>
              <label>💡 Lessons Learned Today</label>
              <textarea
                value={lessonsText}
                onChange={(e) => setLessonsText(e.target.value)}
                placeholder="What did you learn today? (One per line)"
                rows={3}
                className={styles['textarea']}
              />
            </div>

            {/* Save Button */}
            <button onClick={handleSaveEntry} className="btn btn-primary btn-lg">
              Save Reflection
            </button>
          </div>
        </div>

        {/* Past Entries */}
        <div className={styles['entries-history']}>
          <h2>Recent Entries</h2>
          <div className={styles['entries-list']}>
            {entries.slice().reverse().slice(0, 5).map(entry => (
              <div
                key={entry.id}
                className={styles['entry-preview']}
                onClick={() => setSelectedDate(entry.date)}
              >
                <div className={styles['entry-header']}>
                  <span className={styles['entry-date']}>
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className={styles['entry-mood']}>{moodEmojis[entry.mood]}</span>
                </div>
                <p className={styles['entry-text']}>
                  {entry.journalEntry.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
