"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TemplateEditorProps {
  templateId: number
  onSave: (data: any) => void
}

export function TemplateEditor({ templateId, onSave }: TemplateEditorProps) {
  const [editorData, setEditorData] = useState({
    title: "",
    subtitle: "",
    message: "",
    fontFamily: "Arial",
    fontSize: "16",
    textColor: "#000000",
    backgroundColor: "#ffffff",
  })

  const handleSave = () => {
    onSave(editorData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editorData.title}
              onChange={(e) => setEditorData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={editorData.subtitle}
              onChange={(e) => setEditorData((prev) => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Enter subtitle"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={editorData.message}
            onChange={(e) => setEditorData((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Enter your message"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
              value={editorData.fontFamily}
              onValueChange={(value) => setEditorData((prev) => ({ ...prev, fontFamily: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select
              value={editorData.fontSize}
              onValueChange={(value) => setEditorData((prev) => ({ ...prev, fontSize: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
                <SelectItem value="20">20px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <Input
              id="textColor"
              type="color"
              value={editorData.textColor}
              onChange={(e) => setEditorData((prev) => ({ ...prev, textColor: e.target.value }))}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
