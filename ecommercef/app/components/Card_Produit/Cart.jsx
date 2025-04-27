'use client';

import { useCart } from './CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



export default function Cart({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };


  const router = useRouter();
  const handleCheckout = () => {
    onClose(); // Ferme le panier
    router.push('/checkout'); // Redirige vers la page checkout
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Votre Panier</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg font-medium">Votre panier est vide</p>
            <button 
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            >
              Continuer vos achats
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity} = 
                      <span className="font-medium ml-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                    <div className="flex items-center mt-2 space-x-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg">-</span>
                      </button>
                      <span className="w-10 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span className="text-blue-600">${calculateTotal()}</span>
              </div>
              <button 
                onClick={handleCheckout} // Ajoutez le gestionnaire onClick
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Passer la commande 
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
