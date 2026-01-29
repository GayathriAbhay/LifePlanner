import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FloatingShapes from '../components/FloatingShapes';
import styles from './auth.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate form
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      // Check if email qualifies for premium access
      const premiumEmails = ['gayathriabhay2005@gmail.com'];
      const isPremium = premiumEmails.includes(email.toLowerCase());

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email,
        name: email.split('@')[0],
        isPremium
      }));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isPremium', isPremium ? 'true' : 'false');

      // Navigate to dashboard
      router.push('/dashboard');
    }, 500);
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
            {error && (
              <div className={styles['error-message']}>
                {error}
              </div>
            )}

            <div className={styles['form-group']}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
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
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
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
