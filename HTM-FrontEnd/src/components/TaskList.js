import React, { useState, useEffect } from "react";
import TaskCard from './TaskCard'

function TaskList({setPetHappiness}) {
    const [taskList, setTaskList] = useState([]);
    const [scheduledTasks, setScheduledTasks] = useState([])

    const getData = async (url, setFunc) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setFunc(data))
    }
    const updateTaskData = async (e) => {
        await getData("http://localhost:5000/users/87/tasks", setTaskList);
        await getData("http://localhost:5000/users/87/schedule", setScheduledTasks);
    }
    
    useEffect(() => { updateTaskData(); }, [])

    const mappedTasks = taskList.map(task => {
        const diffTime = Math.abs(new Date() - new Date(task.StartDate));
        const daysSinceStart = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const overdueDays = daysSinceStart - task.RepeatIntervalDays

        return {
            taskId: task.ID,
            taskName: task.TaskName,
            taskDescription: task.TaskDescription,
            completed: !!task.CompletionDate,
            overdueDays: overdueDays
        }
    })
    
    return (
        <div style={{margin:'10px'}}>
            <TaskCards tasks={mappedTasks.sort((a,b) => b.overdueDays - a.overdueDays)}/>  
        </div>
    )
}

function TaskCards ({tasks}) {
    return (
        tasks.map(task => (
            <div style={{margin: '10px 0px'}}>
            <TaskCard
                taskId={task.taskId}
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                completed={task.completed}
                overdueDays={task.overdueDays}
            />
            </div>
        ))
    )
}

function RefreshListButton ({updateTaskData}) {
    return (
        <div 
            style={{
                backgroundColor: '#FEE0BE',
                width: '80%',
                display:'inline-flex',
                borderRadius: '2px',
                justifyContent:'center',
                fontWeight:'bold',
                boxShadow:'1px 1px 3px #000000',
                cursor: 'pointer'
            }}
            onClick={updateTaskData}
        >
            Refresh List
        </div>
    )
}

export default TaskList