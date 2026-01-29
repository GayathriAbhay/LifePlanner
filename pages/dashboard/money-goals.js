import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './money-goals.module.css';

const COLORS = ['lavender', 'blue', 'sage', 'pink'];

export default function MoneyGoals() {
  const [goals, setGoals] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showAddAmount, setShowAddAmount] = useState(null);
  const [addAmount, setAddAmount] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    emoji: '💰',
  });

  // Initialize from localStorage
  useEffect(() => {
    const premiumStatus = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premiumStatus);

    const savedGoals = localStorage.getItem('moneyGoals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        console.error('Failed to load goals:', e);
        setDefaultGoals();
      }
    } else {
      setDefaultGoals();
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('moneyGoals', JSON.stringify(goals));
  }, [goals]);

  const setDefaultGoals = () => {
    setGoals([
      {
        id: 1,
        name: 'Japan Trip',
        category: 'travel',
        emoji: '✈️',
        target: 5000,
        saved: 2300,
        deadline: '2025-06-01',
        color: 'lavender',
      },
      {
        id: 2,
        name: 'Dream Setup (Gaming PC)',
        category: 'tech',
        emoji: '🎮',
        target: 2000,
        saved: 800,
        deadline: '2025-12-01',
        color: 'blue',
      },
      {
        id: 3,
        name: 'Emergency Fund',
        category: 'security',
        emoji: '🛡️',
        target: 10000,
        saved: 6500,
        deadline: '2025-12-31',
        color: 'sage',
      },
    ]);
  };

  const handleCreateGoal = () => {
    if (newGoal.name.trim() && newGoal.target && newGoal.deadline) {
      const goal = {
        id: goals.length + 1,
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        saved: 0,
        deadline: newGoal.deadline,
        emoji: newGoal.emoji,
        category: 'goal',
        color: 'blue',
      };
      setGoals([...goals, goal]);
      setNewGoal({ name: '', target: '', deadline: '', emoji: '💰' });
      setShowNewGoal(false);
    }
  };

  const handleAddToGoal = (goalId) => {
    if (addAmount && parseFloat(addAmount) > 0) {
      setGoals(
        goals.map(g =>
          g.id === goalId
            ? { ...g, saved: g.saved + parseFloat(addAmount) }
            : g
        )
      );
      setAddAmount('');
      setShowAddAmount(null);
    }
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const days = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <DashboardLayout activeSection="money-goals">
      <div className={styles['money-content']}>
        {/* Header */}
        <div className={styles['money-header']}>
          <div>
            <h2>Money Goal Tracker</h2>
            <p>Visualize your savings and watch your dreams come closer</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewGoal(true)}>
            + New Goal
          </button>
        </div>

        {/* Overall Progress */}
        <div className={`card ${styles['overall-progress']}`}>
          <div className={styles['progress-header']}>
            <h3>Your Savings Progress</h3>
            <p className={styles['progress-subtitle']}>
              ${totalSaved.toLocaleString()} of ${totalTarget.toLocaleString()}
            </p>
          </div>

          <div className={styles['progress-bar-container']}>
            <div className={styles['progress-bar']}>
              <div
                className={styles['progress-fill']}
                style={{ width: `${Math.min(totalProgress, 100)}%` }}
              ></div>
            </div>
            <p className={styles['progress-percentage']}>
              {totalProgress.toFixed(0)}% Complete
            </p>
          </div>

          <div className={styles['progress-stats']}>
            <div>
              <p className={styles['stat-label']}>Total Goals</p>
              <p className={styles['stat-number']}>{goals.length}</p>
            </div>
            <div>
              <p className={styles['stat-label']}>Total Target</p>
              <p className={styles['stat-number']}>${totalTarget.toLocaleString()}</p>
            </div>
            <div>
              <p className={styles['stat-label']}>Total Saved</p>
              <p className={styles['stat-number']}>${totalSaved.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* New Goal Modal */}
        {showNewGoal && (
          <div className={styles['modal-overlay']} onClick={() => setShowNewGoal(false)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Create Money Goal</h3>
              <div className={styles['form-group']}>
                <label>Goal Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Vacation Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className={styles['form-group']}>
                <label>Target Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="5000"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>

              <div className={styles['form-group']}>
                <label>Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>

              <div className={styles['form-group']}>
                <label>Emoji</label>
                <input
                  type="text"
                  placeholder="🎉"
                  value={newGoal.emoji}
                  onChange={(e) => setNewGoal({ ...newGoal, emoji: e.target.value })}
                  maxLength="2"
                />
              </div>

              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowNewGoal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateGoal}>
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Amount Modal */}
        {showAddAmount && (
          <div className={styles['modal-overlay']} onClick={() => setShowAddAmount(null)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Add to Savings</h3>
              <div className={styles['form-group']}>
                <label>Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="100"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  autoFocus
                />
              </div>
              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowAddAmount(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToGoal(showAddAmount)}
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Goals Grid */}
        <div className={styles['goals-grid']}>
          {goals.map((goal) => {
            const progress = (goal.saved / goal.target) * 100;
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isCompleted = goal.saved >= goal.target;

            return (
              <div key={goal.id} className={`card ${styles['goal-card']}`}>
                <div className={styles['goal-header']}>
                  <div className={styles['goal-title']}>
                    <span className={styles['goal-emoji']}>{goal.emoji}</span>
                    <h3>{goal.name}</h3>
                  </div>
                  <button
                    className={styles['delete-btn']}
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Bar */}
                <div className={styles['goal-progress-container']}>
                  <div className={`${styles['goal-progress-bar']} ${styles[`progress-${goal.color}`]}`}>
                    <div
                      className={styles['progress-fill']}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className={styles['progress-text']}>
                    ${goal.saved.toLocaleString()} / ${goal.target.toLocaleString()}
                  </p>
                </div>

                {/* Stats */}
                <div className={styles['goal-stats']}>
                  <div>
                    <p className={styles['stat-label']}>Progress</p>
                    <p className={styles['stat-value']}>{progress.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className={styles['stat-label']}>Days Left</p>
                    <p className={styles['stat-value']}>{daysRemaining}</p>
                  </div>
                  <div>
                    <p className={styles['stat-label']}>Remaining</p>
                    <p className={styles['stat-value']}>
                      ${Math.max(0, goal.target - goal.saved).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isCompleted ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setShowAddAmount(goal.id)}
                  >
                    + Add Savings
                  </button>
                ) : (
                  <div className={styles['completed-badge']}>
                    ✨ Goal Achieved! ✨
                  </div>
                )}

                {isCompleted && (
                  <div className={styles['celebration']}>
                    🎉 You did it!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {goals.length === 0 && (
          <div className={`card ${styles['empty-state']}`}>
            <p className={styles['empty-icon']}>💰</p>
            <h3>No money goals yet</h3>
            <p>Start saving towards your dreams. Every dollar brings you closer!</p>
            <button className="btn btn-primary" onClick={() => setShowNewGoal(true)}>
              Create Your First Goal
            </button>
          </div>
        )}

        {/* Tips */}
        <div className={`card ${styles['tips-card']}`}>
          <h3>💡 Saving Smart</h3>
          <ul>
            <li>Break big goals into smaller monthly targets</li>
            <li>Track every deposit to stay motivated</li>
            <li>Set realistic deadlines based on your income</li>
            <li>"Small steps still count" - even $10 adds up over time</li>
            <li>Celebrate milestones as you reach them</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
