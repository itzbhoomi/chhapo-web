"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
}

export function FileUpload({
  onFileSelect,
  acceptedTypes = [".pdf", ".doc", ".docx"],
  maxSize = 10 * 1024 * 1024,
  className,
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        setUploadedFile(file)
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  })

  const removeFile = () => {
    setUploadedFile(null)
    onFileSelect(null)
  }

  return (
    <Card className={cn("border-2 border-dashed", className)}>
      <CardContent className="p-6">
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={cn("cursor-pointer text-center space-y-4 py-8", isDragActive && "border-primary bg-primary/5")}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">{isDragActive ? "Drop your file here" : "Upload your file"}</p>
              <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
              <p className="text-xs text-muted-foreground mt-2">
                Supported: {acceptedTypes.join(", ")} (Max {Math.round(maxSize / 1024 / 1024)}MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
