"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle } from "lucide-react"

type PositionProps = {
  name: string
  description: string
  characteristics: string[]
  shoeNeeds: string[]
  pros: string[]
  cons: string[]
  color: string
  shoes: {
    name: string
    image: string
    price: string
    features: string[]
  }[]
}

export default function PositionChart({ position }: { position: PositionProps }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div className="bg-gray-700/50 rounded-lg p-5" variants={container} initial="hidden" animate="show">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Key Characteristics
        </h3>
        <motion.ul className="space-y-2" variants={container} initial="hidden" animate="show">
          {position.characteristics.map((char) => (
            <motion.li key={char} className="flex items-center gap-2 text-gray-300" variants={item}>
              <span className="w-1 h-1 rounded-full bg-blue-400"></span>
              {char}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div className="bg-gray-700/50 rounded-lg p-5" variants={container} initial="hidden" animate="show">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Pros
        </h3>
        <motion.ul className="space-y-2" variants={container} initial="hidden" animate="show">
          {position.pros.map((pro) => (
            <motion.li key={pro} className="flex items-center gap-2 text-gray-300" variants={item}>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {pro}
            </motion.li>
          ))}
        </motion.ul>

        <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          Cons
        </h3>
        <motion.ul className="space-y-2" variants={container} initial="hidden" animate="show">
          {position.cons.map((con) => (
            <motion.li key={con} className="flex items-center gap-2 text-gray-300" variants={item}>
              <XCircle className="w-4 h-4 text-red-500" />
              {con}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div className="bg-gray-700/50 rounded-lg p-5" variants={container} initial="hidden" animate="show">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Ideal Shoe Characteristics
        </h3>
        <motion.ul className="space-y-2" variants={container} initial="hidden" animate="show">
          {position.shoeNeeds.map((need) => (
            <motion.li key={need} className="flex items-center gap-2 text-gray-300" variants={item}>
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              {need}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}

