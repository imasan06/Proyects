import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
const passingTips = [
    "Use your fingertips, not palms.",
    "Follow through on every pass.",
    "Keep your head up while passing.",
    "Pass to a teammate’s hands.",
    "Use your off-hand for control.",
    "Fake before passing.",
    "Snap your wrists for accuracy.",
    "Pass with purpose, not hesitation.",
    "Lead your teammate into motion.",
    "Keep passes quick and sharp.",
    "Avoid telegraphing your passes.",
    "Master bounce and chest passes.",
    "Pass away from defenders.",
    "Use both hands equally.",
    "Stay balanced when passing.",
  ];
  
  const passingChallenges = [
    "Make 50 perfect chest passes.",
    "Complete 20 bounce passes.",
    "Do 15 overhead passes.",
    "Hit a moving target 10 times.",
    "Pass with weak hand 20 times.",
    "Make 5 no-look passes.",
    "Complete 10 full-court passes.",
    "Pass under pressure 10 times.",
    "Perform 10 fast break passes.",
    "Execute 5 perfect pick-and-roll passes.",
    "Make 3 assists in a scrimmage.",
    "Avoid turnovers for 5 minutes.",
    "Do 10 one-hand push passes.",
    "Pass through a tight gap 5 times.",
    "Make 10 successful lob passes.",
    "Perform 5 quick outlet passes.",
    "Deliver 5 pocket passes in motion.",
    "Break a press with passing 3 times.",
    "Pass out of a double-team cleanly.",
    "Complete 10 sharp skip passes.",
  ];
  

  

  export const Tipgenerator4 = () => {
    const [currentTip, setCurrentTip] = useState(0)
    const [currentChallenge, setCurrentChallenge] = useState(() => {
      const stored = localStorage.getItem("dailyChallenge");
      return stored ? JSON.parse(stored) : 0;
    });
    
    useEffect(() => {
      const now = Date.now(); // Devuelve la fecha actual en milisegundos.
      const last = Number(localStorage.getItem("lastChange")); // Convierte el valor guardado en número.
      
      // Comprueba si no existe 'last' o si han pasado 24 horas (86,400,000 ms).
      if (!last || now - last >= 86400000) {
        const next = (currentChallenge + 1) % passingChallenges.length;
        setCurrentChallenge(next);
        localStorage.setItem("dailyChallenge", JSON.stringify(next));
        localStorage.setItem("lastChange", now.toString());
      }
    }, []);
    useEffect(() => {
      const tipInterval = setInterval(() => {
        setCurrentTip((prevTip) => (prevTip + 1) % passingTips.length)
      }, 10000) // Change tip every 10 seconds (10000ms)
  
      return () => clearInterval(tipInterval)
    }, [])
  
    return (
      <div className=" relative  mobile-full-width mobile-order-2 mobile-mt-4 md:w-1/2 md:absolute md:top-60 md:right-0 md:px-10 px-10">
        <Card className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" /> Passing Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl italic">{passingTips[currentTip]}</p>
            <section className="pt-5 items-center ">
            <div className="flex">
              <svg
                className=""
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 2.5V6.5M2.5 4.5H6.5M4.5 12.5V15.5M3 14H6M8.49228 7.66924L7.34605 8.05132C6.16944 8.44352 5.58114 8.63962 5.58114 9C5.58114 9.36038 6.16944 9.55648 7.34605 9.94868L8.49228 10.3308C8.74082 10.4136 8.86509 10.455 8.95125 10.5461C9.03742 10.6372 9.07188 10.7636 9.14082 11.0163L9.53524 12.4625C9.92381 13.8873 10.1181 14.5997 10.5 14.5997C10.8819 14.5997 11.0762 13.8873 11.4648 12.4625L11.8592 11.0163C11.9281 10.7636 11.9626 10.6372 12.0487 10.5461C12.1349 10.455 12.2592 10.4136 12.5077 10.3308L13.6539 9.94868C14.8306 9.55648 15.4189 9.36038 15.4189 9C15.4189 8.63962 14.8306 8.44352 13.654 8.05132L12.5077 7.66924C12.2592 7.58639 12.1349 7.54497 12.0487 7.45389C11.9626 7.3628 11.9281 7.23643 11.8592 6.98367L11.4648 5.53747C11.0762 4.11268 10.8819 3.40029 10.5 3.40029C10.1181 3.40029 9.92381 4.11268 9.53524 5.53747L9.14082 6.98367C9.07188 7.23643 9.03742 7.3628 8.95125 7.45389C8.86509 7.54497 8.74082 7.58639 8.49228 7.66924Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h1 className="px-2 font-medium text-2xl">Daily Challenge</h1>
            </div>
            <div className=" flex items-center w-full space-x-10 my-2 border-y-[#8D8D8D] border-b-[1px] py-2">
              {/* Icono fijo o representativo para cada drill */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.95487 3.44706C5.69761 5.08837 6.78564 7.41713 6.78564 10C6.78564 12.5829 5.69761 14.9117 3.95487 16.553"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.0451 16.5529C14.3024 14.9116 13.2144 12.5829 13.2144 9.99999C13.2144 7.4171 14.3024 5.08834 16.0451 3.44704"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 10H19"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18.3571V1"
                  stroke="#030303"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Título del drill */}
              <h2 className="text-sm font-regular">
                {passingChallenges[currentChallenge]}
              </h2>
              {/* Tooltip con la descripción del drill */}
              <div className="flex justify-end w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                      >
                        <g clipPath="url(#clip0_4016_1289)">
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="#0F0E0E"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                            fill="#0F0E0E"
                          />
                          <g filter="url(#filter0_d_4016_1289)">
                            <path
                              d="M12 14V13C12 12 15 11.5 14.5 9.00001C14 6.50004 10 6.50001 9.5 8.99998"
                              stroke="#0F0E0E"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_4016_1289"
                            x="4.49976"
                            y="6.12502"
                            width="15.0564"
                            height="16.875"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_4016_1289"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_4016_1289"
                              result="shape"
                            />
                          </filter>
                          <clipPath id="clip0_4016_1289">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Try it every day!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </section>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  export default Tipgenerator4
