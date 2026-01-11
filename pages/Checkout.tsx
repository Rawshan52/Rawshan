
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem, PaymentMethod } from '../types';
import { CreditCard, Wallet, Smartphone, CheckCircle, Copy, Send, AlertCircle, ShieldCheck } from 'lucide-react';

interface Props {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<Props> = ({ cart, clearCart }) => {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [verificationData, setVerificationData] = useState({
    senderNum: '',
    trxId: '',
    amount: ''
  });
  
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const PAYMENT_NUMBERS = {
    [PaymentMethod.BKASH]: "01302309006",
    [PaymentMethod.NAGAD]: "01302309006",
    [PaymentMethod.ROCKET]: "01302309006",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Number copied to clipboard!");
  };

  const handleNextStep = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    
    // If local mobile banking, go to verification step
    if ([PaymentMethod.BKASH, PaymentMethod.NAGAD, PaymentMethod.ROCKET].includes(selectedPayment)) {
      setVerificationData(prev => ({ ...prev, amount: total.toString() }));
      setStep(3);
    } else {
      // For Stripe/PayPal, direct success (simulated)
      setStep(4);
      setTimeout(() => clearCart(), 2000);
    }
  };

  const handleWhatsAppVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationData.senderNum || !verificationData.trxId) {
      alert("Please fill in all details.");
      return;
    }

    const adminWhatsApp = "8801302309006";
    const message = `🚀 *View Agency - Payment Verification*%0A` +
                    `-----------------------------------------%0A` +
                    `*Payment Method:* ${selectedPayment}%0A` +
                    `*Transaction ID:* ${verificationData.trxId}%0A` +
                    `*Amount Paid:* ৳ ${verificationData.amount}%0A` +
                    `*Sender Number:* ${verificationData.senderNum}%0A` +
                    `-----------------------------------------%0A` +
                    `Please verify my payment and confirm the order.`;

    const waLink = `https://wa.me/${adminWhatsApp}?text=${message}`;
    window.open(waLink, '_blank');
    
    setStep(4);
    setTimeout(() => clearCart(), 2000);
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-10">Add some services to your cart to grow your brand today.</p>
        <Link to="/smm" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">Browse Services</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 max-w-xs mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i}
            </div>
            {i < 3 && <div className={`w-12 h-1 ${step > i ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-12 animate-in fade-in">
          <h1 className="text-3xl font-bold">Review Order</h1>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm divide-y">
            {cart.map((item, idx) => (
              <div key={idx} className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity ? `Quantity: ${item.quantity}` : 'Design Service'}
                  </p>
                </div>
                <div className="text-xl font-bold">৳{item.price.toFixed(0)}</div>
              </div>
            ))}
            <div className="p-6 bg-gray-50 flex justify-between items-center">
              <span className="text-lg font-bold">Total Payable</span>
              <span className="text-3xl font-extrabold text-indigo-600">৳{total.toFixed(0)}</span>
            </div>
          </div>
          <button 
            onClick={() => setStep(2)}
            className="w-full py-5 bg-indigo-600 text-white text-xl font-bold rounded-2xl hover:bg-indigo-700 transition shadow-xl"
          >
            Select Payment Method
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Secure Payment</h1>
            <p className="text-gray-500 mt-2">Choose your preferred way to pay</p>
          </div>
          
          <div className="grid gap-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">Mobile Banking (Automatic Verification)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[PaymentMethod.BKASH, PaymentMethod.NAGAD].map(method => (
                <button
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${
                    selectedPayment === method ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <Smartphone size={24} className={selectedPayment === method ? 'text-indigo-600' : 'text-gray-400'} />
                    </div>
                    <span className="font-bold text-lg">{method}</span>
                  </div>
                  {selectedPayment === method && <CheckCircle className="text-indigo-600" size={20} />}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-8">International Card / PayPal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[PaymentMethod.STRIPE, PaymentMethod.PAYPAL].map(method => (
                <button
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${
                    selectedPayment === method ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      {method === PaymentMethod.STRIPE ? <CreditCard size={24} /> : <Wallet size={24} />}
                    </div>
                    <span className="font-bold text-lg">{method}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl">Back</button>
            <button 
              onClick={handleNextStep}
              className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-xl"
            >
              Confirm & Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedPayment && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
                <Smartphone size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Pay via {selectedPayment}</h2>
                <p className="text-sm text-gray-500">Follow the steps below to complete payment</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Send Money to:</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-gray-900 tracking-wider">
                    {PAYMENT_NUMBERS[selectedPayment as keyof typeof PAYMENT_NUMBERS] || "01302309006"}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(PAYMENT_NUMBERS[selectedPayment as keyof typeof PAYMENT_NUMBERS] || "01302309006")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <Copy size={14} /> Copy
                  </button>
                </div>
                <p className="text-xs text-indigo-600 font-bold mt-3 italic flex items-center gap-1">
                  <AlertCircle size={12} /> Please use "Send Money" (Personal Number)
                </p>
              </div>

              <form onSubmit={handleWhatsAppVerify} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sender Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={verificationData.senderNum}
                      onChange={(e) => setVerificationData({...verificationData, senderNum: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Transaction ID (TrxID)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 8NJK29LM0"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={verificationData.trxId}
                      onChange={(e) => setVerificationData({...verificationData, trxId: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Amount</label>
                  <input 
                    type="text" 
                    readOnly
                    className="w-full px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 font-bold"
                    value={`৳ ${verificationData.amount}`}
                  />
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                  <button 
                    type="submit"
                    className="w-full py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition shadow-lg shadow-green-100 flex items-center justify-center gap-3 text-lg"
                  >
                    <Send size={20} /> Verify via WhatsApp
                  </button>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <ShieldCheck size={14} className="text-green-500" />
                    Verified & Secure Payment Gateway
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button onClick={() => setStep(2)} className="text-gray-500 font-bold hover:underline block mx-auto">Change Payment Method</button>
        </div>
      )}

      {step === 4 && (
        <div className="text-center py-24 animate-in zoom-in-95">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
            <CheckCircle size={56} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Verification Sent!</h1>
          <p className="text-gray-600 mb-10 max-w-md mx-auto">
            Your verification request has been sent. We will confirm your order within <span className="font-bold text-gray-900">10-30 minutes</span>.
            Your Order ID is <span className="font-bold text-indigo-600">#VA-99012</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/account" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg">View Order Status</Link>
            <Link to="/" className="px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
