"use client"
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/ui/extension/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { CloudUpload, Paperclip } from "lucide-react";
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
} from "@/components/ui/extension/file-upload";
import Image from "next/image";
import { DropzoneOptions } from "react-dropzone";
import { url } from "inspector";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    price: z.number().min(800),
    categories: z.array(z.string()).nonempty("Please select at least one item"),
    brand: z.string(),
    stock: z.number(),
    Images: z.array(z.instanceof(File)).nonempty("Images are required"),
});

export default function MyForm() {
    const [files, setFiles] = useState<File[] | null>(null);
    const [images, setImages] = useState([]);

  const handleUpload = async (files) => {
    // Simulate an API call to upload images and return uploaded image data
    return files.map((file, index) => ({
      url: URL.createObjectURL(file), // Replace with real URL from API response
      public_id: `image_${index}`,
    }));
  };

  const handleDelete = async (publicId) => {
    // Simulate an API call to delete the image
    return true;
  };

    // const handleUpload = async (files: File[]) => {
    //     // Simulate an API call to upload images and return uploaded image data
    //     return files.map((file, index) => ({
    //       url: URL.createObjectURL(file), // Replace with real URL from API response
    //       public_id: `image_${index}`,
    //     }));
    //   };
    
    //   const handleDelete = async (publicId: string) => {
    //     // Simulate an API call to delete the image
    //     return true;
    //   };



const dropzone = {
    accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
} satisfies DropzoneOptions;



const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        categories: ["React"],
    },
});

function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log(values);
        toast(
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(values, null, 2)}</code>
            </pre>
        );
    } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
    }
}

return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Product Name" type="text" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Placeholder" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>You can @mention other users and organizations.</FormDescription>
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
                            <Input
                                placeholder="800"
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Select Categories</FormLabel>
                        <FormControl>
                            <MultiSelector
                                values={field.value}
                                onValuesChange={field.onChange}
                                loop
                                className="max-w-xs"
                            >
                                <MultiSelectorTrigger>
                                    <MultiSelectorInput placeholder="Select languages" />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                    <MultiSelectorList>
                                        <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                                        <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                                        <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                                    </MultiSelectorList>
                                </MultiSelectorContent>
                            </MultiSelector>
                        </FormControl>
                        <FormDescription>Select multiple options.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>You can manage email addresses in your email settings.</FormDescription>
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
                            <Input
                                placeholder="100"
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="Images"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                        <ImageUpload images={images} setImages={setImages} onUpload={handleUpload} onDelete={handleDelete} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="Images"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Upload Product Images</FormLabel>
                        <FormControl>
                            <FileUploader
                                value={files}
                                onValueChange={(files) => {
                                    setFiles(files);
                                    // field.onChange(files);
                                    form.setValue("Images", files);
                                }}
                                dropzoneOptions={dropzone}
                            >
                                <FileInput>
                                    <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
                                        <p className="text-gray-400">Drop files here</p>
                                    </div>
                                </FileInput>
                                <FileUploaderContent className="flex items-center flex-row gap-2">
                                    {files?.map((file, i) => (
                                        <FileUploaderItem
                                            key={i}
                                            index={i}
                                            className="size-20 p-0 rounded-md overflow-hidden"
                                            aria-roledescription={`file ${i + 1} containing ${file.name}`}
                                        >
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                height={80}
                                                width={80}
                                                className="size-20 p-0"
                                            />
                                        </FileUploaderItem>
                                    ))}
                                </FileUploaderContent>
                            </FileUploader>
                        </FormControl>
                        <FormDescription>Select a file to upload.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
    </Form>
);
}
