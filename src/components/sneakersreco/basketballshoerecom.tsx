"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, ShoppingBag, Info } from "lucide-react"
import PositionChart from "./chartcomponents/position-chart"
import ShoeCard from "./chartcomponents/shoe-card"
import PositionRadarChart from "./chartcomponents/position-radar-chart"

export default function BasketballShoeRecommender() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [showChart, setShowChart] = useState(false)

  const positions = [
    {
      name: "Point Guard (PG)",
      description: "Floor general, primary ball handler and playmaker",
      characteristics: ["Speed", "Agility", "Ball handling", "Court vision"],
      shoeNeeds: ["Lightweight", "Responsive cushioning", "Good court feel", "Excellent traction"],
      pros: ["Quick first step", "Precise passing", "High basketball IQ"],
      cons: ["Usually smaller size", "May struggle against bigger defenders"],
      color: "from-purple-500 to-blue-600",
      speed: 90,
      strength: 60,
      shooting: 85,
      defense: 75,
      playmaking: 95,
      shoes: [
        {
          name: "Nike Kyrie 8",
          image: "https://m.media-amazon.com/images/I/71FiQ2u1zRL._AC_SL1500_.jpg",
          price: "$140",
          features: ["Lightweight design", "Responsive cushioning", "Excellent traction", "Low-to-the-ground feel"],
        },
        {
          name: "Under Armour Curry 10",
          image: "https://about.underarmour.com/content/ua/about/na/us/en/stories/2022/10/ua-and-stephen-curry-go-10-for-10/_jcr_content/root/container/container/multiimage_345923345/images/images1_4022303.coreimg.jpg",
          price: "$160",
          features: ["Lightweight", "Superior court feel", "UA Flow cushioning", "Excellent grip"],
        },
        {
          name: "Adidas Trae Young 3",
          image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fc42f1c1c3df4b8d8a6495fa63ad87c2_9366/Zapatillas_Trae_Young_3_Turquesa_IE9303_01_standard.jpg",
          price: "$130",
          features: ["Boost cushioning", "Lightweight upper", "Lockdown fit", "Multi-directional traction"],
        },
      ],
    },
    {
      name: "Shooting Guard (SG)",
      description: "Primary perimeter scorer and outside shooter",
      characteristics: ["Shooting ability", "Scoring", "Perimeter defense", "Off-ball movement"],
      shoeNeeds: ["Ankle support", "Impact protection", "Stability", "Lightweight"],
      pros: ["Scoring versatility", "Perimeter defense", "Shooting range"],
      cons: ["May lack playmaking skills", "Sometimes one-dimensional"],
      color: "from-red-500 to-orange-600",
      speed: 85,
      strength: 65,
      shooting: 90,
      defense: 80,
      playmaking: 75,
      shoes: [
        {
          name: "Nike Kobe 6 Protro",
          image: "https://i.pinimg.com/736x/b3/c2/40/b3c240c17b1f66b30c46e5408fc5fc54.jpg",
          price: "$180",
          features: ["Low-profile design", "Zoom Air cushioning", "Excellent traction", "Lightweight"],
        },
        {
          name: "Jordan 36",
          image: "https://i.ebayimg.com/images/g/kFsAAOSwWypjscqM/s-l1200.webp",
          price: "$185",
          features: ["Eclipse Plate", "Zoom Air strobel", "Lightweight", "Excellent support"],
        },
        {
          name: "New Balance TWO WXY v3",
          image: "https://www.manelsanchez.com/uploads/media/images/new-balance-two-wxy-v3-dressy-1.jpg",
          price: "$140",
          features: ["FuelCell foam", "Fit Weave upper", "Multi-directional traction", "Stability"],
        },
      ],
    },
    {
      name: "Small Forward (SF)",
      description: "Versatile wing player who can score inside and outside",
      characteristics: ["Versatility", "Athleticism", "Scoring ability", "Defensive versatility"],
      shoeNeeds: ["Balance of cushioning and court feel", "Durability", "Support", "Versatile traction"],
      pros: ["All-around skills", "Defensive versatility", "Size and athleticism"],
      cons: ["Jack of all trades, master of none", "Role can vary greatly by team"],
      color: "from-green-500 to-teal-600",
      speed: 80,
      strength: 75,
      shooting: 80,
      defense: 85,
      playmaking: 70,
      shoes: [
        {
          name: "Nike LeBron 20",
          image: "https://modozapatillas.com/upload/productos/galeria/normal/nike-lebron-20-violet-frost-b72c3cf2c6b35b4bf5ca6745af251831.jpg",
          price: "$200",
          features: ["Max Air and Zoom Air", "Durable materials", "Excellent support", "Multi-position performance"],
        },
        {
          name: "Adidas Dame 8",
          image: "https://m.media-amazon.com/images/I/71xOJFfyfzL._AC_SL1500_.jpg",
          price: "$120",
          features: ["Bounce Pro cushioning", "Lightweight upper", "Supportive fit", "Versatile traction"],
        },
        {
          name: "Puma Clyde All-Pro",
          image: "https://preview.redd.it/mini-review-of-and-a-small-trick-to-fix-the-restocked-puma-v0-q0vqvwxl4tjb1.jpg?width=1080&crop=smart&auto=webp&s=91e176055151e4c842304ac051d67028e76b5784",
          price: "$130",
          features: ["ProFoam+", "Lightweight", "Supportive", "Excellent traction"],
        },
      ],
    },
    {
      name: "Power Forward (PF)",
      description: "Interior player with strength and rebounding ability",
      characteristics: ["Strength", "Rebounding", "Post play", "Mid-range shooting"],
      shoeNeeds: ["Durability", "Impact protection", "Stability", "Support"],
      pros: ["Interior presence", "Rebounding ability", "Physical strength"],
      cons: ["Limited range", "Sometimes less mobile"],
      color: "from-blue-500 to-indigo-600",
      speed: 70,
      strength: 85,
      shooting: 70,
      defense: 85,
      playmaking: 60,
      shoes: [
        {
          name: "Nike Zoom Freak 6",
          image: "https://sneakerbardetroit.com/wp-content/uploads/2024/04/Nike-Giannis-Freak-6-Roses-FV1295-100-Release-Info.jpg",
          price: "$130",
          features: ["Zoom Air cushioning", "Durable materials", "Excellent stability", "Supportive fit"],
        },
        {
          name: "Adidas Harden Vol. 9",
          image: "https://images2.minutemediacdn.com/image/upload/c_crop,w_1350,h_759,x_0,y_153/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/kicks/01jffpqq5m37wjk64yh4.jpg",
          price: "$140",
          features: ["Boost cushioning", "Durable rubber outsole", "Supportive upper", "Impact protection"],
        },
        {
          name: "Under Armour HOVR Havoc 5",
          image: "https://m.media-amazon.com/images/I/618a9Cl2XxL._AC_SL1200_.jpg",
          price: "$115",
          features: ["HOVR cushioning", "Durable materials", "Excellent support", "Stability features"],
        },
      ],
    },
    {
      name: "Center (C)",
      description: "Tallest player, protects the rim and dominates the paint",
      characteristics: ["Height", "Shot blocking", "Rebounding", "Post scoring"],
      shoeNeeds: ["Maximum support", "Durability", "Impact protection", "Stability"],
      pros: ["Rim protection", "Rebounding dominance", "High-percentage scoring"],
      cons: ["Limited mobility", "Often poor free throw shooting"],
      color: "from-pink-500 to-purple-600",
      speed: 60,
      strength: 95,
      shooting: 55,
      defense: 90,
      playmaking: 50,
      shoes: [
        {
          name: "Nike Zoom GT Jump 2",
          image: "https://i.ebayimg.com/thumbs/images/g/-oEAAOSwGbxmYZD6/s-l1200.jpg",
          price: "$180",
          features: ["Stacked Zoom Air", "Maximum impact protection", "Durable materials", "Excellent support"],
        },
        {
          name: "Adidas Adistar",
          image: "https://m.media-amazon.com/images/I/71Jd+9JHtDL._AC_SL1500_.jpg",
          price: "$130",
          features: ["Boost cushioning", "Durable rubber outsole", "Maximum support", "Stability features"],
        },
        {
          name: "Puma MB.01",
          image: "https://www.nicekicks.com/files/2022/01/Puma-MB.01-Rick-And-Morty-Lead.jpg",
          price: "$125",
          features: ["ProFoam+", "Durable materials", "Excellent support", "Impact protection"],
        },
      ],
    },
  ]

  useEffect(() => {

    if (selectedPosition) {
      setShowChart(false)
      setTimeout(() => setShowChart(true), 300)
    }
  }, [selectedPosition])

  const selectedPositionData = positions.find((pos) => pos.name === selectedPosition)

  return (
    <div className="min-h-screen w-screen px-5 text-gray-100 pb-20">
      <header className=" p-6 shadow-xl">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Basketball Shoe Recommender
        </motion.h1>
        <motion.p
          className="text-center text-gray-400 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find the perfect basketball shoes based on your position on the court
        </motion.p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ gridAutoRows: "minmax(120px, auto)" }}
        >
          {positions.map((position) => (
            <motion.div
              key={position.name}
              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                selectedPosition === position.name
                  ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-white/50"
                  : "hover:scale-105"
              }`}
              whileHover={{ scale: selectedPosition === position.name ? 1 : 1.05 }}
              onClick={() => setSelectedPosition(position.name)}
            >
              <div className={`bg-gradient-to-br ${position.color} p-6 h-full`}>
                <h2 className="text-xl font-bold mb-2">{position.name}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <PositionRadarChart selectedPosition={selectedPositionData} />
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedPosition && (
            <motion.div
              key={selectedPosition}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="shadow-xl rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPositionData?.name}</h2>
                  </div>
                  <motion.button
                    className="mt-4 md:mt-0 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors"
                    onClick={() => setShowChart(!showChart)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info size={16} />
                    {showChart ? "Hide Position Details" : "Show Position Details"}
                    {showChart ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showChart && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <PositionChart position={selectedPositionData!} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedPositionData?.shoes.map((shoe, index) => (
                    <ShoeCard key={shoe.name} shoe={shoe} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedPosition && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              🏀
            </motion.div>
            <p className="text-2xl font-bold mb-2">Select Your Position</p>
            <p className="text-gray-400">Choose your basketball position to get personalized shoe recommendations</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}

