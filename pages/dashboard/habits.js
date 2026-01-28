import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './habits.module.css';

export default function Habits() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Morning Meditation',
      category: 'wellness',
      emoji: '🧘',
      streak: 15,
      goal: 30,
      color: 'lavender',
      completed: new Set(['2024-01-15', '2024-01-14', '2024-01-13', '2024-01-12', '2024-01-11']),
    },
    {
      id: 2,
      name: 'Read 30 mins',
      category: 'learning',
      emoji: '📚',
      streak: 8,
      goal: 21,
      color: 'blue',
      completed: new Set(['2024-01-15', '2024-01-14', '2024-01-13']),
    },
    {
      id: 3,
      name: 'Exercise',
      category: 'health',
      emoji: '🏃',
      streak: 5,
      goal: 30,
      color: 'sage',
      completed: new Set(['2024-01-15', '2024-01-14']),
    },
  ]);

  const [showNewHabit, setShowNewHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', emoji: '✨', goal: 30 });

  const handleAddHabit = () => {
    if (newHabit.name.trim()) {
      const habit = {
        id: habits.length + 1,
        name: newHabit.name,
        emoji: newHabit.emoji,
        goal: newHabit.goal,
        category: 'general',
        color: 'blue',
        streak: 0,
        completed: new Set(),
      };
      setHabits([...habits, habit]);
      setNewHabit({ name: '', emoji: '✨', goal: 30 });
      setShowNewHabit(false);
    }
  };

  const handleToggleDay = (habitId, date) => {
    setHabits(
      habits.map(h => {
        if (h.id === habitId) {
          const newCompleted = new Set(h.completed);
          if (newCompleted.has(date)) {
            newCompleted.delete(date);
          } else {
            newCompleted.add(date);
          }
          return { ...h, completed: newCompleted };
        }
        return h;
      })
    );
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  // Get last 30 days
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last30Days = getLast30Days();

  return (
    <DashboardLayout activeSection="habits">
      <div className={styles['habits-content']}>
        {/* Header */}
        <div className={styles['habits-header']}>
          <div>
            <h2>Habit Tracker</h2>
            <p>Build consistent habits and watch your streaks grow</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewHabit(true)}>
            + New Habit
          </button>
        </div>

        {/* New Habit Modal */}
        {showNewHabit && (
          <div className={styles['modal-overlay']} onClick={() => setShowNewHabit(false)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Create New Habit</h3>
              <div className={styles['form-group']}>
                <label>Habit Name</label>
                <input
                  type="text"
                  placeholder="e.g., Morning Workout"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  autoFocus
                />
              </div>
              <div className={styles['form-group']}>
                <label>Emoji</label>
                <input
                  type="text"
                  placeholder="Pick an emoji 😊"
                  value={newHabit.emoji}
                  onChange={(e) => setNewHabit({ ...newHabit, emoji: e.target.value })}
                  maxLength="2"
                />
              </div>
              <div className={styles['form-group']}>
                <label>Goal (days)</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={newHabit.goal}
                  onChange={(e) => setNewHabit({ ...newHabit, goal: parseInt(e.target.value) })}
                />
              </div>
              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowNewHabit(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddHabit}>
                  Create Habit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Habits List */}
        <div className={styles['habits-grid']}>
          {habits.map((habit) => {
            const progress = (habit.streak / habit.goal) * 100;
            return (
              <div key={habit.id} className={`card ${styles['habit-card']}`}>
                <div className={styles['habit-header']}>
                  <div className={styles['habit-title']}>
                    <span className={styles['habit-emoji']}>{habit.emoji}</span>
                    <div>
                      <h3>{habit.name}</h3>
                      <p className={styles['habit-goal']}>Goal: {habit.goal} days</p>
                    </div>
                  </div>
                  <button
                    className={styles['delete-btn']}
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Ring */}
                <div className={styles['progress-container']}>
                  <svg className={styles['progress-ring']} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" className={styles['progress-bg']} />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className={`${styles['progress-fill']} ${styles[`progress-${habit.color}`]}`}
                      style={{
                        strokeDasharray: `${(progress / 100) * 283} 283`,
                      }}
                    />
                  </svg>
                  <div className={styles['progress-text']}>
                    <p className={styles['streak-number']}>{habit.streak}</p>
                    <p className={styles['streak-label']}>day streak</p>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className={styles['calendar-grid']}>
                  {last30Days.map((date, idx) => {
                    const isCompleted = habit.completed.has(date);
                    const dayOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(date).getDay()];
                    return (
                      <button
                        key={idx}
                        className={`${styles['day-cell']} ${isCompleted ? styles.completed : ''} ${styles[`cell-${habit.color}`]}`}
                        onClick={() => handleToggleDay(habit.id, date)}
                        title={date}
                      >
                        {isCompleted && '✓'}
                      </button>
                    );
                  })}
                </div>

                <div className={styles['habit-footer']}>
                  <p className={styles['days-label']}>Last 30 days</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className={`card ${styles['tips-card']}`}>
          <h3>💡 Build Better Habits</h3>
          <ul>
            <li>Start small - even 5 minutes counts</li>
            <li>Track consistently to build your streak</li>
            <li>Celebrate milestones along the way</li>
            <li>Don't break the chain - missing one day resets your streak</li>
            <li>"You're building your future one day at a time"</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
