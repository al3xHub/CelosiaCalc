'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const data = JSON.parse(decodeURIComponent(searchParams.get('data') || '{}'))

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Cantidad de lamas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.slats}</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Desglose de precio</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio unitario</TableHead>
                <TableHead>Precio total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.ref}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>€{item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>€{item.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <p className="text-xl font-bold">Precio total: €{data.totalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/">
          <Button>Volver a calcular</Button>
        </Link>
      </div>
    </div>
  )
}

