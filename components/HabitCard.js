import ProgressRing from './ProgressRing';
import styles from './HabitCard.module.css';

export default function HabitCard({ habit, onToggle, onDelete }) {
  const daysInWeek = 7;
  const completedDays = habit.weeklyProgress.filter(day => day).length;
  const consistency = Math.round((completedDays / daysInWeek) * 100);
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={styles['habit-card']}>
      <div className={styles['habit-header']}>
        <div className={styles['habit-info']}>
          <h3 className={styles['habit-name']}>{habit.name}</h3>
          <p className={styles['habit-category']}>{habit.category}</p>
        </div>
        <button onClick={() => onDelete(habit.id)} className={styles['delete-btn']}>🗑️</button>
      </div>

      <div className={styles['streak-section']}>
        <div className={styles['streak-stat']}>
          <p className={styles['streak-label']}>Current Streak</p>
          <p className={styles['streak-value']}>🔥 {habit.streak} days</p>
        </div>
        <ProgressRing percentage={consistency} label="This Week" size="sm" color="#ff9a76" />
      </div>

      <div className={styles['weekly-grid']}>
        <p className={styles['week-label']}>This Week</p>
        <div className={styles['week-days']}>
          {habit.weeklyProgress.map((completed, idx) => (
            <button
              key={idx}
              className={`${styles['day-box']} ${completed ? styles.completed : ''}`}
              onClick={() => onToggle(habit.id, idx)}
              title={dayLabels[idx]}
            >
              {dayLabels[idx]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
