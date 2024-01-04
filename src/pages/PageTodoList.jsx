import React from 'react';
import Clockwatch from '../components/Clockwatch';
import TaskList from '../components/TaskList';

const PageTodoList = () => {
  
    const tasksExemple = [
      'Faire la vaisselle',
      'Ranger la chambre',
      'Passer l\'aspirateur'
    ];
    
    return (
        <>
            <h2>Todo List</h2>
            
            {/* <Clockwatch /> */}
            <TaskList tasks={tasksExemple} />
        </>
    );
}

export default PageTodoList;