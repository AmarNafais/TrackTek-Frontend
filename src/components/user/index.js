import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./add-user-modal";
import EditUserModal from "./edit-user-modal";
import { fetchUsers } from "../../redux/actions/axios";

const UsersPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(
          response.map((user) => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
            status: user.isActive ? "Active" : "Inactive",
          }))
        );
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, status: "Active" }]);
  };

  const handleSaveUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                  <th>Status</th>
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
                      <button
                        className={`status-button ${
                          user.status === "Active" ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td>
                      <button
                        className="action-button edit-button"
                        onClick={() => setEditUser(user)}
                      >
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
