'use client';
import { useCart } from './CartContext';
// ProductCard gère l’affichage et la logique du panier pour chaque produit //
export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
<div className="flex flex-col w-full max-w-xs rounded-xl overflow-hidden ml-[30cm]">
    
      {/* Image + prix avec dégradé */}
      <div className="relative bg-gradient-to-t from-gray-200 to-white p-6 flex justify-center items-center h-80 rounded-t-xl">
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          className="max-h-full object-contain"
        />
        <span className="absolute bottom-2 right-2 text-white text-lg font-bold">
          ${product.price}
        </span>
      </div>

      {/* Description + bouton */}
      <div className="bg-transparent py-6 px-4 text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>

        <div className="mt-6">
          <button
          onClick={() =>
            inCart ? removeFromCart(product.id) : addToCart(product)
          }
          className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            {inCart ? 'Remove from bag' : 'Add to bag'}
          </button>
        </div>
      </div>
    </div>
  );
}
