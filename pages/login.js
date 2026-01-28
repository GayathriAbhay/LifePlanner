import Link from 'next/link';
import { useState } from 'react';
import FloatingShapes from '../components/FloatingShapes';
import styles from './auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles['auth-container']}>
      <FloatingShapes />

      <div className={styles['auth-wrapper']}>
        <Link href="/" className={styles['auth-logo']}>
          <span>DreamLife</span>
        </Link>

        <div className={styles['auth-card']}>
          <div className={styles['auth-header']}>
            <h2>Welcome Back</h2>
            <p>Continue planning your dream life</p>
          </div>

          <form onSubmit={handleSubmit} className={styles['auth-form']}>
            <div className={styles['form-group']}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <div className={styles['label-row']}>
                <label htmlFor="password">Password</label>
                <Link href="/forgot-password" className={styles['forgot-link']}>
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>

          <div className={styles['auth-divider']}>
            <span>or continue with</span>
          </div>

          <div className={styles['oauth-buttons']}>
            <button className={styles['oauth-btn']}>Google</button>
            <button className={styles['oauth-btn']}>Apple</button>
          </div>

          <div className={styles['auth-footer']}>
            <p>
              Don't have an account?{' '}
              <Link href="/signup" className={styles['auth-link']}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
