// src/components/Accuracy.tsx
"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button" // o react-hot-toast
import { postData } from "@/api/api"
import { toast } from "@/hooks/use-toast"

export default function Accuracy() {
  const [madeShots, setMadeShots]     = useState<string>("")
  const [missedShots, setMissedShots] = useState<string>("")

  const made    = parseInt(madeShots)   || 0
  const missed  = parseInt(missedShots) || 0
  const total   = made + missed
  const accuracy= total === 0 
    ? "0.0" 
    : ((made / total) * 100).toFixed(1)

  // Enviar al backend
  const handleSave = async () => {
    const token  = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if (!token || !userId) {
      toast({ title: "Error", description: "Inicia sesión primero", variant: "destructive" })
      return
    }

    try {
      await postData(
        "/performance/add",
        { userId, shotsMade: made, shotsAttempted: total },
        token
      )
      toast({ title: "Sesión guardada", description: `Encestados: ${made}, Intentos: ${total}` })
      // opcional: limpiar inputs
      setMadeShots("")
      setMissedShots("")
    } catch (err) {
      console.error(err)
      toast({ title: "Error", description: "No se pudo guardar", variant: "destructive" })
    }
  }

  return (
    <div className="accuracy-container">
      <Card className="accuracy-card bg-[#D9D9D9]">
        <div className="accuracy-grid">
          <div>
            <Label htmlFor="made">Made Shots</Label>
            <Input
              id="made"
              type="number"
              min="0"
              value={madeShots}
              onChange={e => setMadeShots(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="missed">Missed Shots</Label>
            <Input
              id="missed"
              type="number"
              min="0"
              value={missedShots}
              onChange={e => setMissedShots(e.target.value)}
            />
          </div>
        </div>

        <div className="accuracy-result-group">
          <Label>Accuracy</Label>
          <Input readOnly value={`${accuracy}%`} />
          <div>Total: {total}</div>
        </div>

        <Button 
          className="mt-4 w-full bg-primary text-white"
          onClick={handleSave}
          disabled={total === 0}
        >
          Save
        </Button>
      </Card>
    </div>
  )
}
