"use client";
import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
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
    categoryId: categories[0]?.id || 1, // Utilise la première catégorie par défaut
  });

  const [isEditing, setIsEditing] = useState(false);

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data.content); // assuming the response is paginated
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          imageUrl: formData.imageUrl,
          stockQuantity: formData.stockQuantity,
          categoryId: parseInt(formData.categoryId)
        }),
      });
      
      const data = await response.json();

      if (response.ok) {
        if (isEditing) {
          setProducts(
            products.map((product) =>
              product.id === data.id ? data : product
            )
          );
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
    setFormData({
      ...product,
      categoryId: product.categoryId || categories[0]?.id || 1,
    });
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
    <div className="admin-container">
      <h1>Product Management</h1>

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

          <div className="form-group">
            <label>Stock Quantity:</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                // Trouve la catégorie correspondante
                const productCategory = categories.find(c => c.id === product.categoryId);
                return (
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
                    <td>{productCategory ? productCategory.name : 'N/A'}</td>
                    <td>
                      <button onClick={() => handleEdit(product)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="btn-delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;