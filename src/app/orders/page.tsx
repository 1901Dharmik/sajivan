"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: Array<{ url: string }>;
  };
  quantity: number;
  subtotal: number;
}

interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    landmark: string;
    pincode: string;
  };
  paymentInfo: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    stripePaymentIntentId?: string;
    stripePaymentStatus?: string;
  };
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
  totalPrice: number;
  totalPriceAfterDiscount: number;
  orderStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
    //   router.push('/auth/signin');
      return;
    }
    fetchOrders();
  }, [session, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ordered':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto  py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No orders found</h2>
          <Button onClick={() => router.push('/products')}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-600">
                  Placed on: {format(new Date(order.createdAt), 'PPP')}
                </p>
              </div>
              <Badge variant="secondary" className={getStatusColor(order.orderStatus)}>
                {order.orderStatus}
              </Badge>
            </div>

            <div className="divide-y">
              {order.orderItems.map((item, index) => (
                <div key={index} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.product.images?.[0]?.url || ''}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Subtotal: ${item.subtotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Shipping Address:</span>
                <span className="text-right">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                  {order.shippingInfo.address}<br />
                  {order.shippingInfo.landmark && `${order.shippingInfo.landmark},`} {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}<br />
                  Phone: {order.shippingInfo.phone}
                </span>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="font-medium">Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-medium">Total Amount:</span>
                <div className="text-right">
                  <p>Original Price: ${order.totalPrice}</p>
                  <p className="font-medium">Final Price: ${order.totalPriceAfterDiscount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}