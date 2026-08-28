import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">+234 916 304 7095</p>
                  <p className="text-sm text-gray-500">Available Mon-Sat, 9am-6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+234 916 304 7095</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@estherglory149@gmail.com.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">Number 3 Mercy Street, Banku Warewa</p>
                  <p className="text-gray-600">Banku Warewa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Prefer WhatsApp?</h2>
          <p className="mb-4">Get instant responses to your questions</p>
          <a
            href="https://wa.me/2349163047095"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-pink-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
