// Import the configureStore function from Redux Toolkit
// This function simplifies the process of creating a Redux store
import { configureStore } from '@reduxjs/toolkit';

// Import the cartReducer from CartSlice.jsx
// This reducer manages the shopping cart state slice
import cartReducer from './CartSlice';

// Create a Redux store using configureStore from Redux Toolkit
const store = configureStore({
    // Define the root reducer object
    reducer: {
        // 'cart' is the name of the slice in the store, and it's managed by cartReducer
        // This means the cart state will be accessible via state.cart in the application
        cart: cartReducer,
    },
});

// Export the store for use in the app (e.g., in <Provider store={store}>)
// This allows all components wrapped in the Provider to access the Redux store
export default store;
