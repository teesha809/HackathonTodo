import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Task from '../Task'; 
import Workspace from '../Workspace';

const MyTaskPage = ({ tasks, onLogout,todos,handleTaskEdit,pendingTasks}) => {
    console.log(todos)

    return (
        <div className="flex flex-col h-screen">
            {/* <Header onLogout={onLogout} /> */}

            <div className="flex flex-1">
                {/* <div className="flex-none w-1/4 bg-gray-200 p-4">
                    <nav>
                        <Sidebar />
                    </nav>
                </div> */}
                <div className="flex-grow p-4">
                    <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
                    <Workspace pendingTasks={pendingTasks} handleTaskEdit={handleTaskEdit} />
                </div>
            </div>
        </div>
    );
}

export default MyTaskPage;
