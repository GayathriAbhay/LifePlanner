import { useState } from 'react';
import Link from 'next/link';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children, activeSection }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Life Dashboard', href: '/dashboard', icon: '🏠' },
    { id: 'dream-goals', label: 'Dream Goals', href: '/dashboard/dream-goals', icon: '🎯' },
    { id: 'life-areas', label: 'Life Areas', href: '/dashboard/life-areas', icon: '🗺️' },
    { id: 'planner', label: 'Planner', href: '/dashboard/planner', icon: '📅' },
    { id: 'habits', label: 'Habits', href: '/dashboard/habits', icon: '🔥' },
    { id: 'reflection', label: 'Mind & Reflection', href: '/dashboard/reflection', icon: '🧠' },
    { id: 'progress', label: 'Progress Tracker', href: '/dashboard/progress', icon: '📊' },
    { id: 'vision-board', label: 'Vision Board', href: '/dashboard/vision-board', icon: '🖼️' },
    { id: 'templates', label: 'Templates', href: '/dashboard/templates', icon: '⚙️' },
    { id: 'settings', label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  return (
    <div className={styles['dashboard-container']}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles['sidebar-header']}>
          <Link href="/dashboard" className={styles['sidebar-logo']}>
            <span>✨</span>
            <span>DreamLife</span>
          </Link>
          <button
            className={styles['close-btn']}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className={styles['sidebar-nav']}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles['nav-item']} ${activeSection === item.id ? styles.active : ''}`}
            >
              <span className={styles['nav-icon']}>{item.icon}</span>
              <span className={styles['nav-label']}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles['sidebar-footer']}>
          <div className={styles['user-profile']}>
            <div className={styles['user-avatar']}>👤</div>
            <div className={styles['user-info']}>
              <p className={styles['user-name']}>
                {typeof window !== 'undefined' && localStorage.getItem('user')
                  ? JSON.parse(localStorage.getItem('user')).name || 'User'
                  : 'User'}
              </p>
              {typeof window !== 'undefined' && localStorage.getItem('isPremium') === 'true' && (
                <p style={{ fontSize: '0.75rem', color: '#c9b8e0', fontWeight: 'bold', margin: '0.25rem 0 0' }}>
                  ⭐ Premium
                </p>
              )}
              <a href="#" className={styles['logout-link']} onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.href = '/';
              }}>Logout</a>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className={styles['sidebar-overlay']}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className={styles['main-content']}>
        <header className={styles['content-header']}>
          <button
            className={styles['menu-btn']}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className={styles['header-title']}>
            <h1>DreamLife Dashboard</h1>
          </div>
          <div className={styles['header-spacer']}></div>
        </header>

        <div className={styles['content-area']}>
          {children}
        </div>
      </main>
    </div>
  );
}
