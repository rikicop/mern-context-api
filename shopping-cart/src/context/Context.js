import { createContext, useContext, useReducer } from "react";
import { cartReducer, prdReducer } from "./Reducers";
/* import products from "./data/products"; */
/* 36:26 --> Los datos deben ser aquí estáticos 
posiblemente por eso tuvistes tantos problemas */
const Cart = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });

  //prd means product
  const [prdState, prdDispatch] = useReducer(prdReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, prdState, prdDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
