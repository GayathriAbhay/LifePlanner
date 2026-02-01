import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ProgressBar from '../../components/ProgressBar';
import ProgressRing from '../../components/ProgressRing';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [areas, setAreas] = useState([]);
  const [dreamStatement, setDreamStatement] = useState('Design a life I love where I can create, grow, and impact others positively.');
  const [isEditingStatement, setIsEditingStatement] = useState(false);
  const [randomQuote, setRandomQuote] = useState('Every day is a new chance to be better.');

  const quotes = [
    "The secret of getting ahead is getting started.",
    "Your potential is endless. Your growth is optional.",
    "Every day is a new chance to be better.",
    "Small steps daily lead to big changes yearly.",
    "You are the architect of your own destiny.",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(user.name || 'User');

    const savedGoals = localStorage.getItem('dreamGoals');
    if (savedGoals) setGoals(JSON.parse(savedGoals));

    const savedHabits = localStorage.getItem('dashboardHabits');
    if (savedHabits) setHabits(JSON.parse(savedHabits));

    const savedAreas = localStorage.getItem('lifeAreas');
    if (savedAreas) setAreas(JSON.parse(savedAreas));

    const savedStatement = localStorage.getItem('dreamStatement');
    if (savedStatement) setDreamStatement(savedStatement);

    // Set random quote only on client
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleSaveDreamStatement = () => {
    localStorage.setItem('dreamStatement', dreamStatement);
    setIsEditingStatement(false);
  };

  const topGoals = goals.slice(0, 3);
  const achievedGoals = goals.filter(g => g.status === 'Achieved').length;
  const goalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;

  const habitStreak = habits.length > 0
    ? Math.round(habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length)
    : 0;

  const lifeBalance = areas.length > 0
    ? Math.round(areas.reduce((sum, a) => sum + a.currentLevel, 0) / areas.length) * 10
    : 0;

  const todaysTasks = [];
  const completedTasks = 0;

  return (
    <DashboardLayout activeSection="dashboard">
      <div className={styles['dashboard-content']}>
        {/* Welcome Section */}
        <div className={styles['welcome-section']}>
          <h1>Welcome back, {userName}! 👋</h1>
          <p>You're building your dream life, one day at a time.</p>
        </div>

        {/* Dream Life Statement */}
        <div className={styles['statement-card']}>
          <div className={styles['statement-header']}>
            <h2>🌟 My Dream Life Statement</h2>
            {!isEditingStatement && (
              <button
                className={styles['edit-btn']}
                onClick={() => setIsEditingStatement(true)}
              >
                ✏️ Edit
              </button>
            )}
          </div>
          {isEditingStatement ? (
            <div className={styles['statement-form']}>
              <textarea
                value={dreamStatement}
                onChange={(e) => setDreamStatement(e.target.value)}
                rows={3}
              />
              <div className={styles['form-actions']}>
                <button className="btn btn-primary" onClick={handleSaveDreamStatement}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setIsEditingStatement(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className={styles['statement-text']}>{dreamStatement}</p>
          )}
        </div>

        {/* Key Metrics */}
        <div className={styles['metrics-grid']}>
          <div className={styles['metric-card']}>
            <div className={styles['metric-content']}>
              <p className={styles['metric-label']}>Goal Progress</p>
              <p className={styles['metric-value']}>{goalProgress}%</p>
              <p className={styles['metric-desc']}>{achievedGoals} goals achieved</p>
            </div>
            <div className={styles['metric-ring']}>
              <ProgressRing percentage={goalProgress} size="sm" color="#a8b5ff" />
            </div>
          </div>

          <div className={styles['metric-card']}>
            <div className={styles['metric-content']}>
              <p className={styles['metric-label']}>Habit Streak</p>
              <p className={styles['metric-value']}>{habitStreak} days</p>
              <p className={styles['metric-desc']}>{habits.length} habits tracked</p>
            </div>
            <div className={styles['metric-ring']}>
              <ProgressRing percentage={Math.min(habitStreak / 30 * 100, 100)} size="sm" color="#ff9a76" />
            </div>
          </div>

          <div className={styles['metric-card']}>
            <div className={styles['metric-content']}>
              <p className={styles['metric-label']}>Life Balance</p>
              <p className={styles['metric-value']}>{lifeBalance}%</p>
              <p className={styles['metric-desc']}>{areas.length} areas tracked</p>
            </div>
            <div className={styles['metric-ring']}>
              <ProgressRing percentage={lifeBalance} size="sm" color="#76ff9a" />
            </div>
          </div>

          <div className={styles['metric-card']}>
            <div className={styles['metric-content']}>
              <p className={styles['metric-label']}>Today's Tasks</p>
              <p className={styles['metric-value']}>{completedTasks}/0</p>
              <p className={styles['metric-desc']}>Completed today</p>
            </div>
            <div className={styles['metric-ring']}>
              <ProgressRing percentage={0} size="sm" color="#ffd876" />
            </div>
          </div>
        </div>

        {/* Top Active Goals */}
        {topGoals.length > 0 && (
          <div className={styles['section']}>
            <h2>🎯 Top Active Goals</h2>
            <div className={styles['goals-list']}>
              {topGoals.map(goal => (
                <div key={goal.id} className={styles['goal-preview']}>
                  <div className={styles['goal-info']}>
                    <h3>{goal.title}</h3>
                    <span className={styles['category']}>{goal.category}</span>
                  </div>
                  <div className={styles['progress-wrapper']}>
                    <ProgressBar percentage={goal.progress} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Affirmation */}
        <div className={styles['affirmation-card']}>
          <p className={styles['affirmation-emoji']}>✨</p>
          <p className={styles['affirmation-text']}>{randomQuote}</p>
          <p className={styles['affirmation-label']}>Today's Affirmation</p>
        </div>

        {/* Life Areas Overview */}
        {areas.length > 0 && (
          <div className={styles['section']}>
            <h2>🗺️ Life Areas Overview</h2>
            <div className={styles['areas-grid']}>
              {areas.slice(0, 4).map(area => (
                <div key={area.name} className={styles['area-mini']}>
                  <p className={styles['area-icon']}>{area.icon}</p>
                  <p className={styles['area-name']}>{area.name}</p>
                  <p className={styles['area-level']}>{area.currentLevel}/10</p>
                  <div className={styles['mini-bar']}>
                    <div style={{ width: `${area.currentLevel * 10}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Motivation Quote */}
        <div className={styles['footer-card']}>
          <p>
            "Every single day is an opportunity to be better. Every moment is a chance to grow. Make them count." 💫
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
