"use client";

import { useState, useEffect } from "react";
// Importá el hook adecuado de navegación según tu entorno (en este ejemplo, usaré useNavigate de react-router-dom)
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShoppingBasketIcon as Basketball,
  Edit2,
  Save,
  X,
  LogIn,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getData } from "@/api/api";
import { API_BASE } from "@/api/api";

const visualData = {
  username: "usernameExample@",
  position: "Point Guard",
};

const mockUserData = {
  name: "John Smith",
  email: "john.smith@example.com",
  avatarUrl: "/placeholder.svg?height=100&width=100",
  ...visualData,
};

export default function ProfileSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // userData contendrá los datos reales combinados con los visuales
  const [userData, setUserData] = useState(mockUserData);
  const [editData, setEditData] = useState(mockUserData);

  // Al cargar, verificamos token y traemos datos reales del backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    setIsLoggedIn(!!token);

    if (token && storedUserId) {
      // Realizamos la petición GET
      fetch(`http://localhost:4000/api/auth/users/${storedUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
          return res.json();
        })
        .then((data) => {
          // Combinar datos reales con datos visuales
          const combinedData = {
            ...data,
            username: userData.username, // se conservan los datos visuales
            position: userData.position,
          };
          setUserData(combinedData);
          setEditData(combinedData);
        })
        .catch((error) => {
          console.error("Error loading profile:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Funciones para edición y guardado
  const handleEdit = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId;

      const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          username: editData.username,
          position: editData.position,
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();
      setUserData(updated);
      setEditData(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex w-screen justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex w-screen items-center justify-center">

      <div className="w-full max-w-3xl mx-auto p-4">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">You don't have a profile yet!</CardTitle>
            <CardDescription className="text-zinc-400">
              You need to sign in to view your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <User className="h-20 w-20 text-zinc-700 mb-4" />
            <p className="text-zinc-400 mb-6 text-center">
              Sign in to access your personal profile and track your progress.
            </p>
            <Button
              onClick={handleLogin}
              className="bg-primary hover:bg-primary/90"
            >
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>

    );
  }

  // Vista del perfil con opción de editar (se muestran datos reales y datos visuales)
  return (
    <div className="flex w-screen items-center justify-center">
    <div className="w-screen items-center justify-center max-w-4xl p-10">
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage
              src={userData.avatarUrl || "/placeholder.svg"}
              alt={userData.name}
            />
            <AvatarFallback className="bg-zinc-800 text-white text-xl">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-zinc-800 pb-2">
              Personal Information
            </h3>

            {/* Name (not editable) */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  value={userData.name}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  disabled
                />
              </div>
            </div>

            {/* Username (editable) */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                {isEditing ? (
                  <Input
                    id="username"
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  />
                ) : (
                  <Input
                    id="username"
                    value={userData.username}
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                    disabled
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                  disabled
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}
