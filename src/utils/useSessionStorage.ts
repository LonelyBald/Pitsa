import {useEffect} from "react";
import {SESSION_STORAGE_KEYS} from "../constants";
import {useAppDispatch} from "../redux/store";
import {updateCart} from "../redux/slices/cartSlice";
import {CartItemType} from "../types/cartItemType";

export const useSessionStorage = (cartItems: Array<CartItemType>) => {
    const dispatch = useAppDispatch()
    const sessionStorage = window.sessionStorage
    const sessionStorageItem = sessionStorage.getItem(SESSION_STORAGE_KEYS.PIZZA_ARR)
    const addPizzaToSessionStorage = (pizzaArr: Array<CartItemType>) => {
        dispatch(updateCart(pizzaArr))
    }

    const clearPizzaSessionStorage = () => {
        sessionStorage.clear()
    }

    useEffect(()=> {
        if(sessionStorageItem && cartItems.length === 0) {
            console.log(JSON.parse(sessionStorageItem))
            const parsedCartItems = JSON.parse(sessionStorageItem).cartItems
            dispatch(updateCart(parsedCartItems))
        } else if(cartItems.length !== 0) {
            sessionStorage.setItem(SESSION_STORAGE_KEYS.PIZZA_ARR,
                JSON.stringify({cartItems: cartItems}))
        }
    }, [cartItems, dispatch, sessionStorage, sessionStorageItem])

    return {
        addPizzaToSessionStorage,
        clearPizzaSessionStorage
    }
}