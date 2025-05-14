'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './UserPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'client' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'blocked' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  return (
    <div className="admin-container">
      {/* Navbar */}
      <nav className="admin-navbar">
        <ul>
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/comments">Comments</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <li><Link href="/admin/products">Products</Link></li>
        </ul>
      </nav>

      <h1>Gestion des Utilisateurs</h1>

      <div className="user-list">
        <h2>Liste des Utilisateurs</h2>
        {users.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className={`role-${user.role}`}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="client">Client</option>
                      <option value="blocked">Bloqué</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn-delete"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
