"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PostContentEditor from "@/components/create-post/PostContentEditor"
import MediaUpload from "@/components/create-post/MediaUpload"
import PlatformSelector from "@/components/create-post/PlatformSelector"
import SchedulePicker from "@/components/create-post/SchedulePicker"
import type { Platform } from "@/lib/mock-data"

export default function CreatePostPage() {
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["twitter", "instagram"])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Create Post</h1>
        <p className="text-muted-foreground mt-1">Compose and schedule content across all platforms</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PostContentEditor
            content={content}
            onContentChange={setContent}
            selectedPlatforms={selectedPlatforms}
          />
          <MediaUpload />
        </div>

        <div className="flex flex-col gap-4">
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            onSelectionChange={setSelectedPlatforms}
          />
          <SchedulePicker />
          <div className="flex flex-col gap-2">
            <Button className="w-full">Schedule Post</Button>
            <Button variant="outline" className="w-full">Publish Now</Button>
            <Button variant="ghost" className="w-full">Save Draft</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
