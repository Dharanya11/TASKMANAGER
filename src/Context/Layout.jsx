import React from "react";
import Action from "./Action";

function Layout(props) {
  return (
    <div className="bg-red-100 p-4 rounded border border-red-400">
      <h2 className="text-lg font-primary font-semibold mb-2">
        {props.level} Priority
      </h2>

      {props.getTasksByPriority(props.level).map((task) => (
        <div key={task.id} className="bg-white p-2 rounded mb-2 shadow">
          {/* Task text with strikethrough if done */}
          <p
            className={`text-base cursor-pointer font-secondary ${task.completed ? "line-through text-gray-500" : ""
              }`}
            onClick={() => props.setSelectedTask(task)}
          >
            - {task.text}
          </p>

          {/* Show Dates */}
          <div className="mt-1">
            <p className="text-xs text-gray-600">Start: {task.startDate || "Not set"}</p>
            <p className="text-xs text-gray-600">End: {task.endDate || "Not set"}</p>
            {task.completionDate && (
              <p className="text-xs text-green-600">Done: {task.completionDate}</p>
            )}
          </div>

          {/* Show action buttons only if this task is selected */}
          {props.selectedTask?.id === task.id && (
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
