import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTextInputChange = (event) => setTextInput(event.target.value);

  const handlePriorityChange = (event) => setSelectedPriority(event.target.value);

  const handleTaskSubmit = () => {
    if (textInput.trim() === "") return;

    const newTask = {
      id: Date.now(),       // ✅ unique id
      text: textInput,
      priority: selectedPriority,
      completed: false,     // ✅ renamed consistently
      startDate: "",
      endDate: "",
      completionDate: ""
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
  };

  const getTasksByPriority = (priority) => tasks.filter((task) => task.priority === priority);

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  // ✅ toggle done/undo
  const handleToggleDone = (taskToToggle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToToggle.id
        ? {
          ...task,
          completed: !task.completed,
          completionDate: !task.completed ? new Date().toLocaleDateString() : ""
        }
        : task
    );
    setTasks(updatedTasks);
  };

  // ✅ update start/end dates
  const handleUpdateDates = (taskToUpdate, start, end) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToUpdate.id ? { ...task, startDate: start, endDate: end } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-8">
      {/* Input Section */}
      <div className="lg:flex grid gap-2 items-center font-main">
        <input
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          className="w-full lg:w-96 border rounded p-2"
          placeholder="Enter task"
        />
        <select
          value={selectedPriority}
          onChange={handlePriorityChange}
          className="w-full border rounded p-2"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button onClick={handleTaskSubmit} className="btn btn-secondary">
          Add Task
        </button>
      </div>

      {/* Tasks Section */}
      <div className="mt-8 space-y-4 text-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["High", "Medium", "Low"].map((level) => (
            <Layout
              key={level}
              getTasksByPriority={getTasksByPriority}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
              handleToggleDone={handleToggleDone}
              handleUpdateDates={handleUpdateDates}
              level={level}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
