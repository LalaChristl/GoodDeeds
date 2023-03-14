import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { Popover, MenuItem, Menu, Typography } from "@mui/material"; // import Popover and other MUI components

const CalendarFunction = ({ tasks }) => {
  const [value, onChange] = useState(new Date());
  console.log("tasks", tasks);
  // Define a function to check if a task exists on a given date
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedTask, setClickedTask] = useState(null);
  // Define a function to render the content of a date tile
  const renderTileContent = ({ date, view }) => {
    if (!tasks) {
      return null;
    }
    // Show task information for month and year views only
    if (view !== "month" && view !== "year") {
      return null;
    }

    const tasksOnDate = tasks.filter((task) => {
      const taskDate = new Date(task.taskDate + "T" + task.taskTime);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });
    if (tasksOnDate.length === 0) {
      return null;
    }

    return (
      <div className="tile-content">
        {tasksOnDate.map((task) => (
          <>
            <div
              key={task._id}
              className="task-block"
              style={{
                backgroundColor: "green",
                marginBottom: "8px",
                padding: "8px",
              }}
              // onClick={(event) => setAnchorEl(event.currentTarget)}
              onClick={() => setClickedTask(task)}
            />
            {/* <div style={{ width: "10px" }}>{task.taskDetails}</div>
            <div>{task.taskTime}</div> */}
            {clickedTask && (
              <Popover
                open={true}
                anchorEl={anchorEl}
                onClose={() => setClickedTask(null)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div style={{ padding: "10px" }}>
                  {clickedTask?.taskDetails && (
                    <Typography variant="h6">
                      {clickedTask.taskDetails}
                    </Typography>
                  )}
                  {clickedTask?.taskTime && (
                    <Typography variant="body1">
                      {clickedTask.taskTime}
                    </Typography>
                  )}
                </div>
                <Menu>
                  <MenuItem onClick={() => setClickedTask(null)}>
                    Cancel
                  </MenuItem>
                </Menu>
              </Popover>
            )}
          </>
        ))}
      </div>
    );
  };

  // Set the active start date to the beginning of the current month
  // const activeStartDate = new Date();
  // activeStartDate.setDate(1);

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={renderTileContent}
        // activeStartDate={activeStartDate}
      />
    </div>
  );
};

export default CalendarFunction;
