import React, { createContext, useContext, useEffect, useState } from "react"


// type ContextState = {
//   cart: CartRecipie[]
// }

// const defaultState: ContextState = {
//   cart: []
// }

type ContextInterface = {
  cart: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  generateAlias: () => string;
  editCartItem: (item: CartItem) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupByRecipie: () =>  CartItem[][];
}

const CartContext = createContext<Partial<ContextInterface>>({})

const STORAGE_CART_KEY = "@STORAGE_CART"

const CartProvider: React.FC = ({children}) => {
  const [checkedStorage, setCheckedStorage] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if(!checkedStorage){
      _checkStorage()
      return
    }
    if(cart){
      setIngredients(cart.map(item => item.recipie.ingredients).flat(1))
    }
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart))
  },[cart])

  const _checkStorage = () => {
    const storedCart = localStorage.getItem(STORAGE_CART_KEY)
    if(storedCart){
      setCart(JSON.parse(storedCart))
    }
    setCheckedStorage(true)

  }

  const groupByRecipie = () => {
    let recipieSplitCart: {
      [key: number]: CartItem[]
    } = cart.reduce((result, item) => ({
      ...result,
      [item.recipie.id]: [
        ...(result[item.recipie.id] || []),
        item
      ]
    }),{})
    let splitCart: CartItem[][] = Object.keys(recipieSplitCart).map(key => recipieSplitCart[key])
    return splitCart
  }
 
  const addToCart = (item: CartItem) => {
    setCart(state => [...state, item])
  }

  const generateAlias = () => {
    let r = (Math.random() + 1).toString(36).substring(4);
    return r
  }

  const removeFromCart = (item: CartItem) => {
    setCart(state =>{
      let newState = [...state]
      let indexToRemove = newState.findIndex(i => item.alias === i.alias)
      newState.splice(indexToRemove, 1)
      return newState
    })
  }

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      setIsOpen,
      addToCart,
      removeFromCart,
      generateAlias,
      groupByRecipie
    }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const cart = useContext(CartContext)
  return cart
}

export {CartProvider, useCart}