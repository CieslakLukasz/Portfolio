import React from 'react';
import "./ToDo.scss";

export default function ToDoForm({handleAddTask}) {

    return (
        <button className='addTaskButton' onClick={handleAddTask}>
        Dodaj nowe zadanie
        </button>



    )
}
