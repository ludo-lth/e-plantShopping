import { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

function App() {
  // État local pour gérer l'affichage du panier ou des produits
  const [showCart, setShowCart] = useState(false);
  
  // État local pour gérer l'affichage de la page "About Us"
  const [showAboutUs, setShowAboutUs] = useState(false);

  // Utiliser useSelector pour accéder au nombre total d'articles dans le panier depuis le store Redux
  // On accède à state.cart.items (le tableau d'items) et on compte sa longueur
  const cartItemCount = useSelector(state => state.cart.items.length);

  // Fonction pour afficher ou masquer le panier
  const handleCartClick = () => {
    setShowCart(true);
    setShowAboutUs(false);
  };

  // Fonction pour retourner à la liste des produits
  const handlePlantsClick = () => {
    setShowCart(false);
    setShowAboutUs(false);
  };

  // Fonction pour afficher la page About Us
  const handleAboutUsClick = () => {
    setShowAboutUs(true);
    setShowCart(false);
  };

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <div className="navbar">
        {/* Logo et titre du site */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div className="navbar-title">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
          </div>
        </div>

        {/* Menu de navigation */}
        <div className="navbar-menu">
          <button 
            onClick={handlePlantsClick} 
            className={`navbar-link ${!showCart && !showAboutUs ? 'active' : ''}`}
          >
            Plants
          </button>
          <button 
            onClick={handleAboutUsClick} 
            className={`navbar-link ${showAboutUs ? 'active' : ''}`}
          >
            About Us
          </button>
          <button 
            onClick={handleCartClick} 
            className="cart-icon"
            aria-label="Shopping Cart"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {/* Badge avec le nombre d'articles dans le panier */}
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="main-content">
        {/* Affichage conditionnel du panier */}
        {showCart ? (
          <CartItem onContinueShopping={handlePlantsClick} />
        ) : showAboutUs ? (
          // Page About Us
          <div className="about-us-container">
            <h1>About Paradise Nursery</h1>
            <div className="about-us-content">
              <div className="about-us-section">
                <h2>🌿 Our Story</h2>
                <p>
                  Welcome to Paradise Nursery, where green meets serenity! Founded in 2020, 
                  we are passionate about bringing the beauty of nature into your home. 
                  Our carefully curated collection of houseplants is designed to enhance 
                  your living space while purifying the air you breathe.
                </p>
              </div>

              <div className="about-us-section">
                <h2>🌱 Our Mission</h2>
                <p>
                  We believe that every home deserves a touch of nature. Our mission is to 
                  provide high-quality, healthy plants along with expert advice to help you 
                  create your own green paradise. Whether you're a seasoned plant parent or 
                  just starting your journey, we're here to support you every step of the way.
                </p>
              </div>

              <div className="about-us-section">
                <h2>✨ Why Choose Us?</h2>
                <ul>
                  <li>🌿 Premium quality plants sourced from trusted growers</li>
                  <li>🌿 Expert care guides and ongoing support</li>
                  <li>🌿 Wide variety of air-purifying and low-maintenance plants</li>
                  <li>🌿 Sustainable and eco-friendly practices</li>
                  <li>🌿 Fast and secure delivery</li>
                </ul>
              </div>

              <div className="about-us-section">
                <h2>🌍 Our Commitment</h2>
                <p>
                  At Paradise Nursery, we are committed to sustainability and environmental 
                  responsibility. We use eco-friendly packaging and partner with growers who 
                  share our values of ethical and sustainable plant cultivation.
                </p>
              </div>

              <div className="about-us-cta">
                <h3>Ready to start your plant journey?</h3>
                <button onClick={handlePlantsClick} className="cta-button">
                  Browse Our Plants
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Liste des produits
          <ProductList />
        )}
      </main>
    </div>
  );
}

export default App;
