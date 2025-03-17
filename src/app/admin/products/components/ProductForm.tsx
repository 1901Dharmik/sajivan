"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUpload from "../components/image-upload"
import { MultiSelect } from "../components/multi-select"
import { ProblemToCareSection } from "../components/problem-to-care-section"
import { IngredientsSection } from "../components/ingredients-section"

const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  category: z.array(z.string()).min(1, { message: "Select at least one category" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  tags: z.array(z.string()).optional(),
  care_for: z.array(z.string()).optional(),
  who_should_use: z.array(z.string()).optional(),
  dosage: z.array(z.string()).optional(),
  images: z.array(z.any()).optional(),
  problem_to_cure: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        images: z.array(z.any()).optional(),
      }),
    )
    .optional(),
  ingredients: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().min(1, { message: "Description is required" }),
      }),
    )
    .optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  initialData?: any
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [brands, setBrands] = useState<string[]>([])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: [],
      brand: "",
      stock: 0,
      tags: [],
      care_for: [],
      who_should_use: [],
      dosage: [],
      images: [],
      problem_to_cure: [{ title: "", description: "", images: [] }],
      ingredients: [{ title: "", description: "" }],
    },
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace with your actual API endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        if (!res.ok) throw new Error("Failed to fetch categories")
        const data = await res.json()
        setCategories(data.map((cat: any) => cat.name))
      } catch (error) {
        console.error("Error fetching categories:", error)
        // Fallback categories for demo
        setCategories(["Skincare", "Haircare", "Makeup", "Fragrance", "Bath & Body"])
      }
    }

    const fetchBrands = async () => {
      try {
        // Replace with your actual API endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brands`)
        if (!res.ok) throw new Error("Failed to fetch brands")
        const data = await res.json()
        setBrands(data.map((brand: any) => brand.name))
      } catch (error) {
        console.error("Error fetching brands:", error)
        // Fallback brands for demo
        setBrands(["L'Oréal", "Nivea", "Dove", "Neutrogena", "Olay"])
      }
    }

    fetchCategories()
    fetchBrands()
  }, [])

  async function onSubmit(values: ProductFormValues) {
    try {
      setIsLoading(true)

      // Convert image files to base64 strings for upload
      if (values.images && values.images.length > 0) {
        values.images = await Promise.all(
          values.images.map(async (image: any) => {
            if ('url' in image && image.url) return image
            if ('file' in image && image.file) {
              return await convertFileToBase64(image.file)
            }
            return image
          }),
        )
      }

      // Convert problem_to_cure images to base64
      if (values.problem_to_cure && values.problem_to_cure.length > 0) {
        for (const problem of values.problem_to_cure) {
          if (problem.images && problem.images.length > 0) {
            problem.images = await Promise.all(
              problem.images.map(async (image: any) => {
                if ('url' in image && image.url) return image
                if ('file' in image && image.file) {
                  return await convertFileToBase64(image.file)
                }
                return image
              }),
            )
          }
        }
      }

      const url = initialData
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/products`

      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong")
      }

      toast({
        title: `Product ${initialData ? "updated" : "created"} successfully`,
        description: `${values.name} has been ${initialData ? "updated" : "created"}.`,
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="problems">Problem to Care</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" className="min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={categories.map((cat) => ({ label: cat, value: cat }))}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select categories"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <MultiSelect
                            creatable
                            options={[]}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add tags"
                          />
                        </FormControl>
                        <FormDescription>Enter tags and press Enter to add them</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || []}
                          onChange={field.onChange}
                          onRemove={(url) => field.onChange(field.value?.filter((current) => current !== url))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="care_for"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Care For</FormLabel>
                        <FormControl>
                          <MultiSelect
                            creatable
                            options={[]}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add care instructions"
                          />
                        </FormControl>
                        <FormDescription>Enter care instructions and press Enter to add them</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="who_should_use"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who Should Use</FormLabel>
                        <FormControl>
                          <MultiSelect
                            creatable
                            options={[]}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add target users"
                          />
                        </FormControl>
                        <FormDescription>Enter target users and press Enter to add them</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage Instructions</FormLabel>
                        <FormControl>
                          <MultiSelect
                            creatable
                            options={[]}
                            selected={field.value || []}
                            onChange={field.onChange}
                            placeholder="Add dosage instructions"
                          />
                        </FormControl>
                        <FormDescription>Enter dosage instructions and press Enter to add them</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="problems" className="mt-4">
            <ProblemToCareSection form={form} />
          </TabsContent>

          <TabsContent value="ingredients" className="mt-4">
            <IngredientsSection form={form} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/products")} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : initialData ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

