import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './travel-map.module.css';

export default function TravelMap() {
  const [destinations, setDestinations] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [newDestination, setNewDestination] = useState({ name: '', notes: '', status: 'wishlist' });

  const handleAddDestination = () => {
    if (newDestination.name.trim()) {
      const randomX = Math.random() * 80 + 10;
      const randomY = Math.random() * 60 + 20;
      const destination = {
        id: destinations.length + 1,
        ...newDestination,
        x: randomX + '%',
        y: randomY + '%',
      };
      setDestinations([...destinations, destination]);
      setNewDestination({ name: '', notes: '', status: 'wishlist' });
      setShowAddDestination(false);
    }
  };

  const handleToggleStatus = (id) => {
    setDestinations(
      destinations.map(dest =>
        dest.id === id
          ? { ...dest, status: dest.status === 'wishlist' ? 'visited' : 'wishlist' }
          : dest
      )
    );
  };

  const handleDeleteDestination = (id) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
  };

  const filteredDestinations = filterStatus === 'all'
    ? destinations
    : destinations.filter(dest => dest.status === filterStatus);

  const wishedCount = destinations.filter(d => d.status === 'wishlist').length;
  const visitedCount = destinations.filter(d => d.status === 'visited').length;

  return (
    <DashboardLayout activeSection="travel-map">
      <div className={styles['travel-content']}>
        {/* Header */}
        <div className={styles['travel-header']}>
          <div>
            <h2>Travel Goals Map</h2>
            <p>Pin your dream destinations and track your journeys</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddDestination(true)}>
            + Add Destination
          </button>
        </div>

        {/* Stats */}
        <div className={styles['stats']}>
          <div className="card">
            <p className={styles['stat-label']}>Wishlist Destinations</p>
            <p className={styles['stat-number']}>{wishedCount}</p>
          </div>
          <div className="card">
            <p className={styles['stat-label']}>Places Visited</p>
            <p className={styles['stat-number']}>{visitedCount}</p>
          </div>
          <div className="card">
            <p className={styles['stat-label']}>Total Destinations</p>
            <p className={styles['stat-number']}>{destinations.length}</p>
          </div>
        </div>

        {/* Add Destination Modal */}
        {showAddDestination && (
          <div className={styles['modal-overlay']} onClick={() => setShowAddDestination(false)}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <h3>Add Travel Destination</h3>
              <div className={styles['form-group']}>
                <label>Destination Name</label>
                <input
                  type="text"
                  placeholder="e.g., Bali, Indonesia"
                  value={newDestination.name}
                  onChange={(e) =>
                    setNewDestination({ ...newDestination, name: e.target.value })
                  }
                  autoFocus
                />
              </div>
              <div className={styles['form-group']}>
                <label>Notes</label>
                <textarea
                  placeholder="What excites you about this destination?"
                  value={newDestination.notes}
                  onChange={(e) =>
                    setNewDestination({ ...newDestination, notes: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div className={styles['form-group']}>
                <label>Status</label>
                <select
                  value={newDestination.status}
                  onChange={(e) =>
                    setNewDestination({ ...newDestination, status: e.target.value })
                  }
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="visited">Visited</option>
                </select>
              </div>
              <div className={styles['modal-buttons']}>
                <button className="btn btn-ghost" onClick={() => setShowAddDestination(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddDestination}>
                  Add to Map
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className={styles['filter']}>
          <button
            className={`${styles['filter-btn']} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({destinations.length})
          </button>
          <button
            className={`${styles['filter-btn']} ${filterStatus === 'wishlist' ? styles.active : ''}`}
            onClick={() => setFilterStatus('wishlist')}
          >
            💭 Wishlist ({wishedCount})
          </button>
          <button
            className={`${styles['filter-btn']} ${filterStatus === 'visited' ? styles.active : ''}`}
            onClick={() => setFilterStatus('visited')}
          >
            ✅ Visited ({visitedCount})
          </button>
        </div>

        {/* Main Grid */}
        <div className={styles['content-grid']}>
          {/* Interactive Map */}
          <div className={`card ${styles['map-card']}`}>
            <div className={styles['map-container']}>
              <svg className={styles['world-map']} viewBox="0 0 1000 600">
                {/* Simple world map background */}
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={getComputedStyle(document.documentElement).getPropertyValue('--color-pastel-blue')} />
                    <stop offset="100%" stopColor={getComputedStyle(document.documentElement).getPropertyValue('--color-light-sage')} />
                  </linearGradient>
                </defs>
                <rect width="1000" height="600" fill="url(#mapGradient)" opacity="0.3" />
                <text x="50" y="50" fontSize="30" fill="var(--color-medium-gray)" opacity="0.5">
                  🌍 World Map
                </text>
              </svg>

              {/* Destination Pins */}
              <div className={styles['pins-container']}>
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className={`${styles['pin']} ${styles[`pin-${dest.status}`]}`}
                    style={{ left: dest.x, top: dest.y }}
                    title={dest.name}
                  >
                    <div className={styles['pin-marker']}>
                      {dest.status === 'visited' ? '🚩' : '📍'}
                    </div>
                    <div className={styles['pin-popup']}>
                      <h4>{dest.name}</h4>
                      {dest.notes && <p>{dest.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Destinations List */}
          <div className={styles['destinations-list']}>
            <h3>Your Destinations</h3>
            <div className={styles['list-items']}>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest) => (
                  <div key={dest.id} className={styles['list-item']}>
                    <div className={styles['item-info']}>
                      <h4>{dest.name}</h4>
                      {dest.notes && <p>{dest.notes}</p>}
                      <div className={styles['item-status']}>
                        <span className={`${styles['status-badge']} ${styles[`status-${dest.status}`]}`}>
                          {dest.status === 'visited' ? '✅ Visited' : '💭 Wishlist'}
                        </span>
                      </div>
                    </div>
                    <div className={styles['item-actions']}>
                      <button
                        className={styles['toggle-btn']}
                        onClick={() => handleToggleStatus(dest.id)}
                        title={`Mark as ${dest.status === 'visited' ? 'wishlist' : 'visited'}`}
                      >
                        {dest.status === 'visited' ? '↩️' : '✔️'}
                      </button>
                      <button
                        className={styles['delete-btn']}
                        onClick={() => handleDeleteDestination(dest.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles['empty-state']}>No destinations in this category</p>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className={`card ${styles['tips-card']}`}>
          <h3>🌏 Travel Planning Tips</h3>
          <ul>
            <li>Add destinations to your wishlist and set budget goals for each</li>
            <li>Mark places as visited once you travel there</li>
            <li>Add notes about what makes each destination special to you</li>
            <li>Use this as motivation to plan your next adventure</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
