import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modal from "./Modal";
import ModalNotifaction from './ModalNotification';
import { MdDelete } from "react-icons/md";

function Sidebar({ setPage, workspaceCreators, setWorkspaceCreators }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalNotification , setshowModalNotification] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const notificationModal = () =>{
    setshowModalNotification(!showModalNotification);
  }

  const handleDeleteWorkspace = (workspaceName) => {
    setWorkspaceCreators((prevWorkspaceCreators) =>
      prevWorkspaceCreators.filter((item) => item.workspaceName !== workspaceName)
    );
  };

  return (
    <div className="w-64 bg-gray-800 h-full">
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            
            <button
              className="block py-2 px-4 text-white rounded hover:bg-gray-700 w-full text-left"
              onClick={() => setPage("DashBoard")}
            >
              Dashboard
            </button>
           
          </li>
          <li>
            <button
              className="block py-2 px-4 text-white rounded hover:bg-gray-700 w-full text-left"
              onClick={() => setPage("TaskPage")}
            >
              My Tasks
            </button>
            {/* </NavLink> */}
          </li>
          <li>
            <button
              onClick={() => {
                setshowModalNotification(!showModalNotification);
              }}
              className="block py-2 px-4 text-white rounded hover:bg-gray-700 w-full text-left"
            >
              Notify
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                // setPage("TaskPage");
                setShowModal(!showModal);
                // toggleModal;
              }}
              className="block py-2 px-4 text-white rounded hover:bg-gray-700 w-full text-left"
            >
              Shared Spaces
            </button>
          </li>
          {workspaceCreators.length !== 0 &&
            workspaceCreators.map((item) => (
              <li key={item.workspaceName} className=" flex items-center justify-between">
                <button
                  onClick={() => {
                    setPage(item.workspaceName); 
                  }}
                  className="block py-2 px-8 text-[14px] text-white rounded hover:bg-gray-700 w-full text-left"
                >

                  {item.workspaceName}({item.collaborators})
                </button>
                <MdDelete onClick={() => handleDeleteWorkspace(item.workspaceName)} size={20} className=" text-white"/>
              </li>
            ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          setWorkspaceCreators={setWorkspaceCreators}
          onClose={toggleModal}
        />
      )} ,
      {showModalNotification && (
        <ModalNotifaction
          onClose={notificationModal}
        />
      )}
    </div>
  );
}

export default Sidebar;
