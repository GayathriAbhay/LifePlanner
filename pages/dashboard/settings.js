import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './settings.module.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    name: 'User Name',
    email: 'user@example.com',
    theme: 'light',
    notifications: true,
    emailUpdates: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(settings);

  const handleSaveSettings = () => {
    setSettings(editForm);
    setIsEditing(false);
  };

  return (
    <DashboardLayout activeSection="settings">
      <div className={styles['settings-content']}>
        {/* Header */}
        <div className={styles['settings-header']}>
          <h2>Settings</h2>
          <p>Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className={`card ${styles['profile-card']}`}>
          <div className={styles['profile-header']}>
            <div className={styles['profile-avatar']}>👤</div>
            <div className={styles['profile-info']}>
              <h3>{settings.name}</h3>
              <p>{settings.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => {
                setEditForm(settings);
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          ) : (
            <div className={styles['edit-form']}>
              <div className={styles['form-group']}>
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div className={styles['form-group']}>
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className={styles['edit-buttons']}>
                <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveSettings}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preferences */}
        <div className={`card ${styles['preferences-card']}`}>
          <h3>Preferences</h3>

          <div className={styles['preference-item']}>
            <div className={styles['preference-info']}>
              <p className={styles['preference-title']}>Theme</p>
              <p className={styles['preference-desc']}>Choose your preferred color theme</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
              className={styles['preference-select']}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className={styles['preference-item']}>
            <div className={styles['preference-info']}>
              <p className={styles['preference-title']}>Push Notifications</p>
              <p className={styles['preference-desc']}>Get reminders for your habits and goals</p>
            </div>
            <label className={styles['toggle']}>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              />
              <span className={styles['toggle-slider']}></span>
            </label>
          </div>

          <div className={styles['preference-item']}>
            <div className={styles['preference-info']}>
              <p className={styles['preference-title']}>Email Updates</p>
              <p className={styles['preference-desc']}>Receive weekly progress reports</p>
            </div>
            <label className={styles['toggle']}>
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={(e) => setSettings({ ...settings, emailUpdates: e.target.checked })}
              />
              <span className={styles['toggle-slider']}></span>
            </label>
          </div>
        </div>

        {/* Account Section */}
        <div className={`card ${styles['account-card']}`}>
          <h3>Account</h3>

          <button className={`btn btn-secondary ${styles['account-btn']}`}>
            Change Password
          </button>
          <button className={`btn btn-secondary ${styles['account-btn']}`}>
            Export My Data
          </button>
          <button className={`btn btn-ghost ${styles['account-btn']}`}>
            Delete Account
          </button>
        </div>

        {/* About Section */}
        <div className={`card ${styles['about-card']}`}>
          <h3>About DreamLife</h3>
          <p>
            DreamLife Planner is a digital platform designed to help students and young adults
            turn their dreams into actionable plans.
          </p>
          <p>
            <strong>Version:</strong> 1.0.0
          </p>
          <div className={styles['links']}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Support</a>
            <a href="#">Changelog</a>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className={`card ${styles['quote-card']}`}>
          <p className={styles['quote']}>
            "Your dream life doesn't just happen—you build it, one goal at a time."
          </p>
          <p className={styles['quote-author']}>— DreamLife</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
