import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [isPremium, setIsPremium] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const premiumStatus = localStorage.getItem('isPremium') === 'true';
    setUserName(user.name || 'User');
    setIsPremium(premiumStatus);
  }, []);

  const stats = [
    { label: 'Vision Boards', value: '3', icon: '🎨' },
    { label: 'Habits Tracked', value: '7', icon: '✨' },
    { label: 'Travel Destinations', value: '12', icon: '🗺️' },
    { label: 'Future Letters', value: '5', icon: '💌' },
  ];

  const recentItems = [
    { title: 'Career Vision Board', category: 'Vision Board', date: 'Today' },
    { title: 'Morning Routine', category: 'Habit', date: '5 days streak' },
    { title: 'Japan Trip Fund', category: 'Money Goal', date: '45% complete' },
  ];

  return (
    <DashboardLayout activeSection="dashboard">
      <div className={styles['dashboard-content']}>
        {/* Welcome Section */}
        <div className={styles['welcome-section']}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Welcome back, {userName}! 👋</h2>
              <p>You're building your future one step at a time.</p>
            </div>
            {isPremium && (
              <div style={{
                background: 'linear-gradient(135deg, #c9b8e0 0%, #a8c5e0 100%)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                ⭐ Premium Member
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles['stats-grid']}>
          {stats.map((stat, idx) => (
            <div key={idx} className={`card ${styles['stat-card']}`}>
              <div className={styles['stat-icon']}>{stat.icon}</div>
              <div className={styles['stat-content']}>
                <p className={styles['stat-label']}>{stat.label}</p>
                <p className={styles['stat-value']}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className={styles['quick-actions']}>
          <h3>Quick Actions</h3>
          <div className={styles['action-buttons']}>
            <button className="btn btn-primary">New Vision Board</button>
            <button className="btn btn-secondary">Log Habit</button>
            <button className="btn btn-secondary">Add Goal</button>
            <button className="btn btn-secondary">Write Letter</button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles['recent-activity']}>
          <h3>Recent Activity</h3>
          <div className={styles['activity-list']}>
            {recentItems.map((item, idx) => (
              <div key={idx} className={styles['activity-item']}>
                <div className={styles['activity-info']}>
                  <p className={styles['activity-title']}>{item.title}</p>
                  <span className={styles['activity-category']}>{item.category}</span>
                </div>
                <span className={styles['activity-date']}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className={`card ${styles['quote-card']}`}>
          <p className={styles['quote-text']}>
            "Dreams are just goals without deadlines. You're turning yours into reality."
          </p>
          <p className={styles['quote-author']}>— DreamLife</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
