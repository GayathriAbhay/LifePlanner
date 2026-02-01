import styles from './ProgressRing.module.css';

export default function ProgressRing({ percentage, label, size = 'md', color = '#a8b5ff' }) {
  const radius = size === 'sm' ? 30 : size === 'lg' ? 50 : 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles['ring-container']}>
      <svg width={radius * 2 + 20} height={radius * 2 + 20} className={styles['ring-svg']}>
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          className={styles['ring-background']}
        />
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          className={styles['ring-fill']}
          style={{
            stroke: color,
            strokeDashoffset,
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className={styles['ring-content']}>
        <p className={styles['ring-percentage']}>{percentage}%</p>
        {label && <p className={styles['ring-label']}>{label}</p>}
      </div>
    </div>
  );
}
