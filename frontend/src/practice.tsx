import React, { useState, useEffect, useMemo } from "react";

function TaskDashboard({ tasks }) {
  const [search, setSearch] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [visibleTasks, setVisibleTasks] = useState(tasks);

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setVisibleTasks(updated);
  };

  useEffect(() => {
    setVisibleTasks(
      tasks.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, []);

  useEffect(() => {
    let count = 0;
    visibleTasks.forEach((t) => {
      if (t.completed) count++;
    });
    setCompletedCount(count);
  }, []);

  const totalHours = useMemo(() => {
    return visibleTasks.reduce((sum, t) => sum + t.hours, 0);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>Completed: {completedCount}</h3>
      <h3>Total Hours: {totalHours}</h3>
      <ul>
        {visibleTasks.map((t, i) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            {t.name} - {t.hours} hrs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDashboard;
