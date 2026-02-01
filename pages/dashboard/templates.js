import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './templates.module.css';

const templates = [
  {
    id: 1,
    name: 'Life Reset Template',
    description: 'Start fresh with a comprehensive life reset plan',
    icon: '🔄',
    goals: [
      { title: 'Reflect on past year', category: 'Personal Growth', why: 'Understand what worked and what didn\'t' },
      { title: 'Define core values', category: 'Personal Growth', why: 'Align actions with what truly matters' },
      { title: 'Set quarterly goals', category: 'Career', why: 'Create a roadmap for the next 3 months' },
    ],
    habits: [
      { name: 'Daily reflection', category: 'Mindfulness' },
      { name: 'Morning journaling', category: 'Mindfulness' },
      { name: 'Weekly planning', category: 'Productivity' },
    ],
  },
  {
    id: 2,
    name: '5-Year Life Plan',
    description: 'Build a comprehensive 5-year vision for your life',
    icon: '🗺️',
    goals: [
      { title: 'Career milestone', category: 'Career', why: 'Advance in my field and gain expertise' },
      { title: 'Financial goal', category: 'Finance', why: 'Build wealth and financial security' },
      { title: 'Health transformation', category: 'Health', why: 'Be strong and fit' },
      { title: 'Relationship goals', category: 'Relationships', why: 'Build meaningful connections' },
    ],
    habits: [
      { name: 'Monthly goal review', category: 'Planning' },
      { name: 'Quarterly check-ins', category: 'Reflection' },
    ],
  },
  {
    id: 3,
    name: 'Dream Career Roadmap',
    description: 'Chart your path to your dream career',
    icon: '🎯',
    goals: [
      { title: 'Learn required skills', category: 'Learning', why: 'Get the expertise needed for my dream role' },
      { title: 'Build portfolio', category: 'Career', why: 'Showcase my best work' },
      { title: 'Network in industry', category: 'Career', why: 'Connect with mentors and peers' },
      { title: 'Land dream job', category: 'Career', why: 'Achieve my career goal' },
    ],
    habits: [
      { name: 'Study industry trends', category: 'Learning' },
      { name: 'Network weekly', category: 'Career' },
      { name: 'Side project work', category: 'Skill-building' },
    ],
  },
  {
    id: 4,
    name: 'Glow-Up Plan',
    description: 'Personal transformation in all areas of life',
    icon: '✨',
    goals: [
      { title: 'Physical transformation', category: 'Health', why: 'Feel strong and confident' },
      { title: 'Skill development', category: 'Learning', why: 'Become more capable' },
      { title: 'Mind & confidence', category: 'Personal Growth', why: 'Build self-belief' },
      { title: 'Style & presence', category: 'Lifestyle', why: 'Present my best self' },
    ],
    habits: [
      { name: 'Daily workout', category: 'Health' },
      { name: 'Skill practice', category: 'Learning' },
      { name: 'Meditation', category: 'Mindfulness' },
      { name: 'Skincare routine', category: 'Self-care' },
    ],
  },
  {
    id: 5,
    name: 'Study & Skill Growth Plan',
    description: 'Master a new skill or complete your studies',
    icon: '🎓',
    goals: [
      { title: 'Complete course', category: 'Learning', why: 'Gain comprehensive knowledge' },
      { title: 'Build projects', category: 'Learning', why: 'Apply learning practically' },
      { title: 'Master fundamentals', category: 'Learning', why: 'Build strong foundation' },
    ],
    habits: [
      { name: 'Study time daily', category: 'Learning' },
      { name: 'Practice exercises', category: 'Learning' },
      { name: 'Review notes', category: 'Learning' },
    ],
  },
  {
    id: 6,
    name: 'Fitness Transformation Plan',
    description: 'Get fit and build healthy habits',
    icon: '💪',
    goals: [
      { title: 'Build consistent routine', category: 'Health', why: 'Exercise regularly' },
      { title: 'Achieve fitness goal', category: 'Health', why: 'Reach target fitness level' },
      { title: 'Improve nutrition', category: 'Health', why: 'Eat healthier' },
    ],
    habits: [
      { name: 'Workout routine', category: 'Fitness' },
      { name: 'Meal prep', category: 'Nutrition' },
      { name: 'Track calories', category: 'Health' },
      { name: 'Sleep 8 hours', category: 'Health' },
    ],
  },
];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleUseTemplate = (template) => {
    alert(`Template "${template.name}" applied! Goals and habits have been added to your dashboard. 🎉`);
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  return (
    <DashboardLayout activeSection="templates">
      <div className={styles['templates-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>⚙️ Templates Library</h1>
            <p>Start with a proven template and customize to your goals</p>
          </div>
        </div>

        {!showPreview ? (
          <div className={styles['templates-grid']}>
            {templates.map(template => (
              <div key={template.id} className={styles['template-card']}>
                <div className={styles['template-icon']}>{template.icon}</div>
                <h3 className={styles['template-name']}>{template.name}</h3>
                <p className={styles['template-desc']}>{template.description}</p>

                <div className={styles['template-info']}>
                  <span className={styles['info-item']}>
                    🎯 {template.goals.length} goals
                  </span>
                  <span className={styles['info-item']}>
                    🔥 {template.habits.length} habits
                  </span>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowPreview(true);
                  }}
                  style={{ width: '100%' }}
                >
                  Preview & Use
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['preview-section']}>
            <button
              className={styles['back-btn']}
              onClick={() => {
                setShowPreview(false);
                setSelectedTemplate(null);
              }}
            >
              ← Back to Templates
            </button>

            <div className={styles['preview-content']}>
              <div className={styles['preview-header']}>
                <div className={styles['preview-icon']}>{selectedTemplate.icon}</div>
                <div>
                  <h1>{selectedTemplate.name}</h1>
                  <p>{selectedTemplate.description}</p>
                </div>
              </div>

              <div className={styles['preview-grid']}>
                {/* Goals */}
                <div className={styles['preview-section-card']}>
                  <h2>🎯 Included Goals</h2>
                  <div className={styles['items-list']}>
                    {selectedTemplate.goals.map((goal, idx) => (
                      <div key={idx} className={styles['item']}>
                        <p className={styles['item-title']}>{goal.title}</p>
                        <p className={styles['item-meta']}>
                          <span className={styles['badge']}>{goal.category}</span>
                        </p>
                        <p className={styles['item-desc']}>{goal.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Habits */}
                <div className={styles['preview-section-card']}>
                  <h2>🔥 Included Habits</h2>
                  <div className={styles['items-list']}>
                    {selectedTemplate.habits.map((habit, idx) => (
                      <div key={idx} className={styles['item']}>
                        <p className={styles['item-title']}>{habit.name}</p>
                        <p className={styles['item-meta']}>
                          <span className={styles['badge']}>{habit.category}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleUseTemplate(selectedTemplate)}
                style={{ width: '100%', marginTop: '2rem' }}
              >
                Use This Template
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
