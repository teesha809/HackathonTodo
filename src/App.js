// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./ClientSide/Components/Auth/Login";
import Signup from "./ClientSide/Components/Auth/Signup";
import Dashboard from "./ClientSide/Components/Dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import MyTaskPage from "./ClientSide/Components/Dashboard/MyTaskPage";
import WorkspacePage from "./ClientSide/Components/Dashboard/WorkspacePage";
import HomePage from "./ClientSide/Components/Dashboard/HomePage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  // const [tasks, setTasks] = useState([]);
  // const [todos, setTodos] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  // const handleLogout = () => {
  //   setUser(null);
  //   setLoggedIn(false);
  // };

  // useEffect(() => {
  //   console.log("toododod");
  //   // console.log(tasks)
  //   console.log(todos);
  // }, []);

  // const handleTaskEdit = (id, description, completed) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, description: description, completed: completed };
  //       }
  //       return todo;
  //     })
  //   );
  // };

 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Signup handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            // element={
            //   <HomePage user={user}/>
            // }
            element={loggedIn ? <HomePage user={user}/> : <Login handleLogin={handleLogin} />}
          />
          <Route
            path="/Dashboard"
            element={
              <Dashboard
                // handleTaskEdit={handleTaskEdit}
                // pendingTasks={pendingTasks}
                // todos={todos}
                // setTodos={setTodos}
                // tasks={tasks}
                // setTasks={setTasks}
                // user={user}
                // handleLogout={handleLogout}
              />
            }
            // element={loggedIn ? <Dashboard handleTaskEdit={handleTaskEdit} pendingTasks={pendingTasks} todos={todos} setTodos={setTodos} tasks={tasks} setTasks={setTasks} user={user} handleLogout={handleLogout} /> : <Login handleLogin={handleLogin} />}
          />
          <Route
            path="/mytasks"
            element={
              <MyTaskPage
                // handleTaskEdit={handleTaskEdit}
                // pendingTasks={pendingTasks}
                // todos={todos}
                // tasks={tasks}
              />
            }
          />
          <Route
            path="/workspace"
            element={<WorkspacePage />}
            Component={WorkspacePage}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
