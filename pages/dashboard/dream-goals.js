import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import GoalCard from '../../components/GoalCard';
import styles from './dream-goals.module.css';

const defaultGoals = [
  {
    id: 1,
    title: 'Master AI & ML',
    category: 'AI',
    deadline: '2025-12-31',
    why: 'To build innovative solutions and stay ahead in tech',
    progress: 45,
    status: 'In Progress',
    milestones: [
      { text: 'Complete Python fundamentals', completed: true },
      { text: 'Learn machine learning basics', completed: true },
      { text: 'Build 3 ML projects', completed: false },
      { text: 'Get ML certification', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Design 10 UI Kits',
    category: 'Design',
    deadline: '2025-06-30',
    why: 'Build a portfolio of design work and income stream',
    progress: 30,
    status: 'In Progress',
    milestones: [
      { text: 'Complete 2 UI kits', completed: true },
      { text: 'Get 500+ downloads', completed: false },
      { text: 'Create tutorial series', completed: false },
    ],
  },
];

export default function DreamGoals() {
  const [goals, setGoals] = useState(defaultGoals);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Career',
    deadline: '',
    why: '',
    progress: 0,
    status: 'Dreaming',
    milestones: [],
  });

  useEffect(() => {
    const savedGoals = localStorage.getItem('dreamGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dreamGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = () => {
    if (!formData.title) return;

    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...formData, id: editingGoal.id } : g));
      setEditingGoal(null);
    } else {
      setGoals([...goals, { ...formData, id: Date.now() }]);
    }

    setFormData({
      title: '',
      category: 'Career',
      deadline: '',
      why: '',
      progress: 0,
      status: 'Dreaming',
      milestones: [],
    });
    setShowForm(false);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData(goal);
    setShowForm(true);
  };

  const handleDelete = (goalId) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(g => g.id !== goalId));
    }
  };

  return (
    <DashboardLayout activeSection="dream-goals">
      <div className={styles['dream-goals-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>🎯 Dream Goals</h1>
            <p>Define your big dreams and break them into actionable milestones</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingGoal(null);
              setFormData({
                title: '',
                category: 'Career',
                deadline: '',
                why: '',
                progress: 0,
                status: 'Dreaming',
                milestones: [],
              });
              setShowForm(true);
            }}
          >
            + Add Dream Goal
          </button>
        </div>

        {showForm && (
          <div className={styles['form-container']}>
            <div className={styles['form-card']}>
              <h2>{editingGoal ? 'Edit Goal' : 'Create a New Dream Goal'}</h2>

              <div className={styles['form-group']}>
                <label>Goal Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What's your dream?"
                />
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Career</option>
                    <option>Health</option>
                    <option>Finance</option>
                    <option>Personal Growth</option>
                    <option>Design</option>
                    <option>AI</option>
                    <option>Relationships</option>
                    <option>Learning</option>
                  </select>
                </div>

                <div className={styles['form-group']}>
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>

                <div className={styles['form-group']}>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>Dreaming</option>
                    <option>In Progress</option>
                    <option>Achieved</option>
                  </select>
                </div>
              </div>

              <div className={styles['form-group']}>
                <label>Why This Matters</label>
                <textarea
                  value={formData.why}
                  onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                  placeholder="What's the deeper reason for this goal?"
                  rows={3}
                />
              </div>

              <div className={styles['form-group']}>
                <label>Progress ({formData.progress}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                />
              </div>

              <div className={styles['form-actions']}>
                <button className="btn btn-primary" onClick={handleAddGoal}>
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </button>
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles['goals-grid']}>
          {goals.length === 0 ? (
            <div className={styles['empty-state']}>
              <p>No dream goals yet. Create one to start building your dream life! 🚀</p>
            </div>
          ) : (
            goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
