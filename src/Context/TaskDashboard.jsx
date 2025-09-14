import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const API_URL = "http://localhost:5000/api/tasks"; // Your backend route

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from MongoDB (via backend)
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error loading tasks:", err));
  }, []);

  // Add task
  const handleTaskSubmit = () => {
    if (textInput.trim() === "") return;

    const newTask = {
      text: textInput,
      priority: selectedPriority,
    };

    axios.post(API_URL, newTask)
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error("Error adding task:", err));

    setTextInput("");
    setSelectedPriority("High");
  };

  // Edit task text
  const handleEditTask = (editedText) => {
    axios.put(`${API_URL}/${selectedTask._id}`, { text: editedText })
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
        setSelectedTask(null);
      })
      .catch((err) => console.error("Error editing task:", err));
  };

  // Change priority
  const handleChangePriority = (newPriority) => {
    axios.put(`${API_URL}/${selectedTask._id}`, { priority: newPriority })
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
        setSelectedTask(null);
      })
      .catch((err) => console.error("Error changing priority:", err));
  };

  // Delete task
  const handleDeleteTask = () => {
    axios.delete(`${API_URL}/${selectedTask._id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== selectedTask._id));
        setSelectedTask(null);
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Toggle done
  const handleToggleDone = (task) => {
    axios.put(`${API_URL}/${task._id}`, {
      completed: !task.completed,
      completionDate: !task.completed ? new Date().toLocaleDateString() : ""
    })
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
      })
      .catch((err) => console.error("Error toggling done:", err));
  };

  // Update dates
  const handleUpdateDates = (task, start, end) => {
    axios.put(`${API_URL}/${task._id}`, { startDate: start, endDate: end })
      .then((res) => {
        setTasks(tasks.map((t) => (t._id === res.data._id ? res.data : t)));
      })
      .catch((err) => console.error("Error updating dates:", err));
  };

  // 🎨 Priority colors
  const priorityColors = {
    High: "bg-red-100 border-red-500 shadow-red-400",
    Medium: "bg-yellow-100 border-yellow-500 shadow-yellow-400",
    Low: "bg-green-100 border-green-500 shadow-green-400",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 shadow-2xl shadow-green-600">
      <h1 className="text-3xl font-bold text-center mb-6 font-primary">Task Manager</h1>

      {/* Input Section */}
      <div className="lg:flex grid gap-4 items-center font-main bg-gray-700 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full lg:w-96 border border-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-green-400 text-black"
          placeholder="Enter task..."
        />
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="w-full border border-gray-500 rounded-lg p-3 bg-gray-100 text-black"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button
          onClick={handleTaskSubmit}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Tasks Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["High", "Medium", "Low"].map((level) => (
          <div
            key={level}
            className={`rounded-lg border-2 shadow-xl p-4 ${priorityColors[level]}`}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">{level} Priority</h2>
            <Layout
              getTasksByPriority={(p) => tasks.filter((t) => t.priority === p)}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleToggleDone={handleToggleDone}
              handleUpdateDates={handleUpdateDates}
              level={level}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
