'use client';

import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Optional styling

const AdminPage = () => {
  // State for products
  const [products, setProducts] = useState([]);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  
  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Load products (in a real app, this would be an API call)
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 29.99, imageUrl: 'https://via.placeholder.com/150' }
    ];
    setProducts(mockProducts);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === formData.id ? formData : product
      ));
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
      };
      setProducts([...products, newProduct]);
    }
    
    // Reset form
    resetForm();
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      if (isEditing && formData.id === id) {
        resetForm();
      }
    }
  };

  // Reset form
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
    <div className="admin-container">
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
  );
};

export default AdminPage;