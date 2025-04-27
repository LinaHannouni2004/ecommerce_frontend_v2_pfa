'use client';
import { useState } from 'react';
import { useCart } from './CartContext';
import Cart from './Cart';

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200"
      >
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      {isOpen && <Cart onClose={() => setIsOpen(false)} />}
    </div>
  );
}
