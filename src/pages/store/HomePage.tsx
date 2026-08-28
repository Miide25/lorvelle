import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                New Collection Available
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Beauty. <br />
                <span className="text-pink-600">Your Confidence.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover beauty essentials curated to make every day feel a little more beautiful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/category/new-arrivals">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore New Arrivals
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl aspect-square lg:aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-full p-8 shadow-lg">
                    <Sparkles className="w-24 h-24 text-pink-500 mx-auto" />
                  </div>
                  <p className="mt-4 text-gray-700 font-medium">Premium Beauty Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of beauty essentials across different categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Makeup', slug: 'makeup', count: 12 },
              { name: 'Skincare', slug: 'skincare', count: 15 },
              { name: 'Hair Care', slug: 'hair-care', count: 8 },
              { name: 'Fragrance', slug: 'fragrance', count: 6 },
              { name: 'Body Care', slug: 'body-care', count: 10 },
              { name: 'Accessories', slug: 'beauty-accessories', count: 7 },
            ].map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-pink-50 transition-colors">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Glow More. Spend Less.
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover selected beauty essentials at special prices. Limited time offer.
          </p>
          <Link to="/shop?sort=discount">
            <Button variant="secondary" size="lg">
              Shop Offers
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Philosophy</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            At Lorvelle, we believe that beauty is more than skin deep. It's about confidence,
            self-care, and celebrating your unique self. Our carefully curated collection features
            premium products that enhance your natural beauty while nourishing and protecting your skin.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="bg-pink-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Only the finest ingredients and formulations</p>
            </div>
            <div>
              <div className="bg-pink-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Curated</h3>
              <p className="text-gray-600 text-sm">Products selected by beauty professionals</p>
            </div>
            <div>
              <div className="bg-pink-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Service</h3>
              <p className="text-gray-600 text-sm">Direct support via WhatsApp for your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah A.',
                text: 'Absolutely love the quality of products! The lip gloss is my new favorite.',
                rating: 5,
              },
              {
                name: 'Chioma O.',
                text: 'Fast delivery and amazing customer service. Will definitely order again!',
                rating: 5,
              },
              {
                name: 'Ngozi E.',
                text: 'The skincare collection has transformed my routine. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 lg:p-12">
            <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need help choosing the right product?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Chat with us directly on WhatsApp for personalized recommendations and support.
            </p>
            <a
              href="https://wa.me/2349163047095"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Chat on WhatsApp
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
