import ProgressBar from './ProgressBar';
import styles from './GoalCard.module.css';

const categoryColors = {
  'Career': '#a8b5ff',
  'Health': '#ffb8c1',
  'Finance': '#c1ffb8',
  'Personal Growth': '#ffd8b8',
  'Design': '#ffb8e5',
  'AI': '#b8e5ff',
  'Relationships': '#ffc1d8',
  'Learning': '#d8b8ff',
};

export default function GoalCard({ goal, onEdit, onDelete }) {
  const categoryColor = categoryColors[goal.category] || '#a8b5ff';
  
  const statusColors = {
    'Dreaming': '#b8b8b8',
    'In Progress': '#a8b5ff',
    'Achieved': '#c1ffb8',
  };

  return (
    <div className={styles['goal-card']}>
      <div className={styles['goal-header']}>
        <div>
          <h3 className={styles['goal-title']}>{goal.title}</h3>
          <div className={styles['goal-meta']}>
            <span className={styles['category']} style={{ background: categoryColor }}>
              {goal.category}
            </span>
            <span className={styles['status']} style={{ borderColor: statusColors[goal.status] }}>
              {goal.status}
            </span>
          </div>
        </div>
        <div className={styles['goal-actions']}>
          <button onClick={() => onEdit(goal)} className={styles['icon-btn']}>✏️</button>
          <button onClick={() => onDelete(goal.id)} className={styles['icon-btn']}>🗑️</button>
        </div>
      </div>

      {goal.deadline && (
        <p className={styles['deadline']}>📅 Deadline: {goal.deadline}</p>
      )}

      {goal.why && (
        <p className={styles['why']}>{goal.why}</p>
      )}

      <ProgressBar percentage={goal.progress} color={categoryColor} />

      {goal.milestones && goal.milestones.length > 0 && (
        <div className={styles['milestones']}>
          <h4>Milestones</h4>
          <ul>
            {goal.milestones.map((milestone, idx) => (
              <li key={idx} className={milestone.completed ? styles.completed : ''}>
                {milestone.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
