'use client';

import { useEffect, useState } from "react";
import "./productpage.css";
import { useCart } from '../../components/Card_Produit/CartContext';

const mockProducts = [
  {
    id: 1,
    name: "Appareil Photo Canon EOS R5",
    price: 3899.99,
    originalPrice: 4299.99,
    image: "/images/camerasony.jpg",
    category: "Photographie",
    sizes: ["Body Only", "With 24-105mm Lens", "Full Kit"]
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M2 Max",
    price: 3499.99,
    image: "/images/macbook.jpg",
    category: "Informatique",
    sizes: ["32GB/1TB", "64GB/2TB", "96GB/4TB"]
  },
  {
    id: 3,
    name: "Casque Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    image: "/images/headphones.jpg",
    category: "Audio",
    sizes: ["Black", "Silver", "Blue"]
  }
];

const sampleReviews = [
  {
    id: 1,
    productId: 1,
    name: "Photography Pro",
    rating: 5,
    comment: "The autofocus is incredible. 8K video is game-changing.",
    date: "2023-06-15"
  },
  {
    id: 2,
    productId: 1,
    name: "DSLR User",
    rating: 4,
    comment: "Amazing quality but battery life could be better.",
    date: "2023-05-28"
  },
  {
    id: 3,
    productId: 2,
    name: "Developer",
    rating: 5,
    comment: "Compiles code in half the time of my old Intel MacBook.",
    date: "2023-04-10"
  }
];

const getProductDetails = (category) => {
  switch(category) {
    case "Photographie":
      return {
        description: "The Canon EOS R5 redefines hybrid camera performance with 45MP sensor and 8K video.",
        features: [
          "45MP Full-Frame CMOS Sensor",
          "8K 30p & 4K 120p Video",
          "Advanced Dual Pixel AF",
          "In-Body Image Stabilization",
          "High-Speed Shooting"
        ],
        specs: {
          "Sensor": "Full-Frame CMOS",
          "Resolution": "45MP",
          "ISO": "100-51200",
          "Video": "8K RAW",
          "LCD": "3.2\" Touchscreen",
          "Weight": "738g"
        }
      };
    case "Informatique":
      return {
        description: "MacBook Pro 16\" with M2 Max delivers unprecedented performance.",
        features: [
          "M2 Max 12-core CPU",
          "38-core GPU",
          "Up to 96GB memory",
          "Liquid Retina XDR",
          "22h battery life"
        ],
        specs: {
          "Processor": "M2 Max 12-core",
          "GPU": "38-core",
          "Memory": "32GB unified",
          "Storage": "1TB SSD",
          "Display": "16.2\" Retina XDR",
          "Ports": "HDMI, Thunderbolt 4"
        }
      };
    case "Audio":
      return {
        description: "Sony WH-1000XM5 with industry-leading noise cancellation.",
        features: [
          "Industry-leading ANC",
          "30-hour battery",
          "Auto NC Optimizer",
          "Hi-Res Audio",
          "Multipoint connection"
        ],
        specs: {
          "Driver": "30mm",
          "Frequency": "4Hz-40kHz",
          "ANC": "Yes",
          "Battery": "30 hours",
          "Weight": "250g",
          "Bluetooth": "5.2"
        }
      };
    default:
      return {
        description: "Premium quality product.",
        features: ["High quality", "Excellent performance"],
        specs: {"Type": "Standard"}
      };
  }
};

export default function ProductPage({ params }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!params?.id) return;

    const foundProduct = mockProducts.find(p => p.id.toString() === params.id);
    setProduct(foundProduct);
    
    const productReviews = sampleReviews.filter(r => r.productId.toString() === params.id);
    setReviews(productReviews);
    
    if (foundProduct?.sizes) {
      setSelectedSize(foundProduct.sizes[0]);
    }
    
    setLoading(false);
  }, [params]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      id: Date.now(),
      productId: params.id,
      name: newReview.name || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    setQuantity(newQuantity);
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!product) {
    return <div className="error-container">Product not found</div>;
  }

  const productDetails = getProductDetails(product.category);

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-card">
          <div className="product-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
          </div>

          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
            </div>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < 4 ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <span className="rating-value">4.8</span>
              <span className="review-count">({reviews.length} Review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
            
            <div className="product-pricing">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <p className="product-description">
              {productDetails.description}
            </p>

            {product.sizes && (
              <div className="size-options">
                <h2 className="size-options-title">Size/Options</h2>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

<div className="product-actions">
            <div className="quantity-selector">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="quantity-button minus"
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="quantity-button plus"
              >
                +
              </button>
            </div>
            <button 
              className="add-to-cart-button"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
              })}
            >
              <span className="cart-icon">🛒</span>
              Add To Cart
            </button>
          </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-icon">#</span>
                <span>SKU: {product.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📁</span>
                <span>Category: {product.category}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs-container">
          <div className="tabs-navigation">
            <button 
              onClick={() => setActiveTab("description")}
              className={`tab-button ${activeTab === "description" ? 'active' : ''}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("additional")}
              className={`tab-button ${activeTab === "additional" ? 'active' : ''}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`tab-button ${activeTab === "reviews" ? 'active' : ''}`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-content">
                <h3 className="content-title">Product Details</h3>
                <p className="content-text">
                  {productDetails.description}
                </p>
                
                <div className="features-list">
                  <h4 className="features-title">Key Features</h4>
                  <ul>
                    {productDetails.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="specifications-content">
                <h3 className="content-title">Technical Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(productDetails.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <div className="spec-key">{key}</div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-content">
                <h3 className="content-title">Customer Reviews</h3>
                
                <div className="review-form-container">
                  <h4 className="form-title">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="review-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name (optional)</label>
                      <input
                        type="text"
                        id="name"
                        value={newReview.name}
                        onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <div className="rating-selector">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`rating-star ${star <= newReview.rating ? 'selected' : ''}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="comment" className="form-label">Review</label>
                      <textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
        
                        className="form-textarea"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="submit-review-button">
                      Submit Review
                    </button>
                  </form>
                </div>
                
                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="review-rating">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </div>
                          <div className="review-meta">
                            <span className="review-author">{review.name}</span>
                            <span className="review-date">{review.date}</span>
                          </div>
                        </div>
                        <p className="review-text">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}