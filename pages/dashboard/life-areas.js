import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LifeAreaCard from '../../components/LifeAreaCard';
import styles from './life-areas.module.css';

const defaultAreas = [
  {
    name: 'Career & Skills',
    icon: '💼',
    vision: 'Build expertise in AI and design, leading projects that make impact',
    currentLevel: 6,
    improvementPlan: 'Learn 1 new AI framework monthly, contribute to open source projects',
  },
  {
    name: 'Health & Fitness',
    icon: '💪',
    vision: 'Strong, energetic, and healthy with a consistent exercise routine',
    currentLevel: 5,
    improvementPlan: 'Workout 4 times a week, focus on strength training and cardio',
  },
  {
    name: 'Finance',
    icon: '💰',
    vision: 'Financial freedom with multiple income streams and solid savings',
    currentLevel: 4,
    improvementPlan: 'Save 30% of income monthly, invest in high-yield opportunities',
  },
  {
    name: 'Learning',
    icon: '🧠',
    vision: 'Continuous growth through reading, courses, and practical projects',
    currentLevel: 7,
    improvementPlan: 'Read 1 book per month, take 1 online course quarterly',
  },
  {
    name: 'Relationships',
    icon: '❤️',
    vision: 'Deep, meaningful connections with family and friends',
    currentLevel: 6,
    improvementPlan: 'Weekly calls with loved ones, monthly meet-ups with friends',
  },
  {
    name: 'Creativity',
    icon: '🎨',
    vision: 'Express creativity through design, writing, and art',
    currentLevel: 5,
    improvementPlan: 'Create 1 design project weekly, journaling 3 times per week',
  },
  {
    name: 'Lifestyle',
    icon: '🌍',
    vision: 'Travel, experience new cultures, and live intentionally',
    currentLevel: 4,
    improvementPlan: 'Plan 1 trip per quarter, experience local culture monthly',
  },
];

export default function LifeAreas() {
  const [areas, setAreas] = useState(defaultAreas);

  useEffect(() => {
    const savedAreas = localStorage.getItem('lifeAreas');
    if (savedAreas) {
      setAreas(JSON.parse(savedAreas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lifeAreas', JSON.stringify(areas));
  }, [areas]);

  const handleAreaUpdate = (areaName, updatedArea) => {
    setAreas(areas.map(area => area.name === areaName ? updatedArea : area));
  };

  const overallBalance = Math.round(areas.reduce((sum, area) => sum + area.currentLevel, 0) / areas.length);

  return (
    <DashboardLayout activeSection="life-areas">
      <div className={styles['life-areas-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>🗺️ Life Areas</h1>
            <p>Balance across all important areas of your life</p>
          </div>
        </div>

        <div className={styles['balance-summary']}>
          <div className={styles['summary-card']}>
            <div className={styles['summary-stat']}>
              <p className={styles['summary-label']}>Overall Life Balance</p>
              <p className={styles['summary-value']}>{overallBalance}/10</p>
            </div>
            <div className={styles['summary-bars']}>
              {areas.map((area, idx) => (
                <div key={idx} className={styles['bar-item']}>
                  <div className={styles['bar-label']}>{area.icon}</div>
                  <div className={styles['bar-fill']} style={{ height: `${area.currentLevel * 10}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles['areas-grid']}>
          {areas.map((area) => (
            <LifeAreaCard
              key={area.name}
              area={area}
              onUpdate={handleAreaUpdate}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
