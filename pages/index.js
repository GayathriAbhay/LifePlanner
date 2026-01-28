import Layout from '../components/Layout';
import FloatingShapes from '../components/FloatingShapes';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.hero}>
        <FloatingShapes />
        <div className={styles['hero-content']}>
          <h1 className={styles['hero-title']}>Design Your Dream Life</h1>
          <p className={styles['hero-subtitle']}>
            Turn your goals, visions, and future self into a clear plan.
          </p>
          <div className={styles['hero-buttons']}>
            <button className="btn btn-primary btn-lg">Start Planning Free</button>
            <button className="btn btn-secondary btn-lg">See How It Works</button>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className={styles.features}>
        <div className="container">
          <div className={styles['features-header']}>
            <h2>Everything You Need to Dream Bigger</h2>
            <p>Create vision boards, track habits, plan travel, and build your future—all in one beautiful space.</p>
          </div>

          <div className={styles['features-grid']}>
            {/* Feature 1 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>🎨</div>
              <h3>Vision Board Creator</h3>
              <p>Drag & drop images, quotes, and goals. Organize by mood and category to visualize your future.</p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>🗺️</div>
              <h3>Travel Goals Map</h3>
              <p>Pin your dream destinations on an interactive world map. Track wishlist vs. visited places.</p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>✨</div>
              <h3>Habit Tracker</h3>
              <p>Beautiful streak tracking with progress rings. Watch your consistency build momentum.</p>
            </div>

            {/* Feature 4 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>💌</div>
              <h3>Future Self Letters</h3>
              <p>Write messages to your future you and unlock them on a date you set. Get inspired by your past self.</p>
            </div>

            {/* Feature 5 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>💰</div>
              <h3>Money Goal Tracker</h3>
              <p>Visualize your savings progress with aesthetic charts. Track travel funds, dream setups, and more.</p>
            </div>

            {/* Feature 6 */}
            <div className="card card-hover">
              <div className={styles['feature-icon']}>🎯</div>
              <h3>Goal Dashboard</h3>
              <p>Organize all your goals in one place. Set timelines, milestones, and celebrate wins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className={styles.preview}>
        <div className="container">
          <div className={styles['preview-header']}>
            <h2>Your Dream Dashboard Awaits</h2>
            <p>A calming, inspiring workspace designed to keep you motivated</p>
          </div>

          <div className={styles['preview-card']}>
            <div className={styles['preview-mockup']}>
              <div className={styles['mockup-header']}>
                <div className={styles['mockup-menu']}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={styles['mockup-body']}>
                <div className={styles['mockup-sidebar']}></div>
                <div className={styles['mockup-content']}>
                  <div className={styles['mockup-item']}></div>
                  <div className={styles['mockup-item']}></div>
                  <div className={styles['mockup-item']}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Section */}
      <section className={styles.emotional}>
        <div className="container">
          <div className={styles['emotional-content']}>
            <h2>Your Future Deserves Clarity</h2>
            <p>
              We believe that dreams without plans remain dreams. DreamLife helps you bridge the gap between aspiration and action, making your goals feel achievable and your vision tangible.
            </p>
            <div className={styles['testimonials']}>
              <div className={styles['testimonial']}>
                <p className={styles['testimonial-text']}>
                  "Small steps still count. DreamLife made me realize that progress isn't about giant leaps."
                </p>
                <p className={styles['testimonial-author']}>— Maya, 22</p>
              </div>
              <div className={styles['testimonial']}>
                <p className={styles['testimonial-text']}>
                  "Seeing my goals visualized made them feel real for the first time."
                </p>
                <p className={styles['testimonial-author']}>— Alex, 24</p>
              </div>
              <div className={styles['testimonial']}>
                <p className={styles['testimonial-text']}>
                  "You're building your future with every choice. This app reminds me of that daily."
                </p>
                <p className={styles['testimonial-author']}>— Jordan, 21</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className="container">
          <div className={styles['pricing-header']}>
            <h2>Simple, Transparent Pricing</h2>
            <p>Start free, upgrade anytime. No hidden charges.</p>
          </div>

          <div className={styles['pricing-cards']}>
            {/* Free Plan */}
            <div className="card">
              <div className={styles['pricing-badge']}>Free</div>
              <h3>Dream Starter</h3>
              <div className={styles['price']}>
                <span className={styles['price-amount']}>$0</span>
                <span className={styles['price-period']}>Forever</span>
              </div>
              <ul className={styles['features-list']}>
                <li>✓ 1 Vision Board</li>
                <li>✓ Basic Habit Tracker</li>
                <li>✓ Travel Map (basic)</li>
                <li>✓ Letter Writing (5 per month)</li>
                <li>✓ Goal Dashboard</li>
              </ul>
              <button className="btn btn-secondary btn-lg" style={{ width: '100%' }}>
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className={`card ${styles['premium-card']}`}>
              <div className={styles['pricing-badge']} style={{ background: 'linear-gradient(135deg, var(--color-accent-lavender) 0%, var(--color-accent-blue) 100%)' }}>
                Popular
              </div>
              <h3>Premium Dreamer</h3>
              <div className={styles['price']}>
                <span className={styles['price-amount']}>$7.99</span>
                <span className={styles['price-period']}>per month</span>
              </div>
              <ul className={styles['features-list']}>
                <li>✓ Unlimited Vision Boards</li>
                <li>✓ Advanced Habit Tracker with Analytics</li>
                <li>✓ Premium Map Features</li>
                <li>✓ Unlimited Letters</li>
                <li>✓ Money Goal Tracker (Advanced)</li>
                <li>✓ 50+ Premium Templates</li>
                <li>✓ Custom Themes & Backgrounds</li>
                <li>✓ Printable Planner Downloads</li>
              </ul>
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Start 14-Day Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <h2>Dreams Look Better With a Plan</h2>
          <p>Join hundreds of students building their future, today.</p>
          <button className="btn btn-primary btn-lg">Start Planning Free</button>
        </div>
      </section>
    </Layout>
  );
}
