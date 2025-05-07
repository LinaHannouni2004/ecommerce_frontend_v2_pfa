'use client'
import Link from 'next/link'
import { useCart } from './CartContext'
import SearchBar from '../SearchBar'

export default function CartButton() {
  const { itemCount } = useCart()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
      {/* Barre de recherche */}
      <div className="w-64"
      style={{
        position:"fixed",
       right: "50px",
       zIndex: 50 ,
       top: "16px",
        
      }}
      >
        <SearchBar />
      </div>
      
      {/* Bouton panier */}
      <Link 
        href="/cart"
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        {/* Badge de notification */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {itemCount}
          </span>
        )}

        {/* Icône panier */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="h-6 w-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
          />
        </svg>
      </Link>
    </div>
  )
}