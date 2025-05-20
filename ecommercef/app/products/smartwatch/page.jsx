'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card_Produit/ProductCard';
import Link from 'next/link';
import NavigBare from '../../components/NavigBare';
import { FiChevronRight, FiX, FiFilter, FiCheck, FiShoppingCart, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../components/Card_Produit/CartContext';
import CartButton from "../../components/Card_Produit/CartButton";

const colorOptions = [
  { name: "Noir", value: "black", bg: "bg-gray-900", border: "border-gray-700", text: "text-gray-900" },
  { name: "Argent", value: "silver", bg: "bg-gray-300", border: "border-gray-400", text: "text-gray-700" },
  { name: "Blanc", value: "white", bg: "bg-white", border: "border-gray-300", text: "text-gray-700" },
  { name: "Bleu", value: "blue", bg: "bg-blue-500", border: "border-blue-600", text: "text-blue-700" },
  { name: "Vert", value: "green", bg: "bg-emerald-500", border: "border-emerald-600", text: "text-emerald-700" },
  { name: "Rose", value: "pink", bg: "bg-pink-400", border: "border-pink-500", text: "text-pink-700" },
];

export default function SmartwatchePage() {
  const { cartItems } = useCart();
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSmartwatches = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/products/category/smartwatch');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des smartwatches');
        }
        
        const data = await response.json();
        setProducts(data.content || data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSmartwatches();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (colorFilter && product.color !== colorFilter) return false;
    if (priceFilter === 'under50' && product.price >= 50) return false;
    if (priceFilter === '50to200' && (product.price < 50 || product.price > 200)) return false;
    if (priceFilter === 'over200' && product.price <= 200) return false;
    return true;
  });

  const clearAllFilters = () => {
    setColorFilter('');
    setPriceFilter('');
    setSearchQuery('');
  };

  const priceFilters = [
    { id: 'under50', label: 'Moins de 50€' },
    { id: '50to200', label: '50€ - 200€' },
    { id: 'over200', label: 'Plus de 200€' }
  ];

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;
  return (
    <div className="bg-black text-gray-100 min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <CartButton />
      </div>
      <NavigBare />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="mb-8 text-center">
          <div className="flex items-center text-sm text-gray-400 mb-2 justify-center">
            <Link href="/products" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <FiChevronRight className="mx-2" />
            <span>smartwatches</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 uppercase">Smartwatches</h1>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 mb-6 px-4 py-3 bg-gray-800 rounded-xl text-white shadow-lg mx-auto"
        >
          <FiFilter className="text-white" />
          <span>Filtres</span>
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 sticky top-24 shadow-xl shadow-black/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FiFilter className="text-blue-400" />
                  Filtres
                </h2>
                {(colorFilter || priceFilter || searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <FiX size={16} />
                    Tout effacer
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Recherche</h3>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white"
                  placeholder="Nom du produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Couleurs</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setColorFilter(colorFilter === color.name ? '' : color.name)}
                      className={`rounded-full w-8 h-8 ${color.bg} border-2 ${color.border} ${colorFilter === color.name ? 'ring-2 ring-blue-500' : ''}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Prix</h3>
                <div className="space-y-2">
                  {priceFilters.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setPriceFilter(priceFilter === id ? '' : id)}
                      className={`w-full text-left px-4 py-2 rounded-lg ${priceFilter === id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">Aucun produit trouvé</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </motion.div>
    </div>
  );
}
