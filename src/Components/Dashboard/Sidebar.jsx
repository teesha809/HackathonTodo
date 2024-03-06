import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from './Modal'; 

function Sidebar() {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="w-64 bg-gray-800 h-full">
            <div className="p-4">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/"
                            activeClassName="bg-blue-500 text-white"
                            className="block py-2 px-4 text-white rounded hover:bg-gray-700"
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mytasks"
                            activeClassName="bg-blue-500 text-white"
                            className="block py-2 px-4 text-white rounded hover:bg-gray-700"
                        >
                            My Tasks
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={toggleModal}
                            className="block py-2 px-4 text-white rounded hover:bg-gray-700 w-full text-left"
                        >
                            Shared Spaces
                        </button>
                    </li>
                </ul>
            </div>
            {showModal && <Modal onClose={toggleModal} />}
        </div>
    );
}

export default Sidebar;
