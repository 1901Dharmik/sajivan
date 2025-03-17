"use client"
import { useState } from 'react'
import { StarIcon } from 'lucide-react'

const tabs = ['Digestive', 'Piles', 'Weight', 'Sexual', 'Nutrition', 'Immunity', 'Women Wellness']

const products = [
  {
    name: 'Digestive Care Trial Kit',
    rating: 4.2,
    users: '14000+ People Using',
    price: '₹ 1,399/-',
    originalPrice: '₹ 2,197/-',
    description: 'Care For: Indigestion, Burning, Bloating',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Digestive Care Essential Kit',
    rating: 4.6,
    users: '11000+ People Using',
    price: '₹ 2,099/-',
    originalPrice: '₹ 3,496/-',
    description: 'Care For: Gas, Constipation, Indigestion',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Digestive Care Complete Kit',
    rating: 4.2,
    users: '17000+ People Using',
    price: '₹ 1,999/-',
    originalPrice: '₹ 2,996/-',
    description: 'Care For: Gas, Acidity, Constipation',
    image: '/placeholder.svg?height=200&width=200'
  },
  {
    name: 'Digestive Care Intense Kit',
    rating: 4.9,
    users: '19500+ People Using',
    price: '₹ 3,849/-',
    originalPrice: '₹ 5,893/-',
    description: 'Care For: Gas, Acidity, Constipation',
    image: '/placeholder.svg?height=200&width=200'
  }
]

export default function Component() {
  const [activeTab, setActiveTab] = useState('Digestive')

  return (
    <div className="container mx-auto px-4">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.name} className="border rounded-lg p-4 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-gray-500 ml-2">{product.users}</span>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-lg font-bold text-green-600">{product.price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-white border border-green-600 text-green-600 py-2 px-4 rounded hover:bg-green-50">
                Know More
              </button>
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}