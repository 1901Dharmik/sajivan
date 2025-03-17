import { Skeleton } from "@/components/ui/skeleton"

export default function ContactFormSkeleton() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-[150px] w-full" />
        </div>

        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

