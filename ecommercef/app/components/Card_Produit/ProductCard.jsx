'use client';
import { useCart } from './CartContext';
import Link from 'next/link';
import { use } from 'react';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  // Gère le clic sur le bouton panier sans propager l'événement au lien parent
  const handleCartAction = (e) => {
    e.stopPropagation();
    e.preventDefault();
    inCart ? removeFromCart(product.id) : addToCart(product);
  };

  return (
    <Link 
      href={`/products/${product.id}`}
      className="flex flex-col w-full max-w-xs rounded-xl overflow-hidden ml-[30cm] hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image + prix avec dégradé */}
      <div className="relative bg-gradient-to-t from-gray-200 to-white p-6 flex justify-center items-center h-80 rounded-t-xl">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="max-h-full object-contain"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-lg font-bold px-2 py-1 rounded">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Description + bouton */}
      <div className="bg-transparent py-6 px-4 text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description || 'No description available'}
        </p>

        <div className="mt-6">
          <button
            onClick={handleCartAction}
            className={`w-full py-3 px-4 rounded-lg transition ${
              inCart 
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {inCart ? 'Remove from bag' : 'Add to bag'}
          </button>
        </div>
      </div>
    </Link>
  );
}