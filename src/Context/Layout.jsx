import React from "react";
import Action from "./Action";

function Layout(props) {
  // Assign colors based on priority
  const getBgColor = (level) => {
    switch (level) {
      case "High":
        return "bg-red-100 border-red-400";
      case "Medium":
        return "bg-yellow-100 border-yellow-400";
      case "Low":
        return "bg-green-100 border-green-400";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const containerClasses = `p-4 rounded border ${getBgColor(props.level)}`;

  return (
    <div className={containerClasses}>
      <h2 className="text-lg font-primary font-semibold mb-2">
        {props.level} Priority
      </h2>

      {props.getTasksByPriority(props.level).length === 0 && (
        <p className="text-sm italic text-gray-500">No tasks yet.</p>
      )}

      {props.getTasksByPriority(props.level).map((task) => (
        <div key={task.id} className="bg-white p-3 rounded mb-2 shadow">
          {/* Task title */}
          <p
            className={`text-base cursor-pointer font-secondary ${task.completed ? "line-through text-gray-500" : "text-black"
              }`}
            onClick={() => props.setSelectedTask(task)}
          >
            - {task.text}
          </p>

          {/* Dates — now with black text */}
          <div className="mt-2 text-sm text-black">
            <p><strong>Start:</strong> {task.startDate || "Not set"}</p>
            <p><strong>End:</strong> {task.endDate || "Not set"}</p>
            {task.completionDate && (
              <p className="text-green-600"><strong>Done:</strong> {task.completionDate}</p>
            )}
          </div>

          {/* Action buttons for selected task */}
          {props.selectedTask?._id === task._id && (
            <Action
              priority={props.level}
              handleEditTask={props.handleEditTask}
              handleChangePriority={props.handleChangePriority}
              handleDeleteTask={props.handleDeleteTask}
              handleToggleDone={props.handleToggleDone}
              handleUpdateDates={props.handleUpdateDates}
              selectedTask={props.selectedTask}
            />
          )}

        </div>
      ))}
    </div>
  );
}

export default Layout;
