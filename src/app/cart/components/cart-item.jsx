'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function CartItem({
  id,
  name,
  variant,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex p-4 gap-6 border rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 96px) 100vw, 96px"
          priority
        />
      </div>
      <div className="flex-grow space-y-2">
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{variant}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg">₹{price}</span>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

