'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { BsGraphUp, BsPeople, BsBoxSeam, BsChatDots } from 'react-icons/bs';
import './AdminPage.css'; 

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('products');
// Catégories prédéfinies
  const [categories] = useState([
    { id: 1, name: 'Smartwatch' },
    { id: 2, name: 'Home Appliances' },
    { id: 3, name: 'Pc&Laptop' },
    { id: 4, name: 'Headphones&Airpods' },
    { id: 5, name: 'Phones&Tablets' },
    { id: 6, name: 'Accessories' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stockQuantity: 0,
    categoryId: categories[0]?.id || 1,
  });

  const [isEditing, setIsEditing] = useState(false);

  const navItems = [
    { icon: <BsGraphUp />, label: 'Dashboard', key: 'dashboard', path: '/admin' },
    { icon: <BsChatDots />, label: 'Comments', key: 'comments', path: '/admin/comments' },
    { icon: <BsPeople />, label: 'Users', key: 'users', path: '/admin/users' },
    { icon: <BsBoxSeam />, label: 'Products', key: 'products', path: '/admin/products' },
  ];
// Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data.content);
        } else {
          console.error('Error loading products:', data);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageUrl: formData.imageUrl,
          stockQuantity: formData.stockQuantity,
          categoryId: parseInt(formData.categoryId),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          setProducts(products.map(p => (p.id === data.id ? data : p)));
        } else {
          setProducts([...products, data]);
        }
        resetForm();
      } else {
        console.error('Error saving product:', data);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      stockQuantity: 0,
      categoryId: categories[0]?.id || 1,
    });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/products/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== id));
        } else {
          const data = await response.json();
          console.error('Error deleting product:', data);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h1 className="logo">AdminPro</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="menu-toggle" aria-label="Toggle menu">
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
            <button className="action-btn"><FiMessageSquare /><span className="notification-badge"></span></button>
            <button className="action-btn"><FiBell /><span className="notification-badge"></span></button>
          </div>
        </header>

        <div className="content">
          <h1>Gestion des Produits</h1>

          {/* Product Form */}
          <div className="product-form">
            <h2>{isEditing ? 'Modifier un Produit' : 'Ajouter un Nouveau Produit'}</h2>
            <form onSubmit={handleSubmit}>
             <div className="form-grid single-column">
  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nom" required />
  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Prix" step="0.01" required />
  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="Image URL" required />
  <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} placeholder="Quantité en stock" required />
  <select name="categoryId" value={formData.categoryId} onChange={handleInputChange} required>
    {categories.map(category => (
      <option key={category.id} value={category.id}>{category.name}</option>
    ))}
  </select>
</div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">{isEditing ? 'Mettre à jour' : 'Ajouter'}</button>
                {isEditing && <button type="button" onClick={resetForm} className="btn-secondary">Annuler</button>}
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="product-list">
            <h2>Liste des Produits</h2>
            {products.length === 0 ? (
              <p>Aucun produit trouvé.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Image</th>
                    <th>Catégorie</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const category = categories.find(c => c.id === product.categoryId);
                    return (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td><img src={product.imageUrl} alt={product.name} className="product-thumbnail" /></td>
                        <td>{category ? category.name : 'N/A'}</td>
                        <td>
                          <button onClick={() => handleEdit(product)} className="btn-edit">Modifier</button>
                          <button onClick={() => handleDelete(product.id)} className="btn-delete">Supprimer</button>
                        </td>
                      </tr>
                    );
                  })}
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
