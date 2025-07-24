'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Toaster } from 'sonner'

export default function BrochureForm() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (!selectedTemplate) {
      toast.error('Template Required', {
        description: 'Please select a brochure template',
      })
      return
    }

    const newOrderId = Math.random().toString(36).substring(7).toUpperCase()
    setOrderId(newOrderId)
    setOpen(true)

    toast.success('Brochure Order Placed!', {
      description: 'Your custom brochure order has been submitted successfully.',
    })
  }

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Select Brochure Template</h1>

      <select
        value={selectedTemplate || ''}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>
          -- Select Template --
        </option>
        <option value="template1">Modern Blue</option>
        <option value="template2">Minimal Black</option>
        <option value="template3">Classic Gold</option>
      </select>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Order
      </button>

      {open && orderId && (
        <div className="mt-4 p-3 border border-green-400 bg-green-100 text-green-800 rounded">
          🎉 Order Successful! Your Order ID is: <strong>{orderId}</strong>
        </div>
      )}

      {/* Toast container */}
      <Toaster richColors position="top-right" />
    </div>
  )
}
