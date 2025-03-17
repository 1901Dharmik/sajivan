"use client";

import { NavItem } from "./Nav-item";
import { Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const products = [
  {
    name: "OPPO Reno13 Pro 5G",
    image: "/placeholder.svg?height=200&width=200",
    price: "49999",
    originalPrice: "54999",
    exchangeBonus: "3000",
    isNew: true,
  },
  {
    name: "OPPO Reno13 5G",
    image: "/placeholder.svg?height=200&width=200",
    price: "37999",
    originalPrice: "41999",
    exchangeBonus: "3000",
    isNew: true,
  },
  {
    name: "OPPO Find X8 Pro",
    image: "/placeholder.svg?height=200&width=200",
    price: "99999",
    originalPrice: "109999",
    ncemi: true,
    isNew: true,
  },
  {
    name: "OPPO Find X8",
    image: "/placeholder.svg?height=200&width=200",
    price: "69999",
    originalPrice: "79999",
    ncemi: true,
    isNew: true,
  },
];

export function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-muted/70 bg-white px-8">
      <nav className="relative container mx-auto px-4">
        <div className="mx-auto flex  items-center justify-between px-4 h-12">
          <div className="flex items-center space-x-4">
            <a href="/" className="py-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-13%20151944-cfIrIvAG7IRY0S4MYcR3MgQfDvFmbz.png"
                alt="Logo"
                className="h-6"
                width={82}
                height={24}
              />
            </a>
            <div className="hidden md:flex">
            <div className="flex items-center space-x-1 ">
              <NavItem label="Smartphones" href="/smartphones">
                <div className="grid grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Latest Models</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          Find X8 Pro
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          Reno13 Pro 5G
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          Reno13 5G
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavItem>
              <NavItem label="Tablets" href="/tablets">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.name} {...product} />
                  ))}
                </div>
              </NavItem>
              <NavItem label="Audio" href="/audio" />
              <NavItem label="Accessories" href="/accessories" />
              <NavItem label="About OPPO" href="/about" />
            </div>
            </div>
          </div>
         
          <div className="flex items-center space-x-6">
          <div className="hidden md:flex">
            <a
              href="/store"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Store
            </a>
            <a
              href="/coloros"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              ColorOS
            </a>
            <a
              href="/support"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Support
            </a>
            <a
              href="/community"
              className="text-sm font-medium text-gray-700 hover:text-black"
            >
              Community
            </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-black">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-black">
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="text-gray-700 hover:text-black"
              >
                <ShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

interface ProductCardProps {
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  exchangeBonus?: string;
  isNew?: boolean;
  ncemi?: boolean;
}

export function ProductCard({
  name,
  image,
  price,
  originalPrice,
  exchangeBonus,
  isNew,
  ncemi,
}: ProductCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
      <div className="relative mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="w-auto h-auto"
        />
        {isNew && (
          <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
            New
          </span>
        )}
      </div>
      <h3 className="text-lg font-medium mb-2">{name}</h3>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">₹{price}</span>
        {originalPrice && (
          <span className="text-gray-400 line-through text-sm">
            ₹{originalPrice}
          </span>
        )}
      </div>
      {exchangeBonus && (
        <p className="text-sm text-gray-600 mb-2">
          Exchange Bonus up to ₹{exchangeBonus}
        </p>
      )}
      {ncemi && (
        <p className="text-sm text-gray-600 mb-2">
          NCEMI up to 24 Months & Exchange Bonus
        </p>
      )}
      <div className="flex space-x-4 mt-4">
        <Button variant="outline" size="sm">
          Learn more
        </Button>
        <Button size="sm">Buy now</Button>
      </div>
    </div>
  );
}
