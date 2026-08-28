

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information you provide directly when you place an order, including your name, phone number, delivery address, and order details. This information is necessary to process and deliver your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to process and fulfill your orders, communicate with you about your order status via WhatsApp, and improve our services. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp Communication</h2>
            <p className="text-gray-600 leading-relaxed">
              By placing an order, you agree to receive communications from us via WhatsApp regarding your order status, delivery updates, and payment instructions. You can opt out of these communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us via WhatsApp or email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us via WhatsApp at +234 800 000 0000 or email us at info@beautyqueen.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
