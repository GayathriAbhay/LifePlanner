import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FloatingShapes from '../components/FloatingShapes';
import styles from './auth.module.css';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate signup delay
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.name
      }));
      localStorage.setItem('isLoggedIn', 'true');

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
            <h2>Start Your Journey</h2>
            <p>Design your dream life today</p>
          </div>

          <form onSubmit={handleSubmit} className={styles['auth-form']}>
            {error && (
              <div className={styles['error-message']}>
                {error}
              </div>
            )}

            <div className={styles['form-group']}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className={styles['terms']}>
              <input type="checkbox" id="terms" disabled={isLoading} required />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link href="/terms">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className={styles['auth-divider']}>
            <span>or sign up with</span>
          </div>

          <div className={styles['oauth-buttons']}>
            <button className={styles['oauth-btn']}>Google</button>
            <button className={styles['oauth-btn']}>Apple</button>
          </div>

          <div className={styles['auth-footer']}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles['auth-link']}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
