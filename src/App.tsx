import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Navbar } from './components/store/Navbar'
import { Footer } from './components/store/Footer'
import { Toast } from './components/ui/Toast'
import { LoadingScreen } from './components/LoadingScreen'
import { InstallPrompt } from './components/InstallPrompt'

// Store pages
import { HomePage } from './pages/store/HomePage'
import { ShopPage } from './pages/store/ShopPage'
import { ProductDetailPage } from './pages/store/ProductDetailPage'
import { CartPage } from './pages/store/CartPage'
import { CheckoutPage } from './pages/store/CheckoutPage'
import { AboutPage } from './pages/store/AboutPage'
import { ContactPage } from './pages/store/ContactPage'
import { FAQPage } from './pages/store/FAQPage'
import { PrivacyPolicyPage } from './pages/store/PrivacyPolicyPage'
import { TermsPage } from './pages/store/TermsPage'
import { WishlistPage } from './pages/store/WishlistPage'

// Admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminProductsPage } from './pages/admin/AdminProductsPage'
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage'
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage'
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage'
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage'
import { AdminDiscountsPage } from './pages/admin/AdminDiscountsPage'
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage'
import { AdminSidebar } from './components/admin/AdminSidebar'

function StoreLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 ml-64">
        <Outlet />
      </main>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductFormPage />} />
        <Route path="products/:id/edit" element={<AdminProductFormPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="discounts" element={<AdminDiscountsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Store routes */}
      <Route path="/*" element={<StoreLayout />} />
    </Routes>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <AppRoutes />
            <Toast />
            <InstallPrompt />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
