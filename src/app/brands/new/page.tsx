import CreateBrandForm from "./CreateBrandForm"
export default function CreateBrandPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Brand</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* @ts-expect-error Async Server Component */}
        <CreateBrandForm />
      </div>
    </div>
  )
}