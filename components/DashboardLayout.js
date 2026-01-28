import { useState } from 'react';
import Link from 'next/link';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children, activeSection }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { id: 'vision-boards', label: 'Vision Boards', href: '/dashboard/vision-boards', icon: '🎨' },
    { id: 'travel-map', label: 'Travel Map', href: '/dashboard/travel-map', icon: '🗺️' },
    { id: 'habits', label: 'Habits', href: '/dashboard/habits', icon: '✨' },
    { id: 'letters', label: 'Future Letters', href: '/dashboard/letters', icon: '💌' },
    { id: 'money-goals', label: 'Money Goals', href: '/dashboard/money-goals', icon: '💰' },
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
              <p className={styles['user-name']}>Welcome</p>
              <a href="#" className={styles['logout-link']}>Logout</a>
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
