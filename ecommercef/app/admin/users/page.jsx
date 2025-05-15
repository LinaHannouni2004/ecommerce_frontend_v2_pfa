'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots, BsCart } from 'react-icons/bs';
import './UserPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('users');

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'client' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'blocked' }
    ];
    setUsers(mockUsers);
  }, []);

  // Navigation items
  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  ];

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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="logo">AdminPro</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="menu-toggle"
            aria-label="Toggle menu"
          >
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.path}
                  className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                  onClick={() => setActivePage(item.key)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <div className="user-profile">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
              <span>Admin</span>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <FiMessageSquare />
              <span className="notification-badge"></span>
            </button>
            <button className="action-btn">
              <FiBell />
              <span className="notification-badge"></span>
            </button>
          </div>
        </header>

        <div className="content">
          <h1>Gestion des Utilisateurs</h1>

          {/* User List */}
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
                          className="role-select"
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
      </main>
    </div>
  );
};

export default UsersPage;