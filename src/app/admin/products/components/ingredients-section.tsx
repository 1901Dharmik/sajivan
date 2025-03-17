"use client"

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface IngredientsProps {
  form: UseFormReturn<any>
}

export function IngredientsSection({ form }: IngredientsProps) {
  const ingredients = form.watch("ingredients") || []

  const addIngredient = () => {
    const currentIngredients = form.getValues("ingredients") || []
    form.setValue("ingredients", [...currentIngredients, { title: "", description: "" }])
  }

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients") || []
    const newIngredients = [...currentIngredients]
    newIngredients.splice(index, 1)
    form.setValue("ingredients", newIngredients)
  }

  return (
    <div className="space-y-4">
      {ingredients.map((_, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ingredient {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeIngredient(index)}
                disabled={ingredients.length <= 1}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`ingredients.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ingredient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`ingredients.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter ingredient description" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addIngredient} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Ingredient
      </Button>
    </div>
  )
}

