import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { CartItem } from '../types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string, variant: string | null) => void
  updateQuantity: (productId: string, variant: string | null, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
  isInCart: (productId: string, variant: string | null) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'beauty-queen-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.variant === item.variant
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      }

      // Add new item
      return [...prevCart, item]
    })
  }

  const removeFromCart = (productId: string, variant: string | null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.productId === productId && item.variant === variant)
      )
    )
  }

  const updateQuantity = (productId: string, variant: string | null, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId: string, variant: string | null) => {
    return cart.some(
      (item) => item.productId === productId && item.variant === variant
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
