import React from 'react';

function AddTodo({ todoText, setTodoText, priority, setPriority, handleAddTodo, Deadline, setDeadline }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
            <div className="flex items-center">
                <input
                    type="text"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    className="border border-gray-300 rounded-l px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                    placeholder="Enter Todo"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-gray-300 rounded-r px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                {/* <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="border border-gray-300 rounded-r px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                    placeholder="Enter Todo"
                /> */}
                <button
                    onClick={handleAddTodo}
                    className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Todo
                </button>
            </div>
        </div>
    );
}

export default AddTodo;
