"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MediaUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(incoming: FileList | null) {
    if (!incoming) return
    setFiles((prev) => [...prev, ...Array.from(incoming)])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Media</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border p-8 text-center transition-colors cursor-pointer",
            dragging && "border-primary bg-primary/5"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">Drag and drop images or videos here</p>
          <p className="text-xs text-muted-foreground">
            or click to browse ({files.length} {files.length === 1 ? "file" : "files"} selected)
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => inputRef.current?.click()}
        >
          + Add Media
        </Button>
      </CardContent>
    </Card>
  )
}
