'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/Card_Produit/ProductCard';
import Link from 'next/link';
import NavigBare from '../../components/NavigBare';
import { FiChevronRight, FiX, FiFilter, FiCheck, FiShoppingCart, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../components/Card_Produit/CartContext';
import CartButton from "../../components/Card_Produit/CartButton";
const SmartwatcheProducts = [
  {
    id: 1,
    name: "Apple Watch Series 9 [GPS 41mm]",
    price: 399,
    originalPrice: 429,
    discount: "Up to 7% off",
    rating: 4.8,
    reviews: 845,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/apple-watch-series9.jpg",
    category: "Smartwatches",
    sizes: ["41mm", "45mm"],
    description: "The Apple Watch Series 9 delivers powerful health features and seamless connectivity.",
    features: [
      "S9 chip",
      "Blood oxygen app",
      "Always-On Retina display",
      "Water resistant",
      "GPS"
    ],
    specs: {
      Display: "Always-On Retina",
      Chip: "S9 SiP",
      Battery: "Up to 18 hours",
      Connectivity: "Bluetooth, Wi-Fi, GPS",
      WaterResistance: "50 meters"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy Watch 6 Classic 47mm",
    price: 349,
    originalPrice: 379,
    discount: "Up to 8% off",
    rating: 4.6,
    reviews: 632,
    delivery: "Fast Delivery",
    priceTag: "Hot Deal",
    image: "/images/galaxy-watch6.jpg",
    category: "Smartwatches",
    sizes: ["43mm", "47mm"],
    description: "Galaxy Watch 6 Classic with rotating bezel and enhanced health tracking.",
    features: [
      "Rotating bezel",
      "Advanced sleep tracking",
      "Body composition analysis",
      "Sapphire crystal glass",
      "Wear OS by Google"
    ],
    specs: {
      Display: "1.5-inch Super AMOLED",
      Chip: "Exynos W930",
      Battery: "Up to 40 hours",
      Sensors: "BioActive, Accelerometer, ECG",
      Connectivity: "Bluetooth, LTE (optional)"
    }
  },
  {
    id: 3,
    name: "Garmin Venu 3 Smartwatch",
    price: 399.99,
    originalPrice: 449.99,
    discount: "Up to 11% off",
    rating: 4.7,
    reviews: 521,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/garmin-venu3.jpg",
    category: "Smartwatches",
    sizes: ["Standard", "Music Edition"],
    description: "Garmin Venu 3 provides health insights and GPS tracking in a sleek design.",
    features: [
      "AMOLED display",
      "Built-in GPS",
      "Heart rate sensor",
      "Sleep tracking",
      "Voice Assistant"
    ],
    specs: {
      Display: "1.4-inch AMOLED",
      Battery: "Up to 14 days",
      Sensors: "Pulse Ox, HR, SpO2",
      WaterRating: "5 ATM",
      Connectivity: "Bluetooth, Wi-Fi"
    }
  },
  {
    id: 4,
    name: "Fitbit Versa 4",
    price: 199,
    originalPrice: 229,
    discount: "Up to 13% off",
    rating: 4.5,
    reviews: 678,
    delivery: "Fast Delivery",
    priceTag: "Top Rated",
    image: "/images/fitbit-versa4.jpg",
    category: "Smartwatches",
    sizes: ["S", "L"],
    description: "Stay active and monitor your health with Fitbit Versa 4.",
    features: [
      "Built-in GPS",
      "Daily Readiness Score",
      "Heart rate monitor",
      "Google Wallet & Maps",
      "Active Zone Minutes"
    ],
    specs: {
      Display: "Color touchscreen",
      Battery: "Up to 6 days",
      Connectivity: "Bluetooth",
      WaterResistance: "50m",
      Sensors: "Heart Rate, SpO2"
    }
  },
  {
    id: 5,
    name: "Huawei Watch GT 4",
    price: 299.99,
    originalPrice: 339.99,
    discount: "Up to 12% off",
    rating: 4.6,
    reviews: 418,
    delivery: "Fast Delivery",
    priceTag: "Best Value",
    image: "/images/huawei-watchgt4.jpg",
    category: "Smartwatches",
    sizes: ["46mm", "41mm"],
    description: "Huawei GT 4 offers long battery life and fitness tracking with elegant design.",
    features: [
      "14-day battery",
      "SpO2 monitoring",
      "Built-in GPS",
      "Health tracking",
      "Smart notifications"
    ],
    specs: {
      Display: "1.43-inch AMOLED",
      Battery: "Up to 14 days",
      Sensors: "Heart Rate, SpO2, GPS",
      OS: "HarmonyOS",
      Connectivity: "Bluetooth"
    }
  },
  {
    id: 6,
    name: "TicWatch Pro 5 Wear OS Smartwatch",
    price: 329.99,
    originalPrice: 379.99,
    discount: "Up to 13% off",
    rating: 4.4,
    reviews: 297,
    delivery: "Fast Delivery",
    priceTag: "Best Seller",
    image: "/images/ticwatch-pro5.jpg",
    category: "Smartwatches",
    sizes: ["Standard"],
    description: "TicWatch Pro 5 features dual-layer display and Snapdragon W5+ Gen 1 chip.",
    features: [
      "Dual display tech",
      "Wear OS",
      "100+ sport modes",
      "Long battery life",
      "IP68 rated"
    ],
    specs: {
      Chip: "Snapdragon W5+ Gen 1",
      Battery: "Up to 80 hours",
      Display: "AMOLED + FSTN",
      WaterRating: "IP68",
      OS: "Wear OS 3"
    }
  },
  {
    id: 7,
    name: "Amazfit GTR 4 Smartwatch",
    price: 199.99,
    originalPrice: 239.99,
    discount: "Up to 17% off",
    rating: 4.3,
    reviews: 214,
    delivery: "Shipping Today",
    priceTag: "Budget Pick",
    image: "/images/amazfit-gtr4.jpg",
    category: "Smartwatches",
    sizes: ["46mm"],
    description: "Amazfit GTR 4 is a stylish smartwatch with GPS and long battery life.",
    features: [
      "Ultra-accurate GPS",
      "Heart rate & SpO2",
      "150+ sports modes",
      "Alexa built-in",
      "10-day battery"
    ],
    specs: {
      Display: "1.43-inch AMOLED",
      Battery: "Up to 14 days",
      Connectivity: "Bluetooth, Wi-Fi",
      Sensors: "BioTracker PPG",
      WaterRating: "5 ATM"
    }
  },
  {
    id: 8,
    name: "Fossil Gen 6 Wellness Edition",
    price: 229,
    originalPrice: 299,
    discount: "Up to 23% off",
    rating: 4.1,
    reviews: 183,
    delivery: "Fast Delivery",
    priceTag: "On Sale",
    image: "/images/fossil-gen6.jpg",
    category: "Smartwatches",
    sizes: ["44mm"],
    description: "Fossil Gen 6 offers smart features with stylish design and wellness tracking.",
    features: [
      "Wear OS",
      "SpO2 & heart tracking",
      "Alexa built-in",
      "Fast charging",
      "Touchscreen"
    ],
    specs: {
      Display: "1.28-inch AMOLED",
      Chip: "Snapdragon Wear 4100+",
      Battery: "24+ hours",
      Connectivity: "Bluetooth, Wi-Fi",
      Sensors: "Heart, SpO2"
    }
  },
  {
    id: 9,
    name: "Redmi Watch 4 Smartwatch",
    price: 99.99,
    originalPrice: 129.99,
    discount: "Up to 23% off",
    rating: 4.2,
    reviews: 312,
    delivery: "Fast Delivery",
    priceTag: "Best Price",
    image: "/images/redmi-watch4.jpg",
    category: "Smartwatches",
    sizes: ["45mm"],
    description: "Redmi Watch 4 is a budget-friendly smartwatch with AMOLED display and fitness features.",
    features: [
      "1.97-inch AMOLED",
      "Heart rate tracking",
      "100+ sport modes",
      "Waterproof",
      "Up to 20 days battery"
    ],
    specs: {
      Display: "1.97-inch AMOLED",
      Battery: "Up to 20 days",
      WaterResistance: "5 ATM",
      Sensors: "Heart, Sleep",
      Connectivity: "Bluetooth 5.3"
    }
  }
];


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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = SmartwatcheProducts.filter(product => {
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

  return (
   
       <div className="bg-black text-gray-100 min-h-screen">
         
           <div className="fixed top-4 right-4 z-50">
              <CartButton />
            </div>
      <NavigBare /> {/* <--- Bouton panier intégré ici dans NavigBare */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* En-tête centré */}
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

        {/* Filtres mobile */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 mb-6 px-4 py-3 bg-gray-800 rounded-xl text-white shadow-lg mx-auto"
        >
          <FiFilter className="text-white" />
          <span>Filtres</span>
        </motion.button>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtres (sidebar desktop) */}
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

              {/* Recherche */}
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

              {/* Couleurs */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Couleurs</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setColorFilter(colorFilter === color.name ? '' : color.name)}
                      className={`rounded-full w-8 h-8 ${color.bg} border-2 ${color.border} ${
                        colorFilter === color.name ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Prix</h3>
                <div className="space-y-2">
                  {priceFilters.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setPriceFilter(priceFilter === id ? '' : id)}
                      className={`w-full text-left px-4 py-2 rounded-lg ${
                        priceFilter === id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grille produits */}
          <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </main>
        </div>
      </motion.div>
    </div>
  );
}