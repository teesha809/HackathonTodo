import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodo from '../AddTodo';
import CompletedTasks from '../CompletedTasks';
import Statistics from '../Statistics';
import Workspace from '../Workspace';

function Dashboard({ user,tasks,setTasks,todos, setTodos,handleTaskEdit,pendingTasks}) {
    
    const [todoText, setTodoText] = useState('');
    const [priority, setPriority] = useState('medium');
    const [nextId, setNextId] = useState(1);
    const navigate = useNavigate();
    
    const updateTasks = (newTask) => {
            setTasks([...tasks, newTask]); 
        };

    const handleAddTodo = () => {
        if (todoText.trim() === '') {
            return;
        }
        const newTodo = {
            id: nextId,
            title: todoText,
            priority: priority,
            description: '',
            completed: false,
            date: new Date().toISOString().slice(0, 10)
        };
        setTodos([...todos, newTodo]);
        setTodoText('');
        setPriority('medium');
        setNextId(nextId + 1);
    };

    

    const handleLogout = () => {
        navigate('/login');
    };
    const completedTasks = todos.filter(todo => todo.completed);
    
    const totalCompletedTasks = completedTasks.length;
    const totalPendingTasks = pendingTasks.length;
    const totalTasks = totalCompletedTasks + totalPendingTasks;
    const completedPercentage = totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0;

    
    return (
        <div className="flex flex-col h-screen">
            {/* <Header onLogout={handleLogout} /> */}

            <div className="flex flex-1">
                {/* <div className="flex-none w-1/4 bg-gray-200 p-4">
                    <nav>
                        <Sidebar />
                    </nav>
                </div> */}

                <div className="flex-grow p-8">
                    <AddTodo
                        todoText={todoText}
                        setTodoText={setTodoText}
                        priority={priority}
                        setPriority={setPriority}
                        handleAddTodo={handleAddTodo}
                    />

                    <Statistics
                        totalPendingTasks={totalPendingTasks}
                        totalCompletedTasks={totalCompletedTasks}
                        completedPercentage={completedPercentage}
                    />

                    <Workspace pendingTasks={pendingTasks} handleTaskEdit={handleTaskEdit} />

                    <CompletedTasks completedTasks={completedTasks} handleTaskEdit={handleTaskEdit} />

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
