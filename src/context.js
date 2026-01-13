import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://www.course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCartItems = async () => {
    try {
      dispatch({ type: 'LOADING', payload: true });
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const cart = await response.json();
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.log('CORS or Network Error:', error.message);
      console.log('Falling back to local data');
    } finally {
      dispatch({ type: 'LOADING', payload: false });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const getTotals = () => {
    dispatch({ type: 'GET_TOTALS' });
  };

  const getCart = () => {
    dispatch({ type: 'GET_CART' });
  };

  const toggleAmount = (id, type) => {
    const payload = { id, type };
    dispatch({ type: 'TOGGLE_AMOUNT', payload });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        getTotals,
        getCart,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
