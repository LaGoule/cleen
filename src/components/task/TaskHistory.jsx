import React, { useState, useCallback } from 'react';
import FilteredTaskList from './FilteredTaskList';
import FiltersGroup from '../FiltersGroup';

const TaskHistory = (props) => {


    return (
        <>
            {
                props.tasks.length === 0 ?
                    <>
                        <hr />
                        <p style={{ padding: '20px 0', color: '#aaa' }}>Votre historique est vide…</p>
                    </>
                :
                    <>
                        {/* <SearchFilter 
                            filter={props.filter} setFilter={props.setFilter} 
                            sort={props.sort} setSort={props.setSort} 
                        /> */}

                        <ul className="todoList">
                            {/* <h4>Historique des tâches</h4> */}
                            <p className="ratingTotal">
                                ★ × {props.tasks.reduce((acc, task) => acc + (+task.rating), 0)}
                            </p>

                            <hr />

                            <FilteredTaskList 
                                userData={props.userData}
                                tasks={props.tasks}
                                filter={props.filter}
                                handleTaskToggle={props.handleTaskToggle}
                                setTasks={props.setTasks}
                                setIsEditing={props.setIsEditing}
                                setTaskToUpdate={props.setTaskToUpdate}
                            />

                        </ul>
                    </>
            }
        </>
        
    );
};

export default TaskHistory;