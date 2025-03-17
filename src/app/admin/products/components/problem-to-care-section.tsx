"use client"
import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import ImageUpload from "./image-upload"

interface ProblemToCareProps {
  form: UseFormReturn<any>
}

export function ProblemToCareSection({ form }: ProblemToCareProps) {
  const problems = form.watch("problem_to_cure") || []

  const addProblem = () => {
    const currentProblems = form.getValues("problem_to_cure") || []
    form.setValue("problem_to_cure", [...currentProblems, { title: "", description: "", images: [] }])
  }

  const removeProblem = (index: number) => {
    const currentProblems = form.getValues("problem_to_cure") || []
    const newProblems = [...currentProblems]
    newProblems.splice(index, 1)
    form.setValue("problem_to_cure", newProblems)
  }

  return (
    <div className="space-y-4">
      {problems.map((_, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Problem to Care {index + 1}</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeProblem(index)}
                disabled={problems.length <= 1}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`problem_to_cure.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problem_to_cure.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`problem_to_cure.${index}.images`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || []}
                        onChange={field.onChange}
                        onRemove={(url) => field.onChange(field.value?.filter((current: any) => current !== url))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addProblem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Problem to Care
      </Button>
    </div>
  )
}

