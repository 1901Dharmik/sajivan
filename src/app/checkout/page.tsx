// app/checkout/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import CheckoutShipping from './CheckoutShipping';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images?: { url: string }[];
  };
  quantity: number;
}

interface ShippingInfo {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  pincode: string;
  isDefault: boolean;
}

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

declare global {
  interface Window {
    Razorpay: any;
  }
}
const CheckoutPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderData, setOrderData] = useState({
    shippingInfo: null as ShippingInfo | null,
    paymentMethod: 'COD' // default to Cash on Delivery
  });

  const [clientSecret, setClientSecret] = useState<string | null>(null);


  useEffect(() => {
    const checkSessionAndFetchCart = async () => {
      if (status === "loading") return; // Wait for session to load
      if (!session) {
        router.push('/auth/signin');
        return;
      }
      await fetchCartItems();
    };

    checkSessionAndFetchCart();
  }, [session, status, router]);

   // Dynamically load Razorpay SDK
   useEffect(() => {
    const loadRazorpayScript = () => {
      if (typeof window !== "undefined" && !window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
      }
    };

    loadRazorpayScript();
  }, []);

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (response.ok) {
        setCartItems(data);
      }
    } catch (error) {
      toast.error('Failed to fetch cart items');
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );
  const shippingCost = 0; // Add your shipping cost logic here
  const total = subtotal + shippingCost;

  // Handle shipping info submission
  const handleShippingSubmit = (shippingInfo: ShippingInfo) => {
    setOrderData(prev => ({ ...prev, shippingInfo }));
    setStep('payment');
  };

  // Handle payment method selection
  // const handlePaymentMethodChange = (value: string) => {
  //   setOrderData(prev => ({ ...prev, paymentMethod: value }));
  // };

  const handlePaymentMethodChange = async (value: string) => {
    console.log('Payment method changed to:', value);
    setOrderData(prev => ({ ...prev, paymentMethod: value }));

    // if (value === 'razorpay' || value === 'Razorpay') {
    //   handleRazorpayPayment();
    // }

    if (value === 'card') {
      try {
        console.log('Creating payment intent...');
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            description: 'Order Payment',
            currency: "inr",
            shipping: {
              name: orderData.shippingInfo?.firstName,
              address: {
                line1: orderData.shippingInfo?.address,
                city: orderData.shippingInfo?.city,
                state: orderData.shippingInfo?.state,
                postal_code: orderData.shippingInfo?.pincode,
              },
            }
          })
        });

        const data = await response.json();
        console.log('Payment intent response:', data);
        
        if (response.ok) {
          console.log('Setting client secret:', data.clientSecret);
          setClientSecret(data.clientSecret);
        } else {
          throw new Error(data.error);
        }
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        toast.error(error.message);
      }
    } else {
      setClientSecret(null);
    }
  };

  const handleStripeSuccess = async (paymentIntentId: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingInfo: orderData.shippingInfo,
          paymentMethod: orderData.paymentMethod,
          paymentInfo: { stripePaymentIntentId: paymentIntentId },
          orderItems: cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity
          })),
          totalPrice: total,
          totalPriceAfterDiscount: total
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!');
        setStep('confirmation');
        setCartItems([]);
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!orderData.shippingInfo) {
      toast.error('Please select a shipping address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/payment/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total,
          shippingInfo: orderData.shippingInfo
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create order');
      
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Your Shop Name',
        description: 'Order Payment',
        order_id: data.id,
        prefill: {
          name: `${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}`,
          email: session?.user?.email,
          contact: orderData.shippingInfo.phone
        },
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                shippingInfo: orderData.shippingInfo,
                orderItems: cartItems.map(item => ({
                  product: item.product._id,
                  quantity: item.quantity,
                  subtotal: item.product.price * item.quantity
                })),
                totalAmount: total
              })
            });

            const verifyData = await verifyResponse.json();
            if (verifyResponse.ok) {
              toast.success('Payment successful!');
              setCartItems([]);
              setStep('confirmation');
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error: any) {
            toast.error(error.message);
          }
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  // Create order
  const handleCreateOrder = async () => {
    if (!orderData.shippingInfo) {
      toast.error('Please select a shipping address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingInfo: orderData.shippingInfo,
          paymentMethod: orderData.paymentMethod,
          orderItems: cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity
          })),
          totalPrice: total,
          totalPriceAfterDiscount: total // You can implement discount logic if needed
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order placed successfully!');
        setStep('confirmation');
        // Clear cart items from state
        setCartItems([]);
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render Order Summary
  const OrderSummary = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between gap-3">
            <Image
              src={item.product.images?.[0]?.url || ''}
              alt={item.product.name}
              width={40}
              height={60}
              className="rounded-md object-cover"
            />
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>₹ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹ {shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render Payment Step
  const PaymentStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={orderData.paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="COD" id="COD" />
            <Label htmlFor="COD">Cash on Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit/Debit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Razorpay" id="Razorpay" />
            <Label htmlFor="Razorpay">Credit/Debit Card / UPI</Label>
          </div>
        
        </RadioGroup>

        {orderData.paymentMethod === 'card' && clientSecret && (() => {
          console.log('Rendering Stripe form with client secret:', clientSecret);
          return (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripePaymentForm onSuccess={handleStripeSuccess} />
            </Elements>
          );
        })()}

        <div className="mt-6 space-y-4">
          <Button
            onClick={() => setStep('shipping')}
            variant="outline"
            className="w-full"
          >
            Back to Shipping
          </Button>
          {/* <Button
            onClick={handleCreateOrder}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </Button> */}

          {orderData.paymentMethod === 'COD' && (
            <Button
              onClick={handleCreateOrder}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </Button>
          )}

          {orderData.paymentMethod === 'Razorpay' && (
            <Button
              onClick={handleRazorpayPayment}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Pay with Razorpay'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Render Confirmation Step
  const ConfirmationStep = () => (
    <Card>
      <CardHeader>
        <CardTitle>Order Confirmed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Your order has been placed successfully.</p>
        <Button
          onClick={() => router.push('/orders')}
          className="w-full"
        >
          View Orders
        </Button>
        <Button
          onClick={() => router.push('/shop')}
          variant="outline"
          className="w-full"
        >
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`step ${step === 'shipping' ? 'text-green-600 border-b-2 border-green-600 font-semibold' : ''}`}>
              Shipping
            </div>
            <div className="step-separator" />
            <div className={`step ${step === 'payment' ? 'text-green-600 border-b-2 border-green-600 font-semibold' : ''}`}>
              Payment
            </div>
            <div className="step-separator" />
            <div className={`step ${step === 'confirmation' ? 'text-green-600 border-b-2 border-green-600 font-semibold' : ''}`}>
              Confirmation
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            {step === 'shipping' && (
              <CheckoutShipping onNext={handleShippingSubmit} />
            )}
            {step === 'payment' && <PaymentStep />}
            {step === 'confirmation' && <ConfirmationStep />}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            {step !== 'confirmation' && <OrderSummary />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;