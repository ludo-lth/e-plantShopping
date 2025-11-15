import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import './App.css';
import CartItem from './CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // 🛒 Récupérer les items du panier depuis Redux
  const cartItems = useSelector((state) => state.cart.items);

  // 🔢 Calculer le nombre total d'articles dans le panier
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  const handleAddToCart = (product) => {
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  return (
    <div className="app-container">
      {/* Landing Page */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <div className="aboutus_content">
              <h2>About Us</h2>
              <p>
                Welcome to Paradise Nursery, where green meets serenity! We are passionate about bringing nature closer to you. Our mission is to provide a wide range of high-quality plants that not only beautify your space but also contribute to a healthier and more sustainable environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <div className="navbar" style={styles.navbar}>
          <div className="navbar-brand" style={styles.navbarBrand}>
            <h2 style={styles.brandText}>Paradise Nursery</h2>
          </div>
          <div className="navbar-links" style={styles.navbarLinks}>
            <button style={styles.linkButton}>Plants</button>
            
            {/* 🛒 Icône du panier avec badge */}
            <div className="cart" onClick={handleCartClick} style={styles.cartContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={styles.cartIcon}
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              
              {/* 🔴 Badge avec le nombre total d'articles */}
              {totalItems > 0 && (
                <span className="cart-badge" style={styles.cartBadge}>
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Affichage conditionnel : Panier ou Liste de produits */}
        {showCart ? (
          <CartItem onContinueShopping={handleContinueShopping} />
        ) : (
          <ProductList onAddToCart={handleAddToCart} addedToCart={addedToCart} />
        )}
      </div>
    </div>
  );
}

// 🎨 Styles en ligne
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: '15px 30px',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navbarBrand: {
    display: 'flex',
    alignItems: 'center',
  },
  brandText: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navbarLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  cartContainer: {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  cartIcon: {
    width: '28px',
    height: '28px',
    color: 'white',
    transition: 'transform 0.2s ease',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    border: '2px solid white',
    zIndex: 10,
    animation: 'pop 0.3s ease',
  },
};

export default App;
