import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  
  // 🛒 Récupérer les items du panier depuis Redux
  const cartItems = useSelector(state => state.cart.items);

  // 📊 Calculer le montant total du panier
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      // Extraire le prix numérique (enlever le symbole $)
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  // 📦 Calculer le nombre total d'articles
  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // ➕ Incrémenter la quantité d'un article
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // ➖ Décrémenter la quantité d'un article
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Si quantité > 1, on diminue de 1
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      // Si quantité = 1, on supprime l'article
      dispatch(removeItem(item.name));
    }
  };

  // 🗑️ Supprimer un article du panier
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 💳 Calculer le coût d'un article (prix × quantité)
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  // 🛍️ Fonction pour continuer les achats
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // 💰 Fonction pour procéder au paiement
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
          <div className="cart-summary">
            <div className="cart-summary-item">
              <span>Total Items:</span>
              <span className="cart-summary-value">{calculateTotalQuantity()}</span>
            </div>
            <div className="cart-summary-item">
              <span>Total Amount:</span>
              <span className="cart-summary-value">${calculateTotalAmount()}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="continue_shopping_btn">
        <button 
          className="get-started-button" 
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button 
          className="get-started-button1" 
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
