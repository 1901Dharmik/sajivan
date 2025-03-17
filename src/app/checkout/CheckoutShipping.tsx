import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ShippingInfo {
  _id: string;
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

interface CheckoutShippingProps {
  onNext: (shippingInfo: ShippingInfo) => void;
}

const CheckoutShipping = ({ onNext }: CheckoutShippingProps) => {
  const [addresses, setAddresses] = useState<ShippingInfo[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors },
    setValue,
    watch 
  } = useForm<ShippingInfo>({
    defaultValues: {
      isDefault: false
    }
  });

  // Watch the isDefault field
  const isDefaultChecked = watch('isDefault');

  // Fetch existing shipping addresses
  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/shipping');
      const data = await response.json();
      if (response.ok) {
        setAddresses(data);
        // Set default address if exists
        const defaultAddress = data.find((addr: ShippingInfo) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress._id);
        }
        // If no addresses, show the form
        if (data.length === 0) {
          setIsAddingNew(true);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch shipping addresses');
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Add new shipping address
  const addShippingInfo = async (formData: Partial<ShippingInfo>) => {
    setIsLoading(true);
    try {
      // Convert isDefault to boolean
      const data = {
        ...formData,
        isDefault: Boolean(formData.isDefault)
      };

      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const newAddress = await response.json();
        setAddresses([...addresses, newAddress]);
        setSelectedAddress(newAddress._id);
        setIsAddingNew(false);
        reset();
        toast.success('Shipping address added successfully');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add address');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add shipping address');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete shipping address
  const deleteAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/shipping/${addressId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setAddresses(addresses.filter(addr => addr._id !== addressId));
        if (selectedAddress === addressId) {
          setSelectedAddress('');
        }
        toast.success('Address deleted successfully');

        // If no addresses left, show the form
        if (addresses.length === 1) {
          setIsAddingNew(true);
        }
      }
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  // Handle proceeding to next step
  const handleProceed = () => {
    const selected = addresses.find(addr => addr._id === selectedAddress);
    if (selected) {
      onNext(selected);
    } else {
      toast.error('Please select a shipping address');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Existing Addresses */}
        {addresses.length > 0 && !isAddingNew && (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address._id} className="flex items-start space-x-4 p-4 border rounded">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="font-medium">{address.firstName} {address.lastName}</p>
                  <p>{address.address} , ${address.landmark}</p>
                  <p>{`${address.city}, ${address.state} ${address.pincode}`}</p>
                  <p>{address.phone}</p>
                  {address.isDefault && <span className="text-sm text-blue-600">Default</span>}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteAddress(address._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address Form */}
        {(isAddingNew || addresses.length === 0) && (
          <form onSubmit={handleSubmit(addShippingInfo)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Full Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName', { required: 'Full name is required' })}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register('lastName', { required: 'Phone number is required' })}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                {...register('landmark', { required: 'Landmark is required' })}
              />
              {errors.landmark && (
                <p className="text-sm text-red-500">{errors.landmark.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  {...register('city', { required: 'City is required' })}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  {...register('state', { required: 'State is required' })}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Postal Code</Label>
                <Input
                  id="pincode"
                  {...register('pincode', { required: 'Postal code is required' })}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-500">{errors.pincode.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={isDefaultChecked}
                onCheckedChange={(checked) => {
                  setValue('isDefault', checked as boolean);
                }}
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>

            <div className="flex justify-end space-x-4">
              {addresses.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingNew(false)}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Address'}
              </Button>
            </div>
          </form>
        )}

        {/* Action Buttons */}
        {!isAddingNew && addresses.length > 0 && (
          <div className="mt-6 space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsAddingNew(true)}
            >
              Add New Address
            </Button>
            <Button
              className="w-full"
              onClick={handleProceed}
              disabled={!selectedAddress}
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutShipping;