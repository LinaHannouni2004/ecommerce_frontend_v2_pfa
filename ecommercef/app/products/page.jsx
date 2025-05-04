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
    name: "Apple iMac 27\", 1TB HDD, Retina 5K Display, M3 Max",
    price: 1699,
    discount: "Up to 35% off",
    rating: 5.0,
    reviews: 455,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg",
    category: "Computers"
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max, 256GB, Blue Titanium",
    price: 1199,
    discount: "Up to 15% off",
    rating: 4.9,
    reviews: 1233,
    delivery: "Best Seller",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg",
    category: "Phones"
  },
  {
    id: 3,
    name: "iPad Pro 13-Inch (M4): XDR Display, 512GB",
    price: 799,
    discount: "Up to 35% off",
    rating: 4.9,
    reviews: 879,
    delivery: "Shipping Today",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg",
    category: "Tablets"
  },
  {
    id: 4,
    name: "PlayStation®5 Console - 1TB, PRO Controller",
    price: 499,
    discount: "Up to 10% off",
    rating: 4.8,
    reviews: 2957,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg",
    category: "Gaming"
  },
  {
    "id": 5,
    "name": "PlayStation®5 Console - 1TB, PRO Controller",
    "price": 499,
    "discount": "Up to 10% off",
    "rating": 4.8,
    "reviews": 2957,
    "delivery": "Fast Delivery",
    "priceTag": "Best Price",
    "image": "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg",
    "category": "Gaming"
  },
  {
    "id": 6,
    "name": "Apple MacBook PRO Laptop with M2 chip",
    "price": 2599,
    "discount": "Up to 5% off",
    "rating": 4.9,
    "reviews": 1076,
    "delivery": "Fast Delivery",
    "priceTag": "Best Price",
    "image": "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg",
    "category": "Laptops"
  },
  {
    "id": 7,
    "name": "Apple Watch SE [GPS 40mm], Smartwatch",
    "price": 699,
    "discount": "Up to 20% off",
    "rating": 4.7,
    "reviews": 387,
    "delivery": "Fast Delivery",
    "priceTag": "Best Price",
    "image": "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg",
    "category": "Wearables"
  },
  {
    "id": 8,
    "name": "Microsoft Surface Pro, Copilot+ PC, 13 Inch",
    "price": 899,
    "discount": "Up to 35% off",
    "rating": 4.9,
    "reviews": 4775,
    "delivery": "Fast Delivery",
    "priceTag": "Best Price",
    "image": "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard-dark.svg",
    "category": "Tablets"
  },
  {
    "id": 9,
    "name": "Microsoft Surface Pro, Copilot+ PC, 13 Inch",
    "price": 899,
    "discount": "Up to 35% off",
    "rating": 4.9,
    "reviews": 4775,
    "delivery": "Fast Delivery",
    "priceTag": "Best Price",
    "image": "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard-dark.svg",
    "category": "Tablets"
  }
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center pl-524 " 
      >
      {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
}
