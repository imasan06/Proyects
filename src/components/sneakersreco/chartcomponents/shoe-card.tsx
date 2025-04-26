"use client"

import { motion } from "framer-motion"
import { Star, ShoppingCart } from "lucide-react"

type ShoeProps = {
  name: string
  image: string
  price: string
  features: string[]
}

export default function ShoeCard({ shoe, index }: { shoe: ShoeProps; index: number }) {
  return (
    <motion.div
      className="bg-gray-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <img src={shoe.image || "/placeholder.svg"} alt={shoe.name} className="w-full h-48 object-cover" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-20 opacity-0"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          
        </motion.div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{shoe.name}</h3>
          <span className="text-amber-500 font-bold">{shoe.price}</span>
        </div>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className={`w-4 h-4 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
          ))}
          <span className="text-xs text-gray-400 ml-2">(24 reviews)</span>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            {shoe.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-500 mt-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

