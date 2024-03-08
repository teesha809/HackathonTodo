import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import MyTaskPage from "./MyTaskPage";
import WorkspacePage from "./WorkspacePage";

const HomePage = ({user}) => {
  const [page, setPage] = useState("DashBoard");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [tasks, setTasks] = useState([]);
  const [todos, setTodos] = useState([]);
 
 

  const handleTaskEdit = (id, description, completed) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, description: description, completed: completed };
        }
        return todo;
      })
    );
  };

  const pendingTasks = todos.filter((todo) => !todo.completed);

  const [workspaceCreators, setWorkspaceCreators] = useState([]);

  return (
    <div className="flex flex-col h-screen">
      <Header user={user.email} onLogout={handleLogout} />
      <div className="flex flex-1">
        <div className="flex-none w-1/4 bg-gray-200 p-4">
          <nav>
            <Sidebar
              setPage={setPage}
              workspaceCreators={workspaceCreators}
              setWorkspaceCreators={setWorkspaceCreators}
            />
          </nav>
        </div>
        <div className=" w-3/4">
          {page == "DashBoard" && (
            <Dashboard
              handleTaskEdit={handleTaskEdit}
              pendingTasks={pendingTasks}
              todos={todos}
              setTodos={setTodos}
              tasks={tasks}
              setTasks={setTasks}
              user={user}
              // setDeadline={setDeadline}
              handleLogout={handleLogout}
            />
          )}
          {page == "TaskPage" && (
            <MyTaskPage
              handleTaskEdit={handleTaskEdit}
              pendingTasks={pendingTasks}
              todos={todos}
              tasks={tasks}
              workspaceCreators={workspaceCreators}
            />
          )}
          {workspaceCreators.length !== 0 &&
            workspaceCreators.map((item) => {
              return (
                <div key={item.workspaceName}>
                  {page === item.workspaceName && (
                    <WorkspacePage
                    item={item}
                    setWorkspaceCreators={setWorkspaceCreators}
                      workspaceCreators={workspaceCreators}
                      selectedWorkspace={item.workspaceName}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
