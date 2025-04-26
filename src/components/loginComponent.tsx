import React, { useState, ChangeEvent, FormEvent, MouseEventHandler } from "react";
import { Eye, LogIn, User, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { postData } from "@/api/api";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navRegister = () => {
    navigate("/register")
  }



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = (await postData("/auth/login", {
        email: formData.email,
        password: formData.password,
      })) as LoginResponse;

      setMessage(`Welcome, ${result.user.name}`);
      navigate("/profile");
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.user.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage("Login failed");
      }
    }
  };

  return (
    <div className="flex w-screen items-center justify-center">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-zinc-400 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Username or Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="your.user@example.com"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <Button
                    variant="link"
                    className="px-0 text-xs text-zinc-400 hover:text-primary"
                    type="button"
                  >
                    Forgot your password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-zinc-800 border-zinc-700 text-white"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-700"
                    onClick={togglePasswordVisibility}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
            {message && (
              <p className="mt-4 text-center text-sm text-zinc-300">
                {message}
              </p>
            )}
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
              Don’t have an account?{" "}
           
              <Button variant="link" onClick={navRegister} className="text-primary text-white p-0">
                Sign Up
              </Button>
           
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
