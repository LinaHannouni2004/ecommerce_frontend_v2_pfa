'use client';

<<<<<<< HEAD
import React from 'react';
import Link from 'next/link';
import './DashboardPage.css';
=======
import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {

  const [products, setProducts] = useState([]);
  
  // form inputs
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  
  // State for editing
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
>>>>>>> 369b88163b45ed73152a284ef823e684f4a2ed1e

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <ul>
          <li><Link href="/admin">Dashboard</Link></li> {/* Redirige vers la page d'accueil du dashboard */}
          <li><Link href="/admin/comments">Comments</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <li><Link href="/admin/products">Products</Link></li>
        </ul>
      </nav>

      {/* Welcome Message */}
      <h1>Welcome back, Admin</h1>

      {/* Latest Hits Section */}
      <section className="latest-hits">
        <h2>Latest Hits</h2>
        <p>Display charts or summaries here.</p>
      </section>

      {/* Performance Section */}
      <section className="performance">
        <h2>Performance</h2>
        <p>Display performance metrics here.</p>
      </section>

      {/* Storage Information */}
      <section className="storage-info">
        <h2>Storage Information</h2>
        <p>Display storage details here.</p>
      </section>

      {/* Notification List */}
      <section className="notifications">
        <h2>Notification List</h2>
        <ul>
          <li>Jessica and 6 others sent you new product updates. Check new orders. <span>6h ago</span></li>
          <li>Oliver Too and 6 others sent you existing product updates. Read more reports. <span>6h ago</span></li>
          <li>Victoria and 6 others sent you order updates. Read order information. <span>6h ago</span></li>
          <li>Laura Cute and 6 others sent you product records. <span>6h ago</span></li>
          <li>Samantha and 6 others sent you order stuffs. <span>6h ago</span></li>
          <li>Sophie and 6 others sent you product updates. <span>6h ago</span></li>
          <li>Lily A and 6 others sent you product updates. <span>6h ago</span></li>
          <li>Amara and 6 others sent you product updates. <span>6h ago</span></li>
          <li>Cinthela and 6 others sent you product updates. <span>6h ago</span></li>
        </ul>
      </section>

      {/* Orders List */}
      <section className="orders-list">
        <h2>Orders List</h2>
        <table>
          <thead>
            <tr>
              <th>ORDER NO.</th>
              <th>STATUS</th>
              <th>OPERATORS</th>
              <th>LOCATION</th>
              <th>DISTANCE</th>
              <th>START DATE</th>
              <th>EST DELIVERY DUE</th>
            </tr>
          </thead>
          <tbody>
            {/* Here you can continue adding your order rows */}
            <tr>
              <td>#122349</td>
              <td>Moving</td>
              <td>Oliver Trag</td>
              <td>London, UK</td>
              <td>485 km</td>
              <td>16:00, 12 NOV 2018</td>
              <td>08:00, 18 NOV 2018</td>
            </tr>
            {/* Add other rows as needed */}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2018 All rights reserved. Design: Template Mo</p>
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default DashboardPage;
=======
export default AdminPage;
>>>>>>> 369b88163b45ed73152a284ef823e684f4a2ed1e
