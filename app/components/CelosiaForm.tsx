'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CelosiaForm() {
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [color, setColor] = useState('White')
  const [discount, setDiscount] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ height, width, color, discount }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      router.push(`/result?data=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (error) {
      console.error('Failed to fetch:', error)
      alert('Failed to calculate. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="height">Altura (mm)</Label>
        <Input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="width">Ancho (mm)</Label>
        <Input
          id="width"
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Select value={color} onValueChange={setColor}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="White">White</SelectItem>
            <SelectItem value="Black">Black</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="discount">Descuento (%)</Label>
        <Input
          id="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Calcular</Button>
    </form>
  )
}

