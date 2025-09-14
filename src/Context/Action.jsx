import React, { useState, useEffect } from "react";

const Action = (props) => {
  if (!props.selectedTask) return null; // ✅ Don't render if no task is selected

  const [startDate, setStartDate] = useState(props.selectedTask?.startDate || "");
  const [endDate, setEndDate] = useState(props.selectedTask?.endDate || "");

  useEffect(() => {
    setStartDate(props.selectedTask?.startDate || "");
    setEndDate(props.selectedTask?.endDate || "");
  }, [props.selectedTask]);

  const setTodayTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (d) => d.toISOString().split("T")[0];
    setStartDate(format(today));
    setEndDate(format(tomorrow));

    props.handleUpdateDates(props.selectedTask, format(today), format(tomorrow));
  };

  const saveDates = () => {
    props.handleUpdateDates(props.selectedTask, startDate, endDate);
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Start Date */}
      <div>
        <label className="mr-2">Start:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onBlur={saveDates}
          className="border rounded p-1"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="mr-2">End:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onBlur={saveDates}
          className="border rounded p-1"
        />
      </div>

      {/* Quick Actions */}
      <button className="btn btn-secondary" onClick={setTodayTomorrow}>
        Set Today → Tomorrow
      </button>

      <div className="space-x-2 mt-2">
        <button
          className="btn btn-secondary"
          onClick={() =>
            props.handleEditTask(prompt("Edit task:", props.selectedTask.text))
          }
        >
          Edit
        </button>
        <button
          className="btn btn-secondary"
          onClick={() =>
            props.handleChangePriority(
              prompt("Enter new priority:", props.selectedTask.priority)
            )
          }
        >
          Change Priority
        </button>
        <button
          className="btn btn-success"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete this ${props.priority} priority task?`)) {
              props.handleDeleteTask();
            }
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => props.handleToggleDone(props.selectedTask)}
        >
          {props.selectedTask.completed ? "Undo" : "Done"}
        </button>
      </div>
    </div>
  );
};

export default Action;
