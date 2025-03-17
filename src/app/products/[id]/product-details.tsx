import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const features = [
  { name: "Plant Based & Vegan", icon: "🌱" },
  { name: "GMP Certified", icon: "✓" },
  { name: "No Preservatives", icon: "🚫" },
  { name: "Ayush Certified", icon: "✨" },
]

export default function ProductDetails({product}) {
  return (
    <div className="flex flex-col gap-6 mt-12 px-4">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(0 Reviews)</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {features.map((feature) => (
          <div key={feature.name} className="flex items-center gap-2 rounded-lg border bg-background p-2">
            <span className="text-lg">{feature.icon}</span>
            <span className="text-sm font-medium">{feature.name}</span>
          </div>
        ))}
      </div>

      <div className="text-3xl font-bold">$3,499</div>

      <div className="flex items-center gap-4">
        <Select defaultValue="1">
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="flex-1">Add to Cart</Button>
        <Button variant="secondary" className="flex-1">
          Buy Now
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Description</h2>
        <p className="text-muted-foreground">
          Experience the future of spatial computing with Apple Vision Pro. This revolutionary device seamlessly blends
          digital content with your physical space, featuring a micro‑OLED technology that packs 23 million pixels
          across two displays, and a revolutionary dual‑chip design featuring Apple M2 and R1 processors.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Free shipping and returns available on all orders!</p>
          <p>We ship all domestic orders within 5-10 business days!</p>
        </div>
      </div>
    </div>
  )
}

