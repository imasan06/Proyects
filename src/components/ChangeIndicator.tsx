"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface ChangeIndicatorProps {
  change: number
}

export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ change }) => {
  if (change > 0) {
    return (
      <Badge className="bg-green-600 hover:bg-green-700 ml-2 flex items-center">
        <ArrowUpRight className="h-3 w-3 mr-1" />
        +{change.toFixed(1)}%
      </Badge>
    )
  } else if (change < 0) {
    return (
      <Badge className="bg-red-600 hover:bg-red-700 ml-2 flex items-center">
        <ArrowDownRight className="h-3 w-3 mr-1" />
        {change.toFixed(1)}%
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-zinc-600 hover:bg-zinc-700 ml-2 flex items-center">
        <Minus className="h-3 w-3 mr-1" />
        0%
      </Badge>
    )
  }
}
