'use client';

import { useEffect, useState } from "react";
import { use } from 'react';

export default function ProductPage({ params }) {
  const resolvedParams = use(params); // 👈 On unwrap la Promise
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resolvedParams) return;

    const foundProduct = mockProducts.find(p => p.id.toString() === resolvedParams.id);
    setProduct(foundProduct);
    setLoading(false);
  }, [resolvedParams]);

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit non trouvé</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-64 h-64 object-cover" />
      <p className="mt-4 text-lg">Catégorie: {product.category}</p>
      <p className="mt-2 text-xl text-green-600">${product.price}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Laissez un commentaire :</h2>
        <textarea
          className="w-full border p-2 mt-2 rounded"
          rows={4}
          placeholder="Votre avis ici..."
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Envoyer
        </button>
      </div>
    </div>
  );
}

const mockProducts = [
  {
    id: 1,
    name: "Appareil Photo Canon EOS R5",
    price: 3899.99,
    image: "/images/camerasony.jpg",
    category: "Photographie"
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M2 Max",
    price: 3499.99,
    image: "/images/camerasony.jpg",
    category: "Informatique"
  },
  {
    id: 3,
    name: "Casque Sony WH-1000XM5",
    price: 399.99,
    image: "/images/camerasony.jpg",
    category: "Audio"
  },
  {
    id: 4,
    name: "Casque Sony WH-1000XM5",
    price: 399.99,
    image: "/images/camerasony.jpg",
    category: "Audio"
  },
];
