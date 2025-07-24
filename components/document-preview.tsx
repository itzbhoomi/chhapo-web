"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface DocumentPreviewProps {
  file: File | null
}

export function DocumentPreview({ file }: DocumentPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)

      return () => URL.revokeObjectURL(url)
    }
  }, [file])

  useEffect(() => {
    const iframe = iframeRef.current

    const handleLoad = () => setLoading(false)

    if (iframe) {
      setLoading(true)
      iframe.addEventListener("load", handleLoad)
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad)
      }
    }
  }, [previewUrl])

  if (!file) return null

  const fileType = file.type

  if (fileType.startsWith("image/")) {
    return (
      <div className="rounded-md border p-4">
        <Image
          src={previewUrl || ""}
          alt="Uploaded preview"
          className="rounded-md"
          width={300}
          height={300}
        />
      </div>
    )
  }

  if (
    fileType === "application/pdf" ||
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      <div className="relative mt-4 h-[500px] w-full overflow-hidden rounded-md border">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={previewUrl || ""}
          title="Document Preview"
          className="h-full w-full"
        />
      </div>
    )
  }

  return (
    <div className="mt-2 text-sm text-red-500">
      Unsupported file type: {fileType}
    </div>
  )
}
