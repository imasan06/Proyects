import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const shootingTips = [
  "Snap your wrist.",
  "High, relaxed follow-through.",
  "Elbow under ball.",
  "Quick release.",
  "Use leg power.",
  "Stay balanced.",
  "Aim for 45° arc.",
  "Guide with shooting hand.",
  "Form shooting daily.",
  "Shoot on the move.",
  "Adjust misses with leg power.",
  "Engage your core.",
  "Catch ready to shoot.",
  "Avoid leaning/fading.",
  "Finish on a make."
];


  export const Tipgenerator = () => {
    const [currentTip, setCurrentTip] = useState(0)
  
    useEffect(() => {
      const tipInterval = setInterval(() => {
        setCurrentTip((prevTip) => (prevTip + 1) % shootingTips.length)
      }, 10000) // Change tip every 10 seconds (10000ms)
  
      return () => clearInterval(tipInterval)
    }, [])
  
    return (
      <div className=" relative  mobile-full-width mobile-order-2 mobile-mt-4 md:w-1/2 md:absolute md:top-60 md:right-0 md:px-10 px-10">
        <Card className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" /> Shooting Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl italic">{shootingTips[currentTip]}</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  export default Tipgenerator
