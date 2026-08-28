import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-pink-400 mb-4">Lorvelle</h3>
            <p className="text-gray-400 text-sm mb-4">
              Beauty. Elegance. You. Your destination for premium beauty products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-pink-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/makeup" className="hover:text-pink-400 transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="/category/skincare" className="hover:text-pink-400 transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/category/hair-care" className="hover:text-pink-400 transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link to="/category/fragrance" className="hover:text-pink-400 transition-colors">
                  Fragrance
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-pink-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-pink-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-pink-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Number 3 Mercy Street, Banku Warewa</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+234 916 304 7095</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>estherglory149@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp: +234 916 304 7095</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lorvelle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
