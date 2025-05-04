'use client';
import ProductCard from '../../components/Card_Produit/ProductCard';
import Link from 'next/link';

const smartwatchProducts = [{
  id: 1,
    name: "Apple Watch Series 9",
    price: 429,
    image: "https://example.com/apple-watch.jpg",
    rating: 4.8,
    description: "Montre connectée avec écran Retina",
    reviews: 1250, // Ajoutez cette propriété
    delivery: "Livraison gratuite", // Optionnel
    priceTag: "Meilleur prix" // Optionnel
  },
  // Ajoutez d'autres produits...
];

export default function SmartwatchPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Smartwatch</h1>
          <p className="text-gray-600">
            Accès rapide aux notifications, appels, messages et plus
          </p>
          <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {smartwatchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}