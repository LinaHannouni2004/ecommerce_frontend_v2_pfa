'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CommentPage.css';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const mockComments = [
      { id: 1, user: 'Alice', content: 'Super produit, merci !', date: '2024-04-01', status: 'approved' },
      { id: 2, user: 'Bob', content: 'Livraison rapide et produit conforme.', date: '2024-04-05', status: 'pending' },
      { id: 3, user: 'Charlie', content: 'Très satisfait de mon achat.', date: '2024-04-08', status: 'rejected' },
    ];
    setComments(mockComments);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      setComments(comments.filter(comment => comment.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: newStatus } : comment
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

      <h1>Gestion des Commentaires</h1>

      {/* Comment List */}
      <div className="comment-list">
        <h2>Liste des Commentaires</h2>
        {comments.length === 0 ? (
          <p>Aucun commentaire trouvé.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Contenu</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(comment => (
                <tr key={comment.id} className={`status-${comment.status}`}>
                  <td>{comment.user}</td>
                  <td>{comment.content}</td>
                  <td>{comment.date}</td>
                  <td>
                    <select
                      value={comment.status}
                      onChange={(e) => handleStatusChange(comment.id, e.target.value)}
                    >
                      <option value="pending">En attente</option>
                      <option value="approved">Approuvé</option>
                      <option value="rejected">Rejeté</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(comment.id)}
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

export default CommentsPage;
