import { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    category: "University",
    priority: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Build TaskFlow UI",
    category: "Development",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Review JavaScript",
    category: "Study",
    priority: "Low",
    completed: false,
  },
];

const categories = [
  "All",
  "University",
  "Development",
  "Study",
  "Personal",
];

function Stats({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  return (
    <div className="stats">
      <div className="stat-card">
        <span>Total Tasks</span>
        <strong>{tasks.length}</strong>
      </div>

      <div className="stat-card">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>

      <div className="stat-card">
        <span>Pending</span>
        <strong>{pending}</strong>
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <div className="task-title-row">
          <h3>{task.title}</h3>

          {task.completed && (
            <span className="completed-badge">
              Completed
            </span>
          )}
        </div>

        <div className="task-details">
          <span className="category-name">
            {task.category}
          </span>

          <span
            className={`priority ${task.priority.toLowerCase()}`}
          >
            {task.priority} Priority
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="complete-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    onAdd({
      title: title.trim(),
      category,
      priority,
    });

    setTitle("");
    setCategory("Development");
    setPriority("Medium");
  };

  return (
    <form
      className="add-task-form"
      onSubmit={handleSubmit}
    >
      <div className="input-group">
        <label>Task Name</label>

        <input
          type="text"
          placeholder="Enter a new task..."
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />
      </div>

      <div className="input-group">
        <label>Category</label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option>Development</option>
          <option>University</option>
          <option>Study</option>
          <option>Personal</option>
        </select>
      </div>

      <div className="input-group">
        <label>Priority</label>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value)
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button
        className="add-button"
        type="submit"
      >
        + Add Task
      </button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [showCompleted, setShowCompleted] =
    useState(true);

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      task,
    ]);
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  // Category Filter
  const categoryTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter(
          (task) =>
            task.category === selectedCategory
        );

  // Completed Filter
  const visibleTasks = showCompleted
    ? categoryTasks
    : categoryTasks.filter(
        (task) => !task.completed
      );

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div>
          <p className="welcome">
            Welcome back 👋
          </p>

          <h1>TaskFlow</h1>

          <p className="subtitle">
            Organize your work. Stay productive.
          </p>
        </div>

        <div className="header-icon">
          ✓
        </div>
      </header>

      <main>
        {/* STATS */}

        <Stats tasks={categoryTasks} />

        {/* ADD TASK */}

        <section className="add-section">
          <div className="section-title">
            <h2>Add New Task</h2>

            <p>
              Create a task and keep your work organized.
            </p>
          </div>

          <AddTask onAdd={addTask} />
        </section>

        {/* TASKS */}

        <section className="tasks-section">
          <div className="section-header">
            <div>
              <h2>My Tasks</h2>

              {categoryTasks.length > 0 && (
                <p>
                  You have {categoryTasks.length}{" "}
                  tasks in this category.
                </p>
              )}
            </div>

            <button
              className="filter-button"
              onClick={() =>
                setShowCompleted(!showCompleted)
              }
            >
              {showCompleted
                ? "Hide Completed"
                : "Show All"}
            </button>
          </div>

          {/* CATEGORY FILTER */}

          <div className="category-filter">
            <div>
              <span>Filter by category</span>
            </div>

            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "category-button active"
                      : "category-button"
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* TASK LIST */}

          <div className="task-list">
            {visibleTasks.length > 0 ? (
              visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <div className="empty-state">
                <div>📋</div>

                <h3>
                  No tasks found
                </h3>

                <p>
                  There are no tasks in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;