import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, Heart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getCartItemCount } = useCart()
  const location = useLocation()

  const cartItemCount = getCartItemCount()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-pink-600">Lorvelle</h1>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive('/shop') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/category"
              className={`text-sm font-medium transition-colors ${
                isActive('/category') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/shop"
                className={`text-sm font-medium transition-colors ${
                  isActive('/shop') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/category"
                className={`text-sm font-medium transition-colors ${
                  isActive('/category') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive('/about') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors ${
                  isActive('/contact') ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
