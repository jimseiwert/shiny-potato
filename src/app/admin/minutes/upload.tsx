'use client';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner"
import { useDropzone } from 'react-dropzone';
import { Newspaper } from "lucide-react";

export function FileSelector() {
    const router = useRouter();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        for (let i = 0; i < acceptedFiles.length; i++) {
            const file = acceptedFiles[i];

            if (!file) {
                toast.error("No file selected")
                return;
            }
            try {
                toast(`Uploading ${file.name}`);
                const response = await fetch('/api/minute?filename=' + file.name, {
                    method: 'POST',
                    body: file,
                });

                if (!response.ok) {
                    toast.error("Upload Failed " + response.statusText);
                    throw new Error(`Error uploading file: ${response.status}`);
                }

                router.refresh();
            } catch (error) {
                console.error('Error uploading file:', error);
            }


        }
    }, [router])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'application/pdf': ['.pdf'],
        }
    })


    return (


        <div {...getRootProps({ className: 'dropzone flex items-center justify-center w-full"' })}>
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center py-5 px-10">
                    <Newspaper />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF Only</p>
                </div>
                <input {...getInputProps()} type="file" className="hidden" />
            </label>
        </div>
    )
}