import React, { useState } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./add-user-modal";
import EditUserModal from "./edit-user-modal";

const UsersPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, fullName: "Jack Sparrow", email: "jacksparrow@gmail.com", role: "Manager" },
    { id: 2, fullName: "Henry Danford", email: "henrydanford@gmail.com", role: "Stock Manager" },
    { id: 3, fullName: "Larry Hills", email: "larryhills@gmail.com", role: "Staff" },
    { id: 4, fullName: "Benjamin Franklin", email: "benjaminfranklin@gmail.com", role: "Staff" },
    { id: 5, fullName: "John Keels", email: "johnkeels@gmail.com", role: "Manager" },
  ]);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleSaveUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="users-page">
          <h2>Users</h2>
          <div className="users-table-container">
            <button className="add-user-button" onClick={() => setShowAddUserModal(true)}>
              Add User
            </button>
            {showAddUserModal && (
              <AddUserModal
                onClose={() => setShowAddUserModal(false)}
                onAddUser={handleAddUser}
              />
            )}
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="action-button edit-button" onClick={() => setEditUser(user)}>
                        <FaEdit />
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editUser && (
              <EditUserModal
                user={editUser}
                onClose={() => setEditUser(null)}
                onSave={handleSaveUser}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;