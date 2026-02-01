import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ProgressRing from '../../components/ProgressRing';
import styles from './progress.module.css';

export default function ProgressTracker() {
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const savedGoals = localStorage.getItem('dreamGoals');
    if (savedGoals) setGoals(JSON.parse(savedGoals));

    const savedHabits = localStorage.getItem('dashboardHabits');
    if (savedHabits) setHabits(JSON.parse(savedHabits));

    const savedAreas = localStorage.getItem('lifeAreas');
    if (savedAreas) setAreas(JSON.parse(savedAreas));
  }, []);

  const goalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;

  const achievedGoals = goals.filter(g => g.status === 'Achieved').length;

  const habitConsistency = habits.length > 0
    ? Math.round(
        habits.reduce((sum, h) => {
          const completed = h.weeklyProgress.filter(d => d).length;
          return sum + (completed / 7) * 100;
        }, 0) / habits.length
      )
    : 0;

  const lifeAreaBalance = areas.length > 0
    ? Math.round(areas.reduce((sum, a) => sum + a.currentLevel, 0) / areas.length) * 10
    : 0;

  const monthProgress = 65; // Example

  return (
    <DashboardLayout activeSection="progress">
      <div className={styles['progress-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>📊 Progress Tracker</h1>
            <p>Monitor your growth across all life areas</p>
          </div>
        </div>

        {/* Main Progress Rings */}
        <div className={styles['rings-grid']}>
          <div className={styles['ring-card']}>
            <ProgressRing percentage={goalProgress} label="Goal Progress" size="lg" color="#a8b5ff" />
            <p className={styles['ring-description']}>{achievedGoals} goals achieved</p>
          </div>

          <div className={styles['ring-card']}>
            <ProgressRing percentage={habitConsistency} label="Habit Consistency" size="lg" color="#ff9a76" />
            <p className={styles['ring-description']}>{habits.length} habits tracked</p>
          </div>

          <div className={styles['ring-card']}>
            <ProgressRing percentage={lifeAreaBalance} label="Life Balance" size="lg" color="#76ff9a" />
            <p className={styles['ring-description']}>7 areas managed</p>
          </div>

          <div className={styles['ring-card']}>
            <ProgressRing percentage={monthProgress} label="Month Progress" size="lg" color="#ffd876" />
            <p className={styles['ring-description']}>On track this month</p>
          </div>
        </div>

        {/* Goal Breakdown */}
        {goals.length > 0 && (
          <div className={styles['section-card']}>
            <h2>Goal Breakdown</h2>
            <div className={styles['goals-overview']}>
              {goals.map(goal => (
                <div key={goal.id} className={styles['goal-item']}>
                  <div className={styles['goal-header']}>
                    <h4>{goal.title}</h4>
                    <span className={styles['goal-status']}>{goal.status}</span>
                  </div>
                  <div className={styles['goal-progress-bar']}>
                    <div
                      className={styles['progress-fill']}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className={styles['progress-text']}>{goal.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habit Consistency Chart */}
        {habits.length > 0 && (
          <div className={styles['section-card']}>
            <h2>Habit Consistency</h2>
            <div className={styles['habits-chart']}>
              {habits.map(habit => {
                const completed = habit.weeklyProgress.filter(d => d).length;
                const consistency = (completed / 7) * 100;
                return (
                  <div key={habit.id} className={styles['habit-row']}>
                    <span className={styles['habit-name']}>{habit.name}</span>
                    <div className={styles['consistency-bar']}>
                      <div
                        className={styles['consistency-fill']}
                        style={{ width: `${consistency}%` }}
                      ></div>
                    </div>
                    <span className={styles['consistency-percent']}>{Math.round(consistency)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Life Areas Radar */}
        {areas.length > 0 && (
          <div className={styles['section-card']}>
            <h2>Life Areas Balance</h2>
            <div className={styles['areas-balance']}>
              <div className={styles['radar-container']}>
                <svg className={styles['radar-svg']} viewBox="0 0 300 300">
                  {/* Grid circles */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <circle
                      key={`circle-${i}`}
                      cx="150"
                      cy="150"
                      r={i * 25}
                      fill="none"
                      stroke="#e8e8e8"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Axes */}
                  {areas.map((area, idx) => {
                    const angle = (idx / areas.length) * Math.PI * 2 - Math.PI / 2;
                    const x = 150 + 125 * Math.cos(angle);
                    const y = 150 + 125 * Math.sin(angle);
                    return (
                      <line
                        key={`axis-${idx}`}
                        x1="150"
                        y1="150"
                        x2={x}
                        y2={y}
                        stroke="#e8e8e8"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Data polygon */}
                  <polygon
                    points={areas
                      .map((area, idx) => {
                        const angle = (idx / areas.length) * Math.PI * 2 - Math.PI / 2;
                        const radius = (area.currentLevel / 10) * 125;
                        const x = 150 + radius * Math.cos(angle);
                        const y = 150 + radius * Math.sin(angle);
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="#a8b5ff"
                    fillOpacity="0.3"
                    stroke="#a8b5ff"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className={styles['areas-legend']}>
                {areas.map(area => (
                  <div key={area.name} className={styles['legend-item']}>
                    <span className={styles['legend-icon']}>{area.icon}</span>
                    <span className={styles['legend-name']}>{area.name}</span>
                    <span className={styles['legend-value']}>{area.currentLevel}/10</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monthly Summary */}
        <div className={styles['section-card']}>
          <h2>Monthly Summary</h2>
          <div className={styles['summary-grid']}>
            <div className={styles['summary-item']}>
              <p className={styles['summary-label']}>Total Goals</p>
              <p className={styles['summary-number']}>{goals.length}</p>
            </div>
            <div className={styles['summary-item']}>
              <p className={styles['summary-label']}>Goals in Progress</p>
              <p className={styles['summary-number']}>
                {goals.filter(g => g.status === 'In Progress').length}
              </p>
            </div>
            <div className={styles['summary-item']}>
              <p className={styles['summary-label']}>Total Habits</p>
              <p className={styles['summary-number']}>{habits.length}</p>
            </div>
            <div className={styles['summary-item']}>
              <p className={styles['summary-label']}>Avg Daily Streaks</p>
              <p className={styles['summary-number']}>
                {habits.length > 0
                  ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
