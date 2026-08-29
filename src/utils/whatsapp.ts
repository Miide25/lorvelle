import type { CartItem } from '../types'

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `BQ-${timestamp}${random}`
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`
  }
  return `${currency} ${amount.toLocaleString()}`
}

export function createWhatsAppMessage(
  orderNumber: string,
  cartItems: CartItem[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  deliveryInstructions: string | null
): string {
  let message = `Hello! I'd like to place an order.\n\n`
  message += `ORDER SUMMARY\n`
  message += `Order: #${orderNumber}\n\n`

  cartItems.forEach((item, index) => {
    message += `${index + 1} × ${item.productName}`
    if (item.variant) {
      message += ` (${item.variant})`
    }
    message += `\n${formatCurrency(item.price)}`
    if (item.quantity > 1) {
      message += ` each`
    }
    message += `\n\n`
  })

  message += `Subtotal: ${formatCurrency(subtotal)}\n`
  message += `Delivery: ${formatCurrency(deliveryFee)}\n`
  message += `Total: ${formatCurrency(total)}\n\n`

  message += `CUSTOMER DETAILS\n`
  message += `Name: ${customerName}\n`
  message += `WhatsApp: ${customerPhone}\n\n`
  message += `Delivery Address:\n${deliveryAddress}\n\n`

  if (deliveryInstructions) {
    message += `Delivery Instructions:\n${deliveryInstructions}\n\n`
  }

  message += `Please confirm my order and send payment instructions.\n`
  message += `Thank you!`

  return message
}

export function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message)
}

export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  const encodedMessage = encodeWhatsAppMessage(message)
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function openWhatsApp(phoneNumber: string, message: string): boolean {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  if (cleanPhone.length < 10 || cleanPhone.length > 15) return false

  const url = generateWhatsAppURL(cleanPhone, message)
  // Navigating directly avoids popup blockers after the async order request.
  window.location.assign(url)
  return true
}

export function validateWhatsAppCheckout(
  cartItems: CartItem[],
  customerName: string,
  customerPhone: string,
  deliveryAddress: string,
  whatsappNumber: string
): { valid: boolean; error?: string } {
  if (cartItems.length === 0) {
    return { valid: false, error: 'Your cart is empty' }
  }

  if (!customerName || customerName.trim().length === 0) {
    return { valid: false, error: 'Please enter your name' }
  }

  if (!customerPhone || customerPhone.trim().length === 0) {
    return { valid: false, error: 'Please enter your WhatsApp number' }
  }

  if (!deliveryAddress || deliveryAddress.trim().length === 0) {
    return { valid: false, error: 'Please enter your delivery address' }
  }

  if (!whatsappNumber || whatsappNumber.trim().length === 0) {
    return { valid: false, error: 'Store WhatsApp number is not configured' }
  }

  return { valid: true }
}
