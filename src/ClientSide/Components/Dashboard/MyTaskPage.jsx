import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Task from "../Task";
import Workspace from "../Workspace";

const MyTaskPage = ({
  handleTaskEdit,
  pendingTasks,
  workspaceCreators,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="flex-grow p-4">
          <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
          <Workspace
            pendingTasks={pendingTasks}
            handleTaskEdit={handleTaskEdit}
          />
          {workspaceCreators.map((workspace) => (
            <div key={workspace.id}>
                <h1>{workspace.workspaceName}</h1>
              {workspace.todos.map((todo, index) => (
                <Task key={todo.id} task={todo} onTaskEdit={handleTaskEdit} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTaskPage;
