import styles from './ProgressBar.module.css';

export default function ProgressBar({ percentage, label, color = 'var(--color-accent-blue)' }) {
  return (
    <div className={styles['progress-container']}>
      {label && <p className={styles['progress-label']}>{label}</p>}
      <div className={styles['progress-bar-wrapper']}>
        <div
          className={styles['progress-bar-fill']}
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        ></div>
      </div>
      <p className={styles['progress-text']}>{percentage}%</p>
    </div>
  );
}
