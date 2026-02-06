import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import Footer from '../components/home/Footer';
import Navbar from '../components/home/Navbar';

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!name || !email) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  if (cart.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your sustainable purchase! A confirmation email has been sent to {email}.
          </p>
          <div className="space-y-3">
            <Link to="/shop" className="block bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Continue Shopping
            </Link>
            <Link to="/" className="block border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your order</p>

        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.quantity} × </span>
                  {item.name}
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Street address, city, ZIP code"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="payment" defaultChecked className="mr-2" />
                  Cash on Delivery
                </label>
                <p className="text-sm text-gray-500">
                  For this demo project, payment is simulated. In a real app, integrate Stripe/PayPal.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Place Order - ${totalPrice.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> This is a college project demo. 
            No real transactions occur. Cart data is stored locally in your browser.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CheckoutPage;