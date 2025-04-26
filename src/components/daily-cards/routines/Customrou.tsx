"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Exercise {
  id: number
  name: string
  duration: string
  description: string
}

interface Routine {
  name: string
  exercises: Exercise[]
}

export const CustomRou = () => {
  const [showForm, setShowForm] = useState(false)
  const [routine, setRoutine] = useState<Routine | null>(null)
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    id: 0,
    name: "",
    duration: "",
    description: "",
  })

  // Load the routine from localStorage when the component mounts
  useEffect(() => {
    const savedRoutine = localStorage.getItem("customRoutine")
    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine))
    }
  }, [])

  const addExercise = () => {
    if (currentExercise.name && currentExercise.duration) {
      setRoutine((prev) => {
        const updatedRoutine = {
          name: prev?.name || "New Routine",
          exercises: [...(prev?.exercises || []), { ...currentExercise, id: Date.now() }],
        }
        localStorage.setItem("customRoutine", JSON.stringify(updatedRoutine))
        return updatedRoutine
      })
      setCurrentExercise({ id: 0, name: "", duration: "", description: "" })
    }
  }

  const removeExercise = (id: number) => {
    setRoutine((prev) => {
      if (!prev) return null
      const updatedRoutine = {
        ...prev,
        exercises: prev.exercises.filter((exercise) => exercise.id !== id),
      }
      localStorage.setItem("customRoutine", JSON.stringify(updatedRoutine))
      return updatedRoutine
    })
  }

  const saveRoutine = () => {
    if (routine) {
      localStorage.setItem("customRoutine", JSON.stringify(routine))
    }
    setShowForm(false)
    console.log("Routine saved:", routine)
  }

  const editRoutine = () => {
    setShowForm(true)
  }

  const deleteRoutine = () => {
    setRoutine(null)
    setShowForm(false)
    localStorage.removeItem("customRoutine")
  }

  // Case 1: No routine and form is not shown
  if (!showForm && !routine) {
    return (
      <div className="flex items-center w-screen justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Custom Routine</CardTitle>
            <CardDescription>Create your own basketball routine</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowForm(true)} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Your Own Routine
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Case 2: Routine exists and form is not shown
  if (!showForm && routine) {
    return (
      <div className="flex items-center w-screen justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{routine.name}</CardTitle>
            <CardDescription>Your custom basketball routine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise) => (
                <Card key={exercise.id} className="p-4">
                  <h4 className="font-semibold">{exercise.name}</h4>
                  <p className="text-sm text-muted-foreground">{exercise.duration}</p>
                  {exercise.description && <p className="text-sm mt-1">{exercise.description}</p>}
                </Card>
              ))
            ) : (
              <p>There are no exercises in this routine yet.</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={editRoutine}>
              <Edit className="mr-2 h-4 w-4" /> Edit Routine
            </Button>
            <Button variant="destructive" onClick={deleteRoutine}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Routine
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Case 3: Form is open (Create/Edit Routine)
  return (
    <div className="flex items-center w-screen justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{routine ? "Edit" : "Create"} Custom Routine</CardTitle>
          <CardDescription>Design your own basketball routine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="routine-name">Routine Name</Label>
            <Input
              id="routine-name"
              value={routine?.name || ""}
              onChange={(e) => {
                const updatedRoutine = { ...routine, name: e.target.value } as Routine
                setRoutine(updatedRoutine)
                localStorage.setItem("customRoutine", JSON.stringify(updatedRoutine))
              }}
              placeholder="My Custom Routine"
            />
          </div>
          <div className="space-y-2">
            <Label>Add Exercise</Label>
            <div className="flex gap-2">
              <Input
                value={currentExercise.name}
                onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                placeholder="Exercise Name"
              />
              <Input
                value={currentExercise.duration}
                onChange={(e) => setCurrentExercise({ ...currentExercise, duration: e.target.value })}
                placeholder="Duration"
              />
            </div>
            <Textarea
              value={currentExercise.description}
              onChange={(e) => setCurrentExercise({ ...currentExercise, description: e.target.value })}
              placeholder="Exercise Description (optional)"
            />
            <Button onClick={addExercise} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Exercise
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Exercises in the Routine</Label>
            {routine && routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise) => (
                <Card key={exercise.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">{exercise.duration}</p>
                    {exercise.description && <p className="text-sm mt-1">{exercise.description}</p>}
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeExercise(exercise.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))
            ) : (
              <p>There are no exercises in this routine yet.</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setShowForm(false)} variant="outline">
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={saveRoutine} disabled={!routine?.name || !(routine?.exercises?.length > 0)}>
            Save Routine
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export const useRoutine = () => {
  const [routine, setRoutine] = useState<Routine | null>(null)

  useEffect(() => {
    const savedRoutine = localStorage.getItem("customRoutine")
    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine))
    }
  }, [])

  return routine
}
