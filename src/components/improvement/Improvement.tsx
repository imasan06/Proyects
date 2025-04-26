"use client"

import { useState, useEffect } from "react"
import { getData } from "@/api/api"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, Calendar, TrendingUp, LogIn, Target, BarChart3, Activity, Crosshair, ChevronRight } from "lucide-react"
import { ChangeIndicator } from "../ChangeIndicator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Define types for the data structures
interface ImprovementResponse {
  improvementDaily: number | null
  improvementWeekly: number | null
  improvementMonthly: number | null
}

interface Session {
  id: string
  userId: string
  shotsMade: number
  shotsAttempted: number
  date: string
}

interface ProcessedSession {
  id: string
  date: string
  accuracy: number
  improvement: number
  totalShots: number
  made: number
  duration: number
}

interface DailyStats {
  date: string
  accuracy: number
  made: number
  attempted: number
}

interface ChartDataPoint {
  name: string
  date: string
  accuracy: number
  improvement: number
  made: number
  attempted: number
}

interface AggregatedData {
  totalShots: number
  totalMade: number
  accuracy: number
  consistency: number
}

interface ImprovementState {
  daily: number
  weekly: number
  monthly: number
}

export default function Improvement() {
  const [loading, setLoading] = useState<boolean>(true)
  const [logged, setLogged] = useState<boolean>(false)
  const [improvementData, setImprovementData] = useState<ImprovementState>({
    daily: 0,
    weekly: 0,
    monthly: 0,
  })
  const [sessions, setSessions] = useState<Session[]>([])
  const [aggregatedData, setAggregatedData] = useState<AggregatedData>({
    totalShots: 0,
    totalMade: 0,
    accuracy: 0,
    consistency: 0,
  })
  const [trendData, setTrendData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    setLogged(!!token && !!userId)

    if (!token || !userId) {
      setLoading(false)
      return
    }

    // Fetch all required data
    const fetchData = async () => {
      try {
        // 1. Fetch improvement data
        // Remove the generic type parameter from getData
        const improvementResponse = (await getData(`/performance/improvement/${userId}`, token)) as ImprovementResponse

        // 2. Fetch all user sessions
        const sessionsResponse = (await getData(`/performance/user/${userId}`, token)) as Session[]

        // Process the data
        processData(improvementResponse, sessionsResponse)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Process all the data from the backend
  const processData = (improvementResponse: ImprovementResponse, sessionsResponse: Session[]): void => {
    // 1. Set improvement data
    setImprovementData({
      daily: improvementResponse.improvementDaily ?? 0,
      weekly: improvementResponse.improvementWeekly ?? 0,
      monthly: improvementResponse.improvementMonthly ?? 0,
    })

    // 2. Process sessions data
    if (Array.isArray(sessionsResponse) && sessionsResponse.length > 0) {
      // Sort sessions by date (newest first)
      const sortedSessions = [...sessionsResponse].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
      setSessions(sortedSessions)

      // 3. Calculate aggregated metrics
      let totalAttempted = 0
      let totalMade = 0
      const accuracies: number[] = []

      sortedSessions.forEach((session) => {
        totalAttempted += session.shotsAttempted
        totalMade += session.shotsMade

        // Calculate accuracy for each session
        if (session.shotsAttempted > 0) {
          accuracies.push((session.shotsMade / session.shotsAttempted) * 100)
        }
      })

      // Calculate overall accuracy
      const overallAccuracy = totalAttempted > 0 ? (totalMade / totalAttempted) * 100 : 0

      // Calculate consistency (standard deviation of accuracies)
      const avgAccuracy = accuracies.length > 0 ? accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length : 0
      const variance =
        accuracies.length > 0
          ? accuracies.reduce((sum, acc) => sum + Math.pow(acc - avgAccuracy, 2), 0) / accuracies.length
          : 0
      const stdDev = Math.sqrt(variance)

      // Convert standard deviation to a "consistency" percentage (lower stdDev = higher consistency)
      // Using a formula where 0 stdDev = 100% consistency, and stdDev of 30 or more = 0% consistency
      const consistency = Math.max(0, Math.min(100, 100 - stdDev * 3.33))

      setAggregatedData({
        totalShots: totalAttempted,
        totalMade: totalMade,
        accuracy: overallAccuracy,
        consistency: consistency,
      })

      // 4. Generate trend data for the chart
      generateTrendData(sortedSessions)
    }
  }

  // Generate trend data for the chart from sessions
  const generateTrendData = (sessions: Session[]): void => {
    // Get the last 7 sessions or fewer if not available
    const recentSessions = sessions.slice(0, 7).reverse()

    const chartData: ChartDataPoint[] = recentSessions.map((session) => {
      const date = new Date(session.date)
      const accuracy = session.shotsAttempted > 0 ? (session.shotsMade / session.shotsAttempted) * 100 : 0

      // Find the previous session for the same day of week if possible
      const dayOfWeek = date.getDay()
      const previousSessionIndex = sessions.findIndex(
        (s) => new Date(s.date).getTime() < date.getTime() && new Date(s.date).getDay() === dayOfWeek,
      )

      let improvement = 0
      if (previousSessionIndex !== -1) {
        const prevSession = sessions[previousSessionIndex]
        const prevAccuracy =
          prevSession.shotsAttempted > 0 ? (prevSession.shotsMade / prevSession.shotsAttempted) * 100 : 0

        improvement = accuracy - prevAccuracy
      }

      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        accuracy: Number.parseFloat(accuracy.toFixed(1)),
        improvement: Number.parseFloat(improvement.toFixed(1)),
        made: session.shotsMade,
        attempted: session.shotsAttempted,
      }
    })

    setTrendData(chartData)
  }

  // Format recent sessions for display
  const getRecentSessions = (): ProcessedSession[] => {
    return sessions.slice(0, 5).map((session) => {
      const date = new Date(session.date)
      const accuracy = session.shotsAttempted > 0 ? (session.shotsMade / session.shotsAttempted) * 100 : 0

      // Find previous session to calculate improvement
      const prevIndex = sessions.findIndex((s, i) => i > sessions.indexOf(session))
      let improvement = 0

      if (prevIndex !== -1) {
        const prevSession = sessions[prevIndex]
        const prevAccuracy =
          prevSession.shotsAttempted > 0 ? (prevSession.shotsMade / prevSession.shotsAttempted) * 100 : 0

        improvement = accuracy - prevAccuracy
      }

      return {
        id: session.id,
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        accuracy: Number.parseFloat(accuracy.toFixed(1)),
        improvement: Number.parseFloat(improvement.toFixed(1)),
        totalShots: session.shotsAttempted,
        made: session.shotsMade,
        // Estimate duration based on shots (assuming 10 shots per minute)
        duration: Math.round(session.shotsAttempted / 10),
      }
    })
  }

  // Calculate daily stats
  const getDailyStats = (): DailyStats[] => {
    if (sessions.length === 0) return []

    // Group sessions by day
    const dailyMap = new Map<string, { date: string; attempted: number; made: number }>()

    sessions.forEach((session) => {
      const date = new Date(session.date).toLocaleDateString()

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          attempted: 0,
          made: 0,
        })
      }

      const dayData = dailyMap.get(date)
      if (dayData) {
        dayData.attempted += session.shotsAttempted
        dayData.made += session.shotsMade
      }
    })

    // Convert map to array and calculate accuracy
    return Array.from(dailyMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
      .map((day) => ({
        date: new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        accuracy: day.attempted > 0 ? (day.made / day.attempted) * 100 : 0,
        made: day.made,
        attempted: day.attempted,
      }))
  }

  if (!logged) {
    return (
      <div className="flex w-screen items-center justify-center">
        <Card className="m-4 bg-zinc-900 border-zinc-800 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <LogIn className="mr-2 h-5 w-5" /> Sign In Required
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-zinc-300 mb-4">
              Sign in to view your shooting improvement metrics and performance analytics.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-white border-0"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex w-screen items-center justify-center">
        <div className="space-y-4 p-4">
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-zinc-800 text-white">
                <CardHeader>
                  <Skeleton className="h-6 w-40 bg-zinc-700" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-20 bg-zinc-700" />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-zinc-800 text-white">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full bg-zinc-700" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const recentSessions = getRecentSessions()
  const dailyStats = getDailyStats()

  return (
    <div className="flex w-screen items-center justify-center">
      <div className="space-y-6 p-4">
        {/* Main Metrics Cards - KEEPING ORIGINAL COLORS */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 text-white border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Daily Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{improvementData.daily.toFixed(1)}%</span>
                <div className="ml-2">
                  <ChangeIndicator change={improvementData.daily} />
                </div>
              </div>
              <p className="text-sm text-blue-200 mt-1">
                {improvementData.daily > 0
                  ? "You're improving faster than yesterday!"
                  : "Keep practicing to improve your performance"}
              </p>
              <Progress
                value={Math.min(Math.max(improvementData.daily + 10, 0), 100)}
                className="h-1.5 mt-3 bg-blue-700"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900 to-purple-800 text-white border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Weekly Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{improvementData.weekly.toFixed(1)}%</span>
                <div className="ml-2">
                  <ChangeIndicator change={improvementData.weekly} />
                </div>
              </div>
              <p className="text-sm text-purple-200 mt-1">
                {improvementData.weekly > 5
                  ? "Great progress this week!"
                  : "Consistent practice leads to better results"}
              </p>
              <Progress
                value={Math.min(Math.max(improvementData.weekly + 10, 0), 100)}
                className="h-1.5 mt-3 bg-purple-700"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-700 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" /> Monthly Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{improvementData.monthly.toFixed(1)}%</span>
                <div className="ml-2">
                  <ChangeIndicator change={improvementData.monthly} />
                </div>
              </div>
              <p className="text-sm text-emerald-200 mt-1">
                {improvementData.monthly > 10
                  ? "Outstanding monthly progress!"
                  : "Your long-term improvement is building"}
              </p>
              <Progress
                value={Math.min(Math.max(improvementData.monthly + 10, 0), 100)}
                className="h-1.5 mt-3 bg-emerald-700"
              />
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview - UPDATED COLORS */}
        <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Activity className="mr-2 h-5 w-5" /> Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Accuracy</span>
                    <span className="text-sm font-medium">{aggregatedData.accuracy.toFixed(1)}%</span>
                  </div>
                  <Progress value={aggregatedData.accuracy} className="h-2 bg-zinc-700" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Consistency</span>
                    <span className="text-sm font-medium">{aggregatedData.consistency.toFixed(1)}%</span>
                  </div>
                  <Progress value={aggregatedData.consistency} className="h-2 bg-zinc-700" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <div className="flex items-center text-zinc-400 text-xs mb-1">
                      <Target className="h-3.5 w-3.5 mr-1" /> Total Shots
                    </div>
                    <div className="text-xl font-bold">{aggregatedData.totalShots.toLocaleString()}</div>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-3">
                    <div className="flex items-center text-zinc-400 text-xs mb-1">
                      <Crosshair className="h-3.5 w-3.5 mr-1" /> Success Rate
                    </div>
                    <div className="text-xl font-bold">
                      {aggregatedData.totalShots
                        ? ((aggregatedData.totalMade / aggregatedData.totalShots) * 100).toFixed(1)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[200px]">
                {trendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
                      <XAxis dataKey="name" stroke="#a1a1aa" />
                      <YAxis stroke="#a1a1aa" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#27272a",
                          borderColor: "#3f3f46",
                          color: "white",
                        }}
                        itemStyle={{ color: "white" }}
                        formatter={(value: number, name: string) => {
                          return [
                            `${value.toFixed(1)}${name === "improvement" ? "%" : "%"}`,
                            name === "improvement" ? "Improvement" : "Accuracy",
                          ]
                        }}
                        labelFormatter={(label: string) => {
                          const item = trendData.find((d) => d.name === label)
                          return item ? `${item.date}: ${item.made}/${item.attempted} shots` : label
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        name="Accuracy"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ fill: "#3B82F6", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="improvement"
                        name="Improvement"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: "#10B981", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-500">
                    Not enough data to display chart
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shooting recent sessions */}
  
            <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" /> Recent Training Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentSessions.length > 0 ? (
                  <div className="space-y-3">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">{session.date}</h4>
                          <p className="text-sm text-zinc-400">
                            {session.duration} minutes • {session.totalShots} shots
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{session.accuracy}%</div>
                          <div className="flex items-center text-sm">
                            <span className={session.improvement >= 0 ? "text-green-400" : "text-red-400"}>
                              {session.improvement > 0 ? "+" : ""}
                              {session.improvement.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto text-zinc-600 mb-3" />
                    <h3 className="text-lg font-medium">No Recent Sessions</h3>
                    <p className="text-zinc-400 mt-1">Your recent training sessions will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
    

         
    

        {/* Shot progress graphic */}
        <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" /> Shooting Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Accuracy Trend */}
              <div>
                <h3 className="text-lg font-medium mb-2">Accuracy Trend</h3>
                <div className="h-[200px]">
                  {sessions.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={sessions
                          .slice(0, 10)
                          .map((session) => {
                            const date = new Date(session.date)
                            return {
                              date: date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              }),
                              accuracy:
                                session.shotsAttempted > 0 ? (session.shotsMade / session.shotsAttempted) * 100 : 0,
                              shots: session.shotsAttempted,
                            }
                          })
                          .reverse()}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
                        <XAxis dataKey="date" stroke="#a1a1aa" />
                        <YAxis stroke="#a1a1aa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#27272a",
                            borderColor: "#3f3f46",
                            color: "white",
                          }}
                          itemStyle={{ color: "white" }}
                          formatter={(value: number, name: string) => [
                            name === "accuracy" ? `${value.toFixed(1)}%` : value,
                            name === "accuracy" ? "Accuracy" : "Shots",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="#F59E0B"
                          strokeWidth={2}
                          dot={{ fill: "#F59E0B", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-500">
                      Not enough data to display chart
                    </div>
                  )}
                </div>
              </div>

              {/* Shot Volume Analysis */}
              <div>
                <h3 className="text-lg font-medium mb-2">Shot Volume</h3>
                <div className="h-[200px]">
                  {sessions.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={sessions
                          .slice(0, 10)
                          .map((session) => {
                            const date = new Date(session.date)
                            return {
                              date: date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              }),
                              attempted: session.shotsAttempted,
                              made: session.shotsMade,
                            }
                          })
                          .reverse()}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#52525b" />
                        <XAxis dataKey="date" stroke="#a1a1aa" />
                        <YAxis stroke="#a1a1aa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#27272a",
                            borderColor: "#3f3f46",
                            color: "white",
                          }}
                          itemStyle={{ color: "white" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="attempted"
                          name="Attempted"
                          stroke="#EC4899"
                          strokeWidth={2}
                          dot={{ fill: "#EC4899", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="made"
                          name="Made"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ fill: "#10B981", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-500">
                      Not enough data to display chart
                    </div>
                  )}
                </div>
              </div>

              {/* Success Rate Summary */}
              <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Overall Success Rate</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">
                    {aggregatedData.totalShots > 0
                      ? ((aggregatedData.totalMade / aggregatedData.totalShots) * 100).toFixed(1)
                      : 0}
                    %
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-400">Total Shots Made</div>
                    <div className="text-xl font-semibold">
                      {aggregatedData.totalMade} / {aggregatedData.totalShots}
                    </div>
                  </div>
                </div>
                <Progress
                  value={
                    aggregatedData.totalShots > 0 ? (aggregatedData.totalMade / aggregatedData.totalShots) * 100 : 0
                  }
                  className="h-2 mt-3 bg-zinc-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
