'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots, BsCart } from 'react-icons/bs';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('products');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const mockProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 29.99, imageUrl: 'https://via.placeholder.com/150' }
    ];
    setProducts(mockProducts);
  }, []);

  // Navigation items
  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setProducts(products.map(product => 
        product.id === formData.id ? formData : product
      ));
    } else {
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      setProducts([...products, newProduct]);
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      if (isEditing && formData.id === id) {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      imageUrl: ''
    });
    setIsEditing(false);
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
            <input type="text" placeholder="Search..." />
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
          <h1>Product Management</h1>

          {/* Product Form */}
          <div className="product-form">
            <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                {isEditing && (
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="product-list">
            <h2>Product List</h2>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="product-thumbnail"
                        />
                      </td>
                      <td>
                        <button 
                          onClick={() => handleEdit(product)}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="btn-delete"
                        >
                          Delete
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

export default AdminPage;