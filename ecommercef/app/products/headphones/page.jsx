'use client';
import ProductCard from '../../components/Card_Produit/ProductCard';
import Link from 'next/link';
import NavigBare from '../../components/NavigBare'

const HeadphonesProducts = [{
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

  {
    id: 2,
      name: "Apple Watch Series 9",
      price: 429,
      image: "https://example.com/apple-watch.jpg",
      rating: 4.8,
      description: "Montre connectée avec écran Retina",
      reviews: 1250, // Ajoutez cette propriété
      delivery: "Livraison gratuite", // Optionnel
      priceTag: "Meilleur prix" // Optionnel
    },
    {
      id: 3,
        name: "Apple Watch Series 9",
        price: 429,
        image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard-dark.svg",
        rating: 4.8,
        description: "Montre connectée avec écran Retina",
        reviews: 1250, // Ajoutez cette propriété
        delivery: "Livraison gratuite", // Optionnel
        priceTag: "Meilleur prix" // Optionnel
      },
      {
        id: 4,
          name: "Apple Watch Series 9",
          price: 429,
          image: "https://example.com/apple-watch.jpg",
          rating: 4.8,
          description: "Montre connectée avec écran Retina",
          reviews: 1250, // Ajoutez cette propriété
          delivery: "Livraison gratuite", // Optionnel
          priceTag: "Meilleur prix" // Optionnel
        },
        {
          id: 5,
            name: "Apple Watch Series 9",
            price: 429,
            image: "https://example.com/apple-watch.jpg",
            rating: 4.8,
            description: "Montre connectée avec écran Retina",
            reviews: 1250, // Ajoutez cette propriété
            delivery: "Livraison gratuite", // Optionnel
            priceTag: "Meilleur prix" // Optionnel
          },
          {
            id: 6,
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

export default function HeadphonesPage() {
  return (
       <div>
    <NavigBare/>
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Headphones </h1>
         
          <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {HeadphonesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}