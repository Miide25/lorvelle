

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Lorvelle's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payment</h2>
            <p className="text-gray-600 leading-relaxed">
              All orders are subject to product availability. We reserve the right to limit quantities and refuse orders. Payment is processed via WhatsApp as directed by our team. Orders are not considered confirmed until payment is received.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p className="text-gray-600 leading-relaxed">
              All prices are listed in Nigerian Naira (NGN) and are subject to change without notice. We strive to ensure accuracy but occasionally errors may occur. We reserve the right to correct pricing errors and cancel orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery</h2>
            <p className="text-gray-600 leading-relaxed">
              Delivery times are estimates and not guaranteed. We are not responsible for delays caused by circumstances beyond our control. Risk of loss transfers to you upon delivery to the specified address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Returns are accepted within 7 days of delivery for unused products in original packaging. Refunds are processed at our discretion and may be issued as store credit or original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We make every effort to display accurate product information, including colors and dimensions. However, actual colors may vary depending on your monitor or device. Product descriptions are for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorvelle shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability is limited to the purchase price of the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content on this website, including text, images, logos, and designs, is the property of Lorvelle or its licensors and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service are governed by the laws of Nigeria. Any disputes shall be resolved in the courts of Nigeria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms of Service, please contact us via WhatsApp at +234 800 000 0000 or email us at info@beautyqueen.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
