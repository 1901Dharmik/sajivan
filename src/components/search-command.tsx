"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

// Mock search data - in a real app, this would come from an API or search index
const searchData = {
  products: [
    { id: 1, name: "Organic Amla Powder", category: "Supplements", url: "/products/organic-amla-powder" },
    { id: 2, name: "Ayurvedic Face Cream", category: "Skin Care", url: "/products/ayurvedic-face-cream" },
    { id: 3, name: "Herbal Digestive Tablets", category: "Supplements", url: "/products/herbal-digestive-tablets" },
    { id: 4, name: "Aloe Vera Gel", category: "Skin Care", url: "/products/aloe-vera-gel" },
    { id: 5, name: "Brahmi Hair Oil", category: "Hair Care", url: "/products/brahmi-hair-oil" },
    { id: 6, name: "Tulsi Green Tea", category: "Teas", url: "/products/tulsi-green-tea" },
  ],
  categories: [
    { id: 1, name: "Supplements", url: "/categories/supplements" },
    { id: 2, name: "Skin Care", url: "/categories/skin-care" },
    { id: 3, name: "Hair Care", url: "/categories/hair-care" },
    { id: 4, name: "Teas", url: "/categories/teas" },
    { id: 5, name: "Essential Oils", url: "/categories/essential-oils" },
  ],
  pages: [
    { id: 1, name: "About Us", url: "/company/about" },
    { id: 2, name: "Contact Us", url: "/contact" },
    // { id: 3, name: "Blog", url: "/blog" },
    { id: 4, name: "Terms & Conditions", url: "/company/terms" },
    { id: 5, name: "Privacy Policy", url: "/company/privacy" },
    { id: 6, name: "Refund & Cancellation Policy", url: "/company/refund" },
    // { id: 7, name: "FAQs", url: "/faqs" },
    { id: 8, name: "Cookie Policy", url: "/company/cookies" },
    // { id: 9, name: "Return Policy", url: "/company/return" },
    // { id: 10, name: "Payment Methods", url: "/company/payment" },
    // { id: 11, name: "Shipping Information", url: "/company/shipping" },
    // { id: 12, name: "Order Tracking", url: "/order-tracking" },
    // { id: 13, name: "Order Status", url: "/order-status" },
    // { id: 14, name: "Order History", url: "/order-history" },
    
  ],
}

interface CategoryImage {
  public_id: string;
  url: string;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images: CategoryImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: string;
  images: CategoryImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SearchCommandProps {
  products: Product[];
  categories: Category[];
}

export default function SearchCommand({ products, categories }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for products, categories, or pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Products">
            {products.map((product) => (
              <CommandItem key={product._id} onSelect={() => handleSelect(`/products/${product._id}`)}>
                <span>{product.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">in {product.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem key={category._id} onSelect={() => handleSelect(`/category/${category._id}`)}>
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Pages">
            {searchData.pages.map((page) => (
              <CommandItem key={page.id} onSelect={() => handleSelect(page.url)}>
                {page.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

