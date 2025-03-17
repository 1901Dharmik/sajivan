'use client';
import { Skeleton } from "@/components/ui/skeleton"

export function CartSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-full max-w-md" />
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <div className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="space-y-2 flex-grow">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-80 space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}

