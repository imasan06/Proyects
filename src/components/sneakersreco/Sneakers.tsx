"use client"

import { useState, useEffect } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion, useAnimation } from "framer-motion"

type PositionData = {
  name: string
  speed: number
  strength: number
  shooting: number
  defense: number
  playmaking: number
}

const attributes = ["speed", "strength", "shooting", "defense", "playmaking"]

export default function Sneakers({
  selectedPosition,
}: { selectedPosition: PositionData | null | undefined }) {
  const [animatedData, setAnimatedData] = useState(selectedPosition ? createChartData(selectedPosition) : [])
  const controls = useAnimation()

  useEffect(() => {
    if (selectedPosition) {
      const targetData = createChartData(selectedPosition)
      controls.start({
        transition: { duration: 0.5, ease: "easeInOut" },
      })
      setAnimatedData(targetData)
    }
  }, [selectedPosition, controls])

  if (!selectedPosition) return null

  function createChartData(position: PositionData) {
    return attributes.map((attr) => ({
      attribute: attr.charAt(0).toUpperCase() + attr.slice(1),
      value: position[attr as keyof PositionData],
    }))
  }

  return (
    <motion.div
      layout
      className="w-full p-4 bg-gray-800 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3 layout="position" className="text-xl font-bold mb-4 text-center">
        {selectedPosition.name} Attributes
      </motion.h3>
      <ChartContainer
        className="h-[400px] w-full"
        config={{
          [selectedPosition.name]: {
            label: selectedPosition.name,
            color: "hsl(265, 89%, 78%)",
          },
          attribute: {
            label: "Attribute",
          },
        }}
      >
        <RadarChart data={animatedData} outerRadius={150}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis dataKey="attribute" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />

          <Radar
            name={selectedPosition.name}
            dataKey="value"
            stroke={`var(--color-${selectedPosition.name.replace(/\s+/g, "")})`}
            fill={`var(--color-${selectedPosition.name.replace(/\s+/g, "")})`}
            fillOpacity={0.3}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </motion.div>
  )
}

