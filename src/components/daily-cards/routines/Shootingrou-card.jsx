import React from "react";
import Accuracy from "./Accuracy";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
const exercises = [
  {
    title: "Joint mobility (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Wrist circles.",
        description: "2.5 min",
      },
      {
        title: "Elbow circles.",
        description: "2.5 min",
      },
      {
        title: "Shoulder circles.",
        description: "2.5 min",
      },
      {
        title: "Leg swings.",
        description: "2.5 min",
      },
      {
        title: "Ankle Rotation.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Dynamic drills (5 min)",
    description: "5 min",
    drills: [
      {
        title: "High knees (2x30 sec).",
        description: "2.5 min",
      },
      {
        title: "Lateral shuffles (2x20 sec).",
        description: "2.5 min",
      },
      {
        title: "Jump rope (2 min).",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Shooting activation (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Soft short-range shots.",
        description: "2.5 min,  → 10 shots from each side",
      },
      {
        title: "Moving shots (receiving a pass) .",
        description: "2.5 min, → 10 shots",
      },
    ],
  },
];
const exercises2 = [
  {
    title: "Bank Shots (5 min)",
    description: "5 min",
    drills: [
      {
        title: "5 shots from each side of the basket.",
        description: "2.5 min",
      },
      {
        title: "5 shots from the center using the backboard.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Floaters & Hook Shots (5 min)",
    description: "5 min",
    drills: [
      {
        title: "5 hook shots with the strong hand.",
        description: "2.5 min",
      },
      {
        title: "5 hook shots with the weak hand.",
        description: "2.5 min",
      },
      {
        title: "5 floaters from the center.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Contact Shots (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Self-pass, bump into a defender (or cone), and shoot.",
        description: "2.5 min",
      },
      {
        title: "10 shots per hand.",
        description: "2.5 min",
      },
    ],
  },
];
const exercises3 = [
  {
    title: "Spot Shooting (5 min)",
    description: "5 min",
    drills: [
      {
        title: "5 shots from 5 key spots (corners, wings, top of the key).",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Pull-Up Jumpers (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Dribble → stop → shoot from 3 positions (left, center, right)",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Controlled Fadeaways (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Step back and shoot (10 shots from each side).",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Catch & Shoot (5 min)",
    description: "5 min",
    drills: [
      {
        title:
          "Cut toward the hoop, receive the pass, and shoot without dribbling.",
        description: "2.5 min",
      },
    ],
  },
];
const exercises4 = [
  {
    title: "Spot-Up Threes (5 min)",
    description: "5 min",
    drills: [
      {
        title: "5 shots from 5 key three-point spots.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Catch & Shoot (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Receive passes from different angles and shoot immediately.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Stepback Threes (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Dribble forward → step back → shoot (10 shots per side).",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Transition Threes (5 min)",
    description: "5 min",
    drills: [
      {
        title: "Sprint from the baseline, receive, and shoot.",
        description: "2.5 min",
      },
    ],
  },
  {
    title: "Game-Speed Shooting (5 min)",
    description: "5 min",
    drills: [
      {
        title: "5 shots after a 5-meter sprint (fatigue-controlled).",
        description: "2.5 min",
      },
    ],
  },
];

export const ShootingRouCard = ({ shootingRou }) => {
  const [selectedTab, setSelectedTab] = useState("warmup");
  useEffect(() => {
  
  }, [selectedTab]);
  return (
    <>
      <div className="relative w-full  px-10 bottom-2/3 md:top-60 h-auto md:absolute ">
        <div className="grid gap-6 md:grid-cols-2 h-full md:w-1/2">
          <Card className="md:col-span-2 bg-[#D9D9D9]">
            <div className="px-10 py-5">
              <CardTitle className="text-4xl font-bold ">
                Shooting Drills
              </CardTitle>
              <CardDescription className="py-2">
                Select a drill to show the routine
              </CardDescription>
            </div>
            <CardHeader className="flex items-center py-1 justify-between">
              <Tabs
                defaultValue="warmup"
                className="w-full"
                onValueChange={(value) => setSelectedTab(value)}
              >
                <TabsList className="grid bg-[#C6C6C6] overflow-hidden w-full grid-cols-2 grid-rows-2 gap-y-4 md:grid-cols-4 md:grid-rows-1">
                  <TabsTrigger value="warmup">Warm Up</TabsTrigger>
                  <TabsTrigger value="short">Short Range</TabsTrigger>
                  <TabsTrigger value="mid">Mid Range</TabsTrigger>
                  <TabsTrigger value="three">Three-Pointer</TabsTrigger>
                </TabsList>
                {/* Aquí se itera sobre los ejercicios */}

                <TabsContent className="" value="warmup">
                  {exercises.map((exercise, exIdx) => (
                    <Accordion key={exIdx} type="single" collapsible>
                      <AccordionItem value={`item-${exIdx}`}>
                        <AccordionTrigger className="text-xl hover:no-underline">
                          {exercise.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {exercise.drills.map((drill, drillIdx) => (
                            <div
                              key={drillIdx}
                              className="flex border-y-[#8D8D8D] border-b-[1px] py-2 items-center space-x-10 my-2"
                            >
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
                              <h2 className="text-sm font-regular break-words">
                                {drill.title}
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
                                            <feComposite
                                              in2="hardAlpha"
                                              operator="out"
                                            />
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
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{drill.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </TabsContent>
                <TabsContent value="short">
                  {exercises2.map((exercise, exIdx) => (
                    <Accordion key={exIdx} type="single" collapsible>
                      <AccordionItem value={`item-${exIdx}`}>
                        <AccordionTrigger className="text-xl hover:no-underline">
                          {exercise.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {exercise.drills.map((drill, drillIdx) => (
                            <div
                              key={drillIdx}
                              className="flex border-y-[#8D8D8D] border-b-[1px] py-2 items-center space-x-10 my-2 truncate"
                            >
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
                              <h2 className="text-sm font-regular break-words">
                                {drill.title}
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
                                            <feComposite
                                              in2="hardAlpha"
                                              operator="out"
                                            />
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
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{drill.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </TabsContent>
                <TabsContent value="mid">
                  {exercises3.map((exercise, exIdx) => (
                    <Accordion key={exIdx} type="single" collapsible>
                      <AccordionItem value={`item-${exIdx}`}>
                        <AccordionTrigger className="text-xl hover:no-underline">
                          {exercise.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          {exercise.drills.map((drill, drillIdx) => (
                            <div
                              key={drillIdx}
                              className="flex items-center space-x-10 my-2 border-y-[#8D8D8D] border-b-[1px] py-2"
                            >
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
                                {drill.title}
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
                                            <feComposite
                                              in2="hardAlpha"
                                              operator="out"
                                            />
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
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{drill.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </TabsContent>
                <TabsContent value="three">
                  {exercises4.map((exercise, exIdx) => (
                    <Accordion key={exIdx} type="single"  className="w-full">
                      <AccordionItem value={`item-${exIdx}`}>
                        <AccordionTrigger  className="text-xl hover:no-underline">
                          {exercise.title}
                        </AccordionTrigger>
                        <AccordionContent >
                          {exercise.drills.map((drill, drillIdx) => (
                            <div animate={{ x: 100 }} transition={{ type: "spring" }}
                              key={drillIdx}
                              className="flex items-center space-x-10 my-2 border-y-[#8D8D8D] border-b-[1px] py-2"
                            >
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
                                {drill.title}
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
                                            <feComposite
                                              in2="hardAlpha"
                                              operator="out"
                                            />
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
                                            <rect
                                              width="24"
                                              height="24"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{drill.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="relative md:absolute   w-full md:w-1/2 px-10 py-10 right-0 h-auto md:top-1/2 md md:py-16 mobile-full-width mobile-order-2 mobile-mt-4">
        <Card className="px-10 bg-[#D9D9D9] py-5">
          <svg
            className="absolute right-16"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.85596 1C14.9061 1 19 5.02944 19 10C19 14.9706 14.9061 19 9.85596 19C5.59521 19 2.01509 16.1318 1 12.25"
              stroke="#0A0909"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 9.61317 5.04393 9.23659 5.12707 8.875"
              stroke="#0A0909"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="10" cy="10" r="2" fill="#0A0909" />
          </svg>
          <h1 className="text-sm font-medium">Active Excercise</h1>
          {selectedTab === "warmup" && (
            <>
              <h1 className="text-3xl font-bold">Warm-Up</h1>
              <section className="flex items-center space-x-2 py-2">
                <svg
                  className="relative"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 12L12 8"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12L7 12"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>15:00</p>
              </section>
            </>
          )}
          {selectedTab === "short" && (
            <>
              <h1 className="text-3xl font-bold">Short Range</h1>
              <section className="flex items-center space-x-2 py-2">
                <svg
                  className="relative"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 12L12 8"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12L7 12"
                    stroke="#0E0E0E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p>15:00</p>
              </section>
              <div className="mx-auto ">
              <Tabs defaultValue="bank" className="w-full  flex flex-col items-center ">
              <TabsList className="grid w-full grid-cols-2 overflow-hidden bg-[#C6C6C6] justify-center grid-rows-2 gap-y-4 md:grid-cols-3 md:grid-rows-1 ">
                    <TabsTrigger value="bank">Bank Shots</TabsTrigger>
                    <TabsTrigger value="floater" className="">Floater & Hook </TabsTrigger>
                    <TabsTrigger value="contact" className="col-span-2 flex justify-center md:col-span-1">Contact Shots</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bank"className="w-full py-5 justify-center">
                  <Accuracy/>
                  </TabsContent>
                  <TabsContent value="floater"className="w-full py-5 justify-center">
                  <Accuracy/>
                  </TabsContent>
                  <TabsContent value="contact"className="w-full py-5 justify-center">
                  <Accuracy/>
                  </TabsContent>
                </Tabs>
               
                </div>
            </>
          )}
          {selectedTab === "mid" && (
            <>
            <h1 className="text-3xl font-bold">Mid Range</h1>
            <section className="flex items-center space-x-2 py-2">
              <svg
                className="relative"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#0E0E0E"
                  strokeWidth="2"
                />
                <path
                  d="M12 12L12 8"
                  stroke="#0E0E0E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 12L7 12"
                  stroke="#0E0E0E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p>15:00</p>
            </section>
            <div className="mx-auto ">
            <Tabs defaultValue="spot" className="w-full  flex flex-col items-center">
            <TabsList className="grid w-full grid-cols-2 overflow-hidden bg-[#C6C6C6] justify-center grid-rows-2  gap-y-4 md:grid-cols-4 md:grid-rows-1 ">
                  <TabsTrigger value="spot">Spot Shooting</TabsTrigger>
                  <TabsTrigger value="jumpers"  className="text-xs">Pull-Up Jumpers</TabsTrigger>
                  <TabsTrigger value="fadeaways">Fadeaways</TabsTrigger>
                  <TabsTrigger value="c&s">Catch & Shoot</TabsTrigger>
                </TabsList>
                <TabsContent value="spot"className="w-full py-5 justify-center">
                <Accuracy/>
                </TabsContent>
                <TabsContent value="jumpers"className="w-full py-5 justify-center">
                <Accuracy/>
                </TabsContent>
                <TabsContent value="fadeaways"className="w-full py-5 justify-center">
                <Accuracy/>
                </TabsContent>
                <TabsContent value="c&s"className="w-full py-5 justify-center">
                <Accuracy/>
                </TabsContent>
              </Tabs>
              
              </div>
          </>
          )}
          {selectedTab === "three" && (
             <>
             <h1 className="text-3xl font-bold">Three-Pointer</h1>
             <section className="flex items-center space-x-2 py-2">
               <svg
                 className="relative"
                 width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <circle
                   cx="12"
                   cy="12"
                   r="9"
                   stroke="#0E0E0E"
                   strokeWidth="2"
                 />
                 <path
                   d="M12 12L12 8"
                   stroke="#0E0E0E"
                   strokeWidth="2"
                   strokeLinecap="round"
                 />
                 <path
                   d="M12 12L7 12"
                   stroke="#0E0E0E"
                   strokeWidth="2"
                   strokeLinecap="round"
                 />
               </svg>
               <p>15:00</p>
             </section>
             <div className="mx-auto">
             <Tabs defaultValue="spotthree" className="w-full  grid-rows-3 items-center">
             <TabsList className="grid w-full bg-[#C6C6C6] grid-cols-2 h-auto gap-y-6 md:grid-cols-5 ">
                   <TabsTrigger value="spotthree">Spot-Up Threes</TabsTrigger>
                   <TabsTrigger value="c&sthree">Catch & Shoot</TabsTrigger>
                   <TabsTrigger value="stepbackthree">Stepback Threes</TabsTrigger>
                   <TabsTrigger value="transition">Transition Threes</TabsTrigger>
                   <TabsTrigger value="gamespeed" className="col-span-2 flex justify-center md:col-span-1 md:text-xs">Game-Speed Shooting</TabsTrigger>

                 </TabsList>
                 <TabsContent value="spotthree"className="w-full py-5 justify-center">
                 <Accuracy/>
                 </TabsContent>
                 <TabsContent value="c&sthree"className="w-full py-5 justify-center">
                 <Accuracy/>
                 </TabsContent>
                 <TabsContent value="stepbackthree"className="w-full py-5 justify-center">
                 <Accuracy/>
                 </TabsContent>
                 <TabsContent value="transition"className="w-full py-5 justify-center">
                 <Accuracy/>
                 </TabsContent>
                 <TabsContent value="gamespeed"className="w-full py-5 justify-center">
                 <Accuracy/>
                 </TabsContent>
               </Tabs>
              
               </div>
           </>
          )}
          
        </Card>
      </div>
    </>
  );
};

export default ShootingRouCard;
