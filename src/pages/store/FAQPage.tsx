

export function FAQPage() {
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our products, add items to your cart, and proceed to checkout. Fill in your delivery details, and you\'ll be redirected to WhatsApp to complete your order with our team.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept payments via bank transfer and other convenient methods. Our team will provide you with payment instructions when you confirm your order on WhatsApp.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery times vary by location. Generally, orders within Lagos take 1-2 business days, while orders outside Lagos take 2-5 business days.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery for unused products in their original packaging. Please contact us via WhatsApp to initiate a return.',
    },
    {
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic. We source directly from brands and authorized distributors to ensure quality and authenticity.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within Nigeria. We\'re working on expanding our shipping options to other countries.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is confirmed, our team will provide you with tracking information via WhatsApp. You can also contact us anytime for order updates.',
    },
    {
      question: 'Do you offer discounts on bulk orders?',
      answer: 'Yes, we offer special pricing for bulk orders. Please contact us via WhatsApp to discuss your requirements and get a custom quote.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <span className="text-pink-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-4">Can't find the answer you're looking for? Please reach out to our team.</p>
          <a
            href="https://wa.me/2349163047095"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
