import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import AddToCartButton from "./AddToCart"
import AddToWishlistButton from "./AddToWishlistButton"

async function getProducts() {
  try {
    // Replace with your actual API endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export default async function ProductList() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products && products.length > 0 ? (
        products.map((product: any) => (
          <Card key={product._id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image</p>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="truncate">{product.name}</span>
                <Badge>${product.price}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.category.map((cat: string) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/products/edit/${product._id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <AddToCartButton productId={product._id} />
              <AddToWishlistButton
                productId={product._id}
              // isInWishlist={boolean}
              // wishlistItemId="wishlist_item_id_if_exists"
              />
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}

