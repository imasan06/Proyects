"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Eye, User, Lock, Mail, UserPlus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { postData } from "@/api/api"
import { useNavigate } from "react-router-dom"

interface RegisterUser {
  id: string
  name: string
  email: string
}

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Clear error messages when user starts typing again
    setError("")
    setMessage("")
  }

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Client-side validation
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // Send only the data expected by the backend
      const userData = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      }

      // Call the register endpoint
      const newUser = (await postData("/auth/register", userData)) as RegisterUser


      // Show success message
      setMessage(`Account created successfully! Welcome, ${newUser.name}`)

      // Clear form
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error: unknown) {
      // Handle error response
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === "object" && error !== null && "details" in error) {
        // Handle the specific error format from your API
        setError(`Registration failed: ${(error as any).details || "Unknown error"}`)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-zinc-400 text-center">
              Fill in your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerEmail" className="text-zinc-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="registerEmail"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="registerPassword" className="text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="registerPassword"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    disabled={isLoading}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-700"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-zinc-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-700"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={isLoading}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                <UserPlus className="mr-2 h-4 w-4" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}

            {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs"></div>
            </div>
            <div className="grid grid-cols-1 gap-4"></div>
            <div className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-primary text-white p-0"
                onClick={() => navigate("/login")}
                disabled={isLoading}
              >
                Sign In
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
