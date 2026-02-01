import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './planner.module.css';

const priorityColors = {
  'High': '#ff7f7f',
  'Medium': '#ffd700',
  'Low': '#90ee90',
};

const defaultTasks = [
  {
    id: 1,
    title: 'Review AI basics course',
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    linkedGoal: 'Master AI & ML',
  },
  {
    id: 2,
    title: 'Sketch new UI component',
    priority: 'Medium',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    linkedGoal: 'Design 10 UI Kits',
  },
  {
    id: 3,
    title: 'Morning workout',
    priority: 'High',
    date: new Date().toISOString().split('T')[0],
    completed: true,
    linkedGoal: 'Stay Healthy',
  },
];

export default function Planner() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  useEffect(() => {
    const savedTasks = localStorage.getItem('plannerTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(t => t.date === selectedDate);
  const completedTasks = filteredTasks.filter(t => t.completed).length;

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setTasks([...tasks, {
      id: Date.now(),
      title: newTask,
      priority: selectedPriority,
      date: selectedDate,
      completed: false,
      linkedGoal: '',
    }]);

    setNewTask('');
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const getWeekDates = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d.toISOString().split('T')[0];
    });
  };

  const weekDates = getWeekDates();

  return (
    <DashboardLayout activeSection="planner">
      <div className={styles['planner-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>📅 Planner</h1>
            <p>Plan your day and week with intention</p>
          </div>
        </div>

        <div className={styles['planner-grid']}>
          {/* Daily Tasks */}
          <div className={styles['daily-section']}>
            <div className={styles['section-header']}>
              <h2>Today's Tasks</h2>
              <div className={styles['progress-info']}>
                <span className={styles['completed-count']}>
                  {completedTasks} of {filteredTasks.length} completed
                </span>
              </div>
            </div>

            <div className={styles['add-task']}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Add a new task..."
                className={styles['task-input']}
              />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={styles['priority-select']}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button onClick={handleAddTask} className="btn btn-primary btn-sm">
                Add
              </button>
            </div>

            <div className={styles['tasks-list']}>
              {filteredTasks.length === 0 ? (
                <p className={styles['empty-msg']}>No tasks for today. Enjoy your day! 🎉</p>
              ) : (
                filteredTasks.map(task => (
                  <div
                    key={task.id}
                    className={`${styles['task-item']} ${task.completed ? styles.completed : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className={styles['task-checkbox']}
                    />
                    <div className={styles['task-content']}>
                      <p className={styles['task-title']}>{task.title}</p>
                      {task.linkedGoal && (
                        <span className={styles['linked-goal']}>📎 {task.linkedGoal}</span>
                      )}
                    </div>
                    <span
                      className={styles['priority-badge']}
                      style={{ background: priorityColors[task.priority] }}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className={styles['delete-btn']}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weekly Overview */}
          <div className={styles['weekly-section']}>
            <div className={styles['section-header']}>
              <h2>Weekly Overview</h2>
            </div>

            <div className={styles['week-grid']}>
              {weekDates.map(date => {
                const dayTasks = tasks.filter(t => t.date === date);
                const completed = dayTasks.filter(t => t.completed).length;
                const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
                const isSelected = date === selectedDate;

                return (
                  <button
                    key={date}
                    className={`${styles['day-card']} ${isSelected ? styles.selected : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <p className={styles['day-name']}>{dayName}</p>
                    <p className={styles['day-date']}>{new Date(date + 'T00:00:00').getDate()}</p>
                    <div className={styles['day-progress']}>
                      <div className={styles['progress-ring']}>
                        <p>{completed}/{dayTasks.length}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles['stats-cards']}>
              <div className={styles['stat-card']}>
                <p className={styles['stat-label']}>Total Tasks</p>
                <p className={styles['stat-value']}>{tasks.length}</p>
              </div>
              <div className={styles['stat-card']}>
                <p className={styles['stat-label']}>Completed</p>
                <p className={styles['stat-value']}>{tasks.filter(t => t.completed).length}</p>
              </div>
              <div className={styles['stat-card']}>
                <p className={styles['stat-label']}>High Priority</p>
                <p className={styles['stat-value']}>{tasks.filter(t => t.priority === 'High').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
