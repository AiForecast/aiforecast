"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast" // Import the useToast hook
import { X, Upload, FileIcon, Tag } from "lucide-react"
import { useRouter } from "next/navigation";

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [categoryTag, setCategoryTag] = useState("")
  const router = useRouter();
  const { toast } = useToast() // Destructure toast from useToast hook

  const acceptedFileTypes = {
    'image/bmp': ['.bmp'],
    'text/csv': ['.csv'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'message/rfc822': ['.eml'],
    'application/epub+zip': ['.epub'],
    'image/heic': ['.heic'],
    'text/html': ['.html'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'text/markdown': ['.md'],
    'application/vnd.ms-outlook': ['.msg'],
    'application/vnd.oasis.opendocument.text': ['.odt'],
    'text/x-org': ['.org'],
    'application/pkcs7-signature': ['.p7s'],
    'application/pdf': ['.pdf'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'text/x-rst': ['.rst'],
    'application/rtf': ['.rtf'],
    'image/tiff': ['.tiff'],
    'text/plain': ['.txt'],
    'text/tab-separated-values': ['.tsv'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/xml': ['.xml'],
  }

  const supportedExtensions = Array.from(new Set(Object.values(acceptedFileTypes).flat())).sort()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleUpload = async () => {
    // Check if categoryTag contains only alphabets and is not empty
    if (!/^[a-zA-Z]+$/.test(categoryTag)) {
      toast({
        title: "Invalid Category Tag",
        description: "The category tag should only contain alphabets and should not be empty.",
      })
      return
    }

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
  
    formData.append('search_space', categoryTag)
    formData.append('api_key', window.localStorage.getItem("openaikey") || "nothing")
  
    try {
      toast({
        title: "File Upload",
        description: "Files Uploading Initiated",
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/uploadfiles/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error("Upload failed")
      }
  
      const responseData = await response.json()
      toast({
        title: "Upload Successful",
        description: responseData.message,
      })

      router.push('/dashboard/playground');
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: `Error uploading files: ${error.message}`,
      })
    }
  }

  return (
    <div className="max-w-md mt-40 mx-auto p-6 bg-background rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-border"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-foreground">
          Drag &amp; drop files here, or click to select files
        </p>
        <em className="text-xs text-muted-foreground">
          (Max 10MB per file)
        </em>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium text-foreground mb-2">Supported file types:</p>
        <div className="flex flex-wrap gap-2">
          {supportedExtensions.map((ext) => (
            <span key={ext} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {ext}
            </span>
          ))}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex items-center space-x-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Add a SEARCH SPACE tag for these files."
            value={categoryTag}
            onChange={(e) => setCategoryTag(e.target.value)}
            className="flex-1"
            maxLength={50}
          />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {files.map((file, index) => (
          <div key={file.name} className="flex items-center space-x-4 bg-muted p-3 rounded-md">
            <FileIcon className="h-8 w-8 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFile(index)}
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <Button
          className="mt-4 w-full"
          onClick={() => handleUpload()}
        >
          Upload {files.length} {files.length === 1 ? "file" : "files"}
        </Button>
      )}
    </div>
  )
}
