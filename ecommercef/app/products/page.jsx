'use client';
//page principale des produits 
import { useEffect, useState } from "react";
import CartButton from '../components/Card_Produit/CartButton';
import ProductCard from '../components/Card_Produit/ProductCard'; 
import Carousel from '../components/carousel/Carousel'
import NavigBare from '../components/NavigBare';
import styles from './module1.css'
import { use } from 'react';
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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <div>
      <NavigBare />
      <Carousel/>
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative mb-8">
        <h1 className="text-3xl font-bold text-white text-center">Nos Produits</h1>
        <div className="absolute top-0 right-0">
          <CartButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center pl-524">
      {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
}
