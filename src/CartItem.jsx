import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Utiliser useSelector pour accéder au tableau d'articles du panier depuis le store Redux
  const cart = useSelector(state => state.cart.items);
  
  // Utiliser useDispatch pour envoyer des actions au store Redux
  const dispatch = useDispatch();

  // Calculer le coût total de tous les articles dans le panier
  // On utilise reduce pour additionner (quantité × coût) de chaque article
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      return total + (item.quantity * item.cost);
    }, 0).toFixed(2); // Arrondir à 2 décimales
  };

  // Calculer le nombre total d'articles dans le panier
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Fonction pour gérer le changement de quantité d'un article
  const handleQuantityChange = (item, newQuantity) => {
    // Vérifier que la nouvelle quantité est valide (au moins 1)
    if (newQuantity >= 1) {
      // Dispatcher l'action updateQuantity avec le nom de l'article et la nouvelle quantité
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  // Fonction pour incrémenter la quantité d'un article (+1)
  const handleIncrement = (item) => {
    handleQuantityChange(item, item.quantity + 1);
  };

  // Fonction pour décrémenter la quantité d'un article (-1)
  const handleDecrement = (item) => {
    // Ne décrémenter que si la quantité est supérieure à 1
    if (item.quantity > 1) {
      handleQuantityChange(item, item.quantity - 1);
    }
  };

  // Fonction pour supprimer complètement un article du panier
  const handleRemove = (item) => {
    // Dispatcher l'action removeItem avec le nom de l'article à supprimer
    dispatch(removeItem(item.name));
  };

  // Calculer le sous-total pour un article spécifique (quantité × prix)
  const calculateTotalCost = (item) => {
    return (item.quantity * item.cost).toFixed(2);
  };

  // Fonction pour continuer les achats (retourner à la liste des produits)
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // Fonction pour gérer le checkout (paiement)
  const handleCheckout = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      {/* En-tête du panier */}
      <div className="cart-header">
        <h2>🛒 Your Shopping Cart</h2>
        <p className="cart-summary">
          {calculateTotalItems()} {calculateTotalItems() === 1 ? 'item' : 'items'} in cart
        </p>
      </div>

      {/* Vérifier si le panier est vide */}
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="#ccc">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any plants yet</p>
          <button onClick={handleContinueShopping} className="continue-shopping-btn">
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Liste des articles dans le panier */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item-card">
                {/* Image du produit */}
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Détails du produit */}
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-price">${item.cost} per item</p>
                </div>

                {/* Contrôles de quantité */}
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleDecrement(item)}
                      className="quantity-btn"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => handleIncrement(item)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  {/* Sous-total pour cet article */}
                  <div className="cart-item-subtotal">
                    <span className="subtotal-label">Subtotal:</span>
                    <span className="subtotal-amount">${calculateTotalCost(item)}</span>
                  </div>

                  {/* Bouton de suppression */}
                  <button 
                    onClick={() => handleRemove(item)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé du panier */}
          <div className="cart-summary-section">
            <div className="cart-total">
              <div className="total-row">
                <span className="total-label">Subtotal ({calculateTotalItems()} items):</span>
                <span className="total-amount">${calculateTotalAmount()}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Shipping:</span>
                <span className="total-amount free">FREE</span>
              </div>
              <div className="total-row total-final">
                <span className="total-label">Total:</span>
                <span className="total-amount">${calculateTotalAmount()}</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="cart-actions">
              <button 
                onClick={handleContinueShopping}
                className="continue-shopping-btn"
              >
                ← Continue Shopping
              </button>
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
