"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { X, Upload, GripHorizontal } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: Array<{ public_id?: string; url: string; _id?: string } | { file: File; preview: string }>
  onChange: (value: Array<{ public_id?: string; url: string; _id?: string } | { file: File; preview: string }>) => void
  onRemove: (value: { public_id?: string; url: string }) => void
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [files, setFiles] = useState<Array<{ public_id?: string; url: string; preview?: string; file?: File }>>(
    value?.map((item) => ({
      public_id: 'public_id' in item ? item.public_id : undefined,
      url: 'url' in item ? item.url : item.preview,
      preview: 'preview' in item ? item.preview : 'url' in item ? item.url : undefined,
      file: 'file' in item ? item.file : undefined,
    })) || [],
  )
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        url: URL.createObjectURL(file),
      }))

      setFiles((prev) => [...prev, ...newFiles])
      onChange([...value, ...newFiles.map(f => ({ file: f.file, preview: f.preview }))])
    },
    [onChange, value],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 15 * 1024 * 1024, // 5MB
  })

  const handleRemove = (index: number) => {
    const fileToRemove = files[index]
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)

    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)

    if (fileToRemove.public_id) {
      onRemove({ public_id: fileToRemove.public_id, url: fileToRemove.url })
    }
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index)
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedIndex(null)
    e.currentTarget.classList.remove('opacity-50')
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null) return
    
    const newFiles = [...files]
    const draggedItem = newFiles[draggedIndex]
    newFiles.splice(draggedIndex, 1)
    newFiles.splice(dropIndex, 0, draggedItem)
    setFiles(newFiles)
    
    const newValue = [...value]
    const draggedValue = newValue[draggedIndex]
    newValue.splice(draggedIndex, 1)
    newValue.splice(dropIndex, 0, draggedValue)
    onChange(newValue)
    
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">Drag & drop images here, or click to select files</p>
          <p className="text-xs text-gray-400">(Max 5MB per image, JPG, PNG, WebP)</p>
          <Button type="button" variant="outline" size="sm" className="mt-2">
            Select Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="relative aspect-square rounded-md overflow-hidden border group cursor-move"
            >
              <Image src={file.url || file.preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripHorizontal className="h-6 w-6 text-white drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

