import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { parse } from '@babel/core';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(task: Task) {
    if(!newTaskTitle)return;
    setTasks(oldState => [...oldState, task]);
    setNewTaskTitle(``);
  }

  function handleToggleTaskCompletion(id: number) {
    console.log(tasks);
    for(let i=0; i <tasks.length; i++){
      if(tasks[i].id == id){
        if(tasks[i].isComplete == true){
        tasks[i].isComplete = false}
        else {tasks[i].isComplete = true}
      } else {console.log('Não é a task')}
    }
    setTasks(oldState => [...oldState]);
  }

  function handleRemoveTask(id: number) {
    const cleanTasks = tasks.filter(task => task.id !== id)

    setTasks(cleanTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo to-do" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            id="pesquisa"
          />
          <button 
          type="submit" 
          data-testid="add-task-button" 
          onClick={() => handleCreateNewTask({
            id: Math.floor(Math.random() * 100001),
            title: newTaskTitle,
            isComplete: false
            })}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}