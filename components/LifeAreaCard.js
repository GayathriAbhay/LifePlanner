import ProgressRing from './ProgressRing';
import styles from './LifeAreaCard.module.css';

const areaColors = {
  'Career & Skills': '#a8b5ff',
  'Health & Fitness': '#ffb8c1',
  'Finance': '#c1ffb8',
  'Learning': '#ffd8b8',
  'Relationships': '#ffb8e5',
  'Creativity': '#b8e5ff',
  'Lifestyle': '#d8b8ff',
};

export default function LifeAreaCard({ area, onUpdate }) {
  const color = areaColors[area.name] || '#a8b5ff';

  return (
    <div className={styles['life-area-card']}>
      <div className={styles['card-header']}>
        <div>
          <h3 className={styles['area-name']}>{area.icon} {area.name}</h3>
          <p className={styles['area-vision']}>{area.vision}</p>
        </div>
      </div>

      <div className={styles['card-content']}>
        <div className={styles['level-section']}>
          <label htmlFor={`level-${area.name}`} className={styles['level-label']}>
            Current Level
          </label>
          <div className={styles['level-wrapper']}>
            <input
              id={`level-${area.name}`}
              type="range"
              min="1"
              max="10"
              value={area.currentLevel}
              onChange={(e) => onUpdate(area.name, { ...area, currentLevel: parseInt(e.target.value) })}
              className={styles['level-slider']}
              style={{ '--slider-fill': color }}
            />
            <span className={styles['level-value']}>{area.currentLevel}/10</span>
          </div>
        </div>

        <div className={styles['improvement-section']}>
          <label htmlFor={`plan-${area.name}`} className={styles['plan-label']}>
            Improvement Plan
          </label>
          <textarea
            id={`plan-${area.name}`}
            className={styles['plan-textarea']}
            value={area.improvementPlan}
            onChange={(e) => onUpdate(area.name, { ...area, improvementPlan: e.target.value })}
            placeholder="What steps will you take to improve this area?"
            rows={3}
          />
        </div>
      </div>

      <div className={styles['ring-container']}>
        <ProgressRing percentage={area.currentLevel * 10} label={area.name} size="sm" color={color} />
      </div>
    </div>
  );
}
