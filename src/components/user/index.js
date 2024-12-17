import React, { useState, useEffect } from "react";
import Sidebar from "../side-nav";
import Header from "../header";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./add-user-modal";
import EditUserModal from "./edit-user-modal";
import { fetchUsers, updateUserStatus } from "../../redux/actions/user";

const UsersPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(
        response.map((user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        }))
      );
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    await loadUsers();
    setShowAddUserModal(false);
  };

  const handleSaveUser = async () => {
    await loadUsers();
    setEditUser(null);
  };

  const handleToggleStatus = async (id) => {
    try {
      const userToToggle = users.find((user) => user.id === id);
      if (!userToToggle) {
        throw new Error("User not found");
      }
      const updatedStatus = !userToToggle.isActive;
      await updateUserStatus(id, updatedStatus);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: updatedStatus } : user
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err.message);
      setError("Failed to update user status. Please try again.");
    }
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
            <button
              className="add-user-button"
              onClick={() => setShowAddUserModal(true)}
            >
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
                          user.isActive ? "active" : "inactive"
                        }`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="action-button edit-button"
                        onClick={() => setEditUser(user)}
                      >
                        <FaEdit />
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