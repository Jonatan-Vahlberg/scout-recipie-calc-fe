import React, { createContext, useContext, useEffect, useState } from "react";
import CartItem from "../../components/Cart/CartItem";
import { getIngredientPortioned, _getPortions } from "../helpers";
import StorageKit from "../StorageKit";
import userKit from "../UserKit";
import { usePortions } from "./PortionContext";
import { useUser } from "./UserContext";

// type ContextState = {
//   cart: CartRecipie[]
// }

// const defaultState: ContextState = {
//   cart: []
// }

type ContextInterface = {
  cart: CartItem[];
  ingredients: Ingredient[];
  isOpen: boolean;
  addToCart: (
    item: CartItem,
    onSuccess?: VoidFunction,
    onError?: VoidFunction
  ) => void;
  removeFromCart: (item: CartItem) => void;
  generateAlias: () => string;
  editCartItem: (item: CartItem) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupByRecipie: () => CartItem[][];
  copyCart: () => void;
  copyIngredients: (orderBy?: OrderBy) => void;
};

const CartContext = createContext<Partial<ContextInterface>>({});

const CartProvider: React.FC = ({ children }) => {
  const user = useUser();
  const [checkedStorage, setCheckedStorage] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cloudCart, setCloudCart] = useState<UserCart>();
  const [updating, setUpdating] = useState(false);
  const [cartUpdatedAt, setCartUpdatedAt] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartMode, setCartMode] = useState<"LOCAL" | "CLOUD">();

  const _getCart = () => {
    if (cartMode === "CLOUD") {
      return cloudCart?.items || [];
    }
    return cart;
  };

  const _cart = _getCart();

  useEffect(() => {
    if (!checkedStorage) return;
    if (_cart) {
      setIngredients(_cart.map((item) => item.recipie.ingredients).flat(1));
    }
    StorageKit.setItem("@LOCAL_CART", JSON.stringify(_cart));
    StorageKit.setItem("@LOCAL_CART_UPDATED_AT", cartUpdatedAt);
  }, [_cart, checkedStorage]);

  useEffect(() => {
    
    if (!checkedStorage) {
      _checkStorage();
      return;
    }
  }, [cartMode]);

  useEffect(() => {
    
  }, [cloudCart]);

  useEffect(() => {
    const _modeIsLocal = cartMode === "LOCAL" || !cartMode;
    if (_modeIsLocal && user.user) {
      setCartMode("CLOUD");
      setCheckedStorage(false);
    }
    if (cartMode === "CLOUD" && !user.user) {
      setCartMode("LOCAL");
      setCheckedStorage(false);
    }
  }, [user.user]);

  const getCloudCart = () => {
    setCheckedStorage(true);
    userKit
      .getUserCart()
      .then((res) => {
        setCloudCart(res.data);
        setCheckedStorage(true);
      })
      .catch((err) => {
        getLocalCart();
      });
  };

  const getLocalCart = () => {
    const storedCart = StorageKit.getItem("@LOCAL_CART");
    const storedCartUpdatedAt = StorageKit.getItem("@LOCAL_CART_UPDATED_AT");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      setCartUpdatedAt(storedCartUpdatedAt);
    }
    setCheckedStorage(true);
  };

  const _checkStorage = () => {
    if (cartMode === "CLOUD") {
      getCloudCart();
      return;
    }
    getLocalCart();
    return;
  };

  const _stringifyIngredient = (ingredient: Ingredient, portions: number) => {
    return `\t${getIngredientPortioned(ingredient, portions)} ${
      ingredient.ingredient.unit || ""
    } ${ingredient.ingredient.name}\n`;
  };

  const _stringifyRecipie = (item: CartItem) => {
    const { recipie, portions } = item;
    const portionSize = _getPortions(portions);
    let strigified = `${recipie.name}\n${recipie.ingredients
      .map((ingredient) => _stringifyIngredient(ingredient, portionSize))
      .join("")}
    `;
    return strigified;
  };

  const groupByRecipie = () => {
    let recipieSplitCart: {
      [key: number]: CartItem[];
    } = _cart.reduce(
      (result, item) => ({
        ...result,
        [item.recipie.id]: [...(result[item.recipie.id] || []), item],
      }),
      {}
    );
    let splitCart: CartItem[][] = Object.keys(recipieSplitCart).map(
      (key) => recipieSplitCart[key]
    );
    return splitCart;
  };

  const addToCloudCart = (
    item: CartItem,
    onSuccess?: VoidFunction,
    onError?: VoidFunction
  ) => {
    setUpdating(true);
    const payload = {
        items: [ item],
        user: user.user?.id,
    }
    if(!cloudCart){
      userKit.createUserCart(payload).then((res) => {
        setCloudCart(res.data)
        onSuccess && onSuccess();
      }).catch((err) => {
        onError && onError();
      })
      .finally(() => setUpdating(false));
    }
    payload.items = [...cloudCart?.items, item];
    userKit
      .updateUserCart(cloudCart.id, payload)
      .then((res) => {
        setCloudCart(res.data);
        onSuccess && onSuccess();
      })
      .catch((err) => {
        onError && onError();
      })
      .finally(() => setUpdating(false));
  };

  const addToLocalCart = (
    item: CartItem,
    onSuccess?: VoidFunction,
    onError?: VoidFunction
  ) => {
    setCart([...cart, item]);
    onSuccess && onSuccess();
  };

  const addToCart = (
    item: CartItem,
    onSuccess: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    const _onError = (error?: any) => {
      setCart((state) => [...state, item]);
      setCartUpdatedAt(new Date().toISOString());
      onError();
    };
    if (cartMode === "CLOUD") {
      addToCloudCart(item, onSuccess, _onError);
      return;
    }
    addToLocalCart(item, onSuccess);
  };

  const generateAlias = () => {
    let r = (Math.random() + 1).toString(36).substring(4);
    return r;
  };

  const removeFromCloudCart = (
    item: CartItem,
    onSuccess: VoidFunction = () => {},
    onError: VoidFunction = () => {}
  ) => {
    setUpdating(true);

    let tempCart = { ...cloudCart };
    tempCart.items = tempCart.items.filter((i) => i.id !== item.id);

    userKit
      .updateUserCart(cloudCart?.id, tempCart)
      .then((res) => {
        setCloudCart(res.data);
        onSuccess && onSuccess();
      })
      .catch((err) => {
        onError && onError();
      })
      .finally(() => setUpdating(false));
  };

  const removeFromLocalCart = (
    item: CartItem,
    onSuccess: VoidFunction = () => {}
  ) => {
    setCart((state) =>
      state.filter((i) => {
        if (i.id && item.id) {
          return i.id !== item.id;
        }
        return i.alias !== item.alias;
      })
    );
    onSuccess && onSuccess();
  };

  const removeFromCart = (item: CartItem) => {
    if (cartMode === "CLOUD") {
      removeFromCloudCart(item);
      return;
    }
    removeFromLocalCart(item);
  };

  const copyCart = () => {
    const copyPasta = _cart.map((item) => _stringifyRecipie(item)).join("\n");
    if (navigator) {
      navigator.clipboard.writeText(copyPasta);
    }
  };

  const getIngredientTotalPortions = (
    ingredient: Ingredient,
    ingredients: SplitIngredient[],
    portions: Portions,
    orderBy: OrderBy
  ) => {
    if (!ingredients.find((i) => i.ingredient === ingredient.ingredient.id)) {
      const amount = getIngredientPortioned(ingredient, _getPortions(portions));
      ingredients.push({
        ingredient: ingredient.ingredient.id,
        ingredients: [ingredient],
        amount,
        name: ingredient.ingredient.name,
        unit: ingredient.ingredient.unit,
        category: ingredient.ingredient.category,
      });
    } else {
      const _ingredient = ingredients.find(
        (i) => i.ingredient === ingredient.ingredient.id
      );
      _ingredient.ingredients.push(ingredient);
      _ingredient.amount += getIngredientPortioned(
        ingredient,
        _getPortions(portions)
      );
    }
    if(orderBy === "CATEGORY"){
      ingredients.sort((a, b) => a.category?.localeCompare(b?.category));
    }
    else if( orderBy === "NAME"){
      ingredients.sort((a, b) => a.name.localeCompare(b.name));
    }

    return ingredients;
  };

  const getIngredientCopyPasta = (ingredients: SplitIngredient[]) => {
    return ingredients
      .map((i) => {
        let ingredient = ""
        if(i.amount){
          ingredient = `${i.amount}`
        }
        if(i.unit){
          ingredient += ` ${i.unit}`
        }
        ingredient += ` ${i.name}`
        return ingredient
      })
      .join("\n");
  }

  const copyIngredients = (orderBy?: OrderBy) => {
    let ingredientSplitUp: SplitIngredient[] = [];
    _cart.forEach((item) => {
      item.recipie.ingredients.map((ingredient) => {
        ingredientSplitUp = getIngredientTotalPortions(
          ingredient,
          ingredientSplitUp,
          item.portions,
          orderBy,
        );
      });
    });
    const copyPasta = getIngredientCopyPasta(ingredientSplitUp);
    if(navigator){
      navigator.clipboard.writeText(copyPasta)
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: _cart,
        ingredients,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        generateAlias,
        groupByRecipie,
        copyCart,
        copyIngredients ,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};

export { CartProvider, useCart };
