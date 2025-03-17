"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronLeft, Printer, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch order details');
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      toast.error('Failed to load order details');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => router.push('/orders')}>
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Order #{order._id}</h1>
            <p className="text-sm text-gray-500">
              {format(new Date(order.createdAt), 'dd MMM yyyy h:mm a')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={getStatusColor(order.orderStatus)}>
            {order.orderStatus}
          </Badge>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.product.images?.[0]?.url || ''}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="font-medium">${item.subtotal}</p>
                      </div>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Price</span>
                  <span>${order.totalPrice}</span>
                </div>
                {order.totalPrice !== order.totalPriceAfterDiscount && (
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span className="text-green-600">
                      -${(order.totalPrice - order.totalPriceAfterDiscount).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Final Total</span>
                  <span>${order.totalPriceAfterDiscount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">{order.orderStatus}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'dd MMM yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Contact Information</h4>
                  <p className="text-sm">{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                  <p className="text-sm text-gray-600">{order.shippingInfo.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Shipping Address</h4>
                  <p className="text-sm">
                    {order.shippingInfo.address}<br />
                    {order.shippingInfo.landmark && `${order.shippingInfo.landmark},`}<br />
                    {order.shippingInfo.city}, {order.shippingInfo.state}<br />
                    {order.shippingInfo.pincode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Payment Method</span>
                  <span>{order?.paymentMethod}</span>
                </div>
                {order?.paymentInfo?.razorpayOrderId && (
                  <div className="flex justify-between text-sm">
                    <span>Razorpay Order ID</span>
                    <span>{order?.paymentInfo?.razorpayOrderId}</span>
                  </div>
                )}
                {order?.paymentInfo?.razorpayPaymentId && (
                  <div className="flex justify-between text-sm">
                    <span>Razorpay Payment ID</span>
                    <span>{order?.paymentInfo?.razorpayPaymentId}</span>
                  </div>
                )}
                {order?.paymentInfo?.stripePaymentIntentId && (
                  <div className="flex justify-between text-sm">
                    <span>Stripe Payment ID</span>
                    <span>{order?.paymentInfo?.stripePaymentIntentId}</span>
                  </div>
                )}
                {order?.paymentInfo?.stripePaymentStatus && (
                  <div className="flex justify-between text-sm">
                    <span>Stripe Status</span>
                    <span>{order?.paymentInfo?.stripePaymentStatus}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}