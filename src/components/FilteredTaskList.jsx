// FilteredTaskList.jsx
import React from 'react';
import TaskItem from './TaskItem.jsx';

const FilteredTaskList = (props) => {
    return props.tasks.flatMap((task) => {
        return task.name
            .toLowerCase()
            .includes(props.filter.toLowerCase()) ? 
            <TaskItem 
                key={task.id}
                task={task}
                onTaskToggle={props.handleTaskToggle}
                setTasks={props.setTasks}
                tasks={props.tasks}
                setIsEditing={props.setIsEditing}
                setTaskToUpdate={props.setTaskToUpdate}
            />
        : []
    });
};

export default FilteredTaskList;