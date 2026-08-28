

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Lorvelle</h1>
          <p className="text-xl text-gray-600">Beauty. Elegance. You.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Lorvelle was founded with a simple mission: to make premium beauty products accessible to everyone who wants to look and feel their best. We believe that beauty is more than skin deep – it's about confidence, self-care, and celebrating your unique self.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our carefully curated collection features only the finest products from trusted brands, ensuring that every item meets our strict quality standards. From luxurious skincare to vibrant cosmetics, we're here to help you discover products that enhance your natural beauty.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm">We only stock products that meet our rigorous quality standards and use premium ingredients.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600 text-sm">Your satisfaction is our priority. We're here to help you find the perfect products for your needs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600 text-sm">Every product we sell is 100% authentic, sourced directly from brands and authorized distributors.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">✓</span>
              <span>Curated selection of premium beauty products</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">✓</span>
              <span>Expert customer support via WhatsApp</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">✓</span>
              <span>Fast and reliable delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">✓</span>
              <span>Competitive pricing on all products</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">✓</span>
              <span>Secure and convenient ordering process</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
