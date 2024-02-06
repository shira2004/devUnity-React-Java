import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";


const TaskManagement = ({ TaskFieldVisible, handleAddTaskClick, handleMarkAsDone, handleTaskSubmit }) => {
    const [task, setTask] = useState('');

    return (
        <Box>
            {!TaskFieldVisible && (
                <div>
                    <Button variant="contained" onClick={handleAddTaskClick}>
                        Add Task
                    </Button>
                    <br /><br />

                    <Button variant="contained" onClick={handleMarkAsDone}>
                        Mark Your project as  Done
                    </Button>
                    <br /><br />
                </div>
            )}

            {TaskFieldVisible && (
                <Box>
                    <TextField
                        id="task"
                        label="Enter your new task"
                        multiline
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setTask(e.target.value)}
                    />

                    <Button variant="contained" onClick={() => handleTaskSubmit(task)}>
                        submit task
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default TaskManagement;
