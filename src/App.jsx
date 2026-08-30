import { useState } from "react";
import "./App.css";

// ================================
// Header Component
// ================================
function Header({ studentName, darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div>
        <h1>Student Dashboard 🎓</h1>
        <p>Welcome back, {studentName} 👋</p>
      </div>

      <div className="header-actions">
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="profile">
          <div className="avatar">
            {studentName.charAt(0)}
          </div>

          <span>{studentName}</span>
        </div>
      </div>
    </header>
  );
}

// ================================
// Stat Card Component
// ================================
function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

// ================================
// Course Card Component
// ================================
function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-top">
        <span className="course-icon">{course.icon}</span>

        {/* Ternary Operator */}
        <span
          className={
            course.completed ? "completed" : "in-progress"
          }
        >
          {course.completed ? "Completed" : "In Progress"}
        </span>
      </div>

      <h3>{course.name}</h3>

      <p>Instructor: {course.instructor}</p>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${course.progress}%`,
          }}
        ></div>
      </div>

      <div className="course-bottom">
        <span>{course.progress}% Progress</span>

        <span>{course.lessons} Lessons</span>
      </div>
    </div>
  );
}

// ================================
// Assignment Component
// ================================
function Assignment({
  assignment,
  onToggle,
}) {
  return (
    <div className="assignment">

      <div className="assignment-info">

        <div className="assignment-icon">
          📝
        </div>

        <div>
          <h3>{assignment.title}</h3>

          <p>{assignment.subject}</p>
        </div>

      </div>

      <div className="assignment-status">

        {/* Ternary Operator */}
        <span
          className={
            assignment.completed
              ? "done"
              : "pending"
          }
        >
          {assignment.completed
            ? "Done"
            : "Pending"}
        </span>

        <small>
          Due: {assignment.dueDate}
        </small>

        <button
          className="status-btn"
          onClick={() =>
            onToggle(assignment.id)
          }
        >
          {assignment.completed
            ? "Mark Pending"
            : "Mark Done"}
        </button>

      </div>

    </div>
  );
}

// ================================
// Main App
// ================================
function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  const [showAssignments, setShowAssignments] =
    useState(true);

  const [showCourses, setShowCourses] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [message, setMessage] =
    useState(
      "🚀 Keep going! You are doing great!"
    );

  // ================================
  // Courses Data
  // ================================
  const [courses] = useState([
    {
      id: 1,
      name: "ReactJS",
      instructor: "Ahmed Mohamed",
      progress: 85,
      lessons: 12,
      completed: false,
      icon: "⚛️",
    },

    {
      id: 2,
      name: "JavaScript",
      instructor: "Omar Hassan",
      progress: 100,
      lessons: 15,
      completed: true,
      icon: "🟨",
    },

    {
      id: 3,
      name: "HTML & CSS",
      instructor: "Sara Ali",
      progress: 70,
      lessons: 10,
      completed: false,
      icon: "🎨",
    },

    {
      id: 4,
      name: "Git & GitHub",
      instructor: "Mohamed Adel",
      progress: 90,
      lessons: 8,
      completed: false,
      icon: "🐙",
    },
  ]);

  // ================================
  // Assignments Data
  // ================================
  const [assignments, setAssignments] =
    useState([
      {
        id: 1,
        title: "React Components",
        subject: "ReactJS",
        dueDate: "Today",
        completed: false,
      },

      {
        id: 2,
        title: "JavaScript Functions",
        subject: "JavaScript",
        dueDate: "Tomorrow",
        completed: true,
      },

      {
        id: 3,
        title: "CSS Landing Page",
        subject: "HTML & CSS",
        dueDate: "Sep 2",
        completed: false,
      },
    ]);

  // ================================
  // Toggle Assignment
  // ================================
  function toggleAssignment(id) {

    setAssignments(
      assignments.map((assignment) => {

        if (assignment.id === id) {
          return {
            ...assignment,
            completed:
              !assignment.completed,
          };
        }

        return assignment;
      })
    );

    setMessage(
      "✅ Assignment status updated!"
    );
  }

  // ================================
  // Search Courses
  // ================================
  const filteredCourses =
    courses.filter((course) =>
      course.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // ================================
  // Statistics
  // ================================
  const completedAssignments =
    assignments.filter(
      (assignment) =>
        assignment.completed
    ).length;

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      {/* Header */}
      <Header
        studentName="أمل حاتم"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="container">

        {/* =========================
            Welcome Message
        ========================= */}
        <section className="welcome">

          <div>
            <h2>
              Hello, أمل حاتم! 👋
            </h2>

            <p>
              Ready to continue your
              learning journey?
            </p>
          </div>

          <button
            onClick={() =>
              setMessage(
                "🔥 You're doing amazing, أمل!"
              )
            }
          >
            Motivate Me 🚀
          </button>

        </section>

        {/* =========================
            Statistics
        ========================= */}
        <section className="stats">

          <StatCard
            title="Courses"
            value={courses.length}
            icon="📚"
          />

          <StatCard
            title="Completed Courses"
            value={
              courses.filter(
                (course) =>
                  course.completed
              ).length
            }
            icon="✅"
          />

          <StatCard
            title="Assignments"
            value={assignments.length}
            icon="📝"
          />

          <StatCard
            title="Completed Assignments"
            value={completedAssignments}
            icon="🏆"
          />

        </section>

        {/* =========================
            Courses
        ========================= */}
        <section className="section">

          <div className="section-header">

            <div>
              <h2>My Courses 📚</h2>

              <p>
                Continue your learning
                journey
              </p>
            </div>

            <button
              className="toggle-btn"
              onClick={() =>
                setShowCourses(
                  !showCourses
                )
              }
            >
              {showCourses
                ? "Hide Courses"
                : "Show Courses"}
            </button>

          </div>

          {/* Search */}
          {showCourses && (
            <input
              className="search"
              type="text"
              placeholder="🔍 Search courses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          )}

          {/* && Operator */}
          {showCourses && (

            <div className="courses-grid">

              {/* .map() */}
              {filteredCourses.map(
                (course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                )
              )}

            </div>

          )}

        </section>

        {/* =========================
            Assignments
        ========================= */}
        <section className="section">

          <div className="section-header">

            <div>
              <h2>Assignments 📝</h2>

              <p>
                Manage your assignments
              </p>
            </div>

            <button
              className="toggle-btn"
              onClick={() =>
                setShowAssignments(
                  !showAssignments
                )
              }
            >
              {showAssignments
                ? "Hide"
                : "Show"}
            </button>

          </div>

          {/* && Operator */}
          {showAssignments && (

            <div className="assignments">

              {/* .map() */}
              {assignments.map(
                (assignment) => (

                  <Assignment
                    key={assignment.id}
                    assignment={assignment}
                    onToggle={
                      toggleAssignment
                    }
                  />

                )
              )}

            </div>

          )}

        </section>

        {/* =========================
            Dynamic Message
        ========================= */}
        <section className="message">

          <p>{message}</p>

          {/* Ternary */}
          <span>
            {completedAssignments ===
            assignments.length
              ? "🎉 All assignments completed!"
              : "📖 You still have work to do!"}
          </span>

        </section>

      </main>

      <footer>
        <p>
          © 2026 أمل حاتم | ReactJS Assignment
        </p>
      </footer>

    </div>
  );
}

export default App;