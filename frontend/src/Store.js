import { createContext, useReducer } from 'react';

export const Store = createContext();

// JSON.parse {getItem('xxxxx')} convert to javascript obj
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : '',
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existItem) {
        const cartItems = state.cart.cartItems.map((item) => {
          if (item._id === existItem._id) {
            return newItem;
          } else {
            return item;
          }
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // we used it to save items in localStorage & not lose when we refresh page .
        // 'cartItems' is a key & cartItems that inside JSON.stringify its string value that saved in this key .
        return { ...state, cart: { ...state.cart, cartItems } };
      } else {
        const cartItems = [...state.cart.cartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }

    // Other way for condition =>

    /* 
    const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } }; //update cartItems based on (((const cartItems = existItem)))
    
    */

    //
    ///
    /*if already have existItem in the cart we need to use map function on the cart item
        to update the current item that we get from action.payload 
        ,otherwise keep the previous item =>(item) in the cartItems
        if existItem is null that means its a new item => [...state.cart.cartItems, newItem]
        then update cartItems based on (((const cartItems = existItem)))
        using return { ...state, cart: { ...state.cart, cartItems } }*/

    //
    ///
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id // if item._id dose not equal the current id return it otherwise remove it .
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
// Store is come by createContext
