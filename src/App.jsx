import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Daily } from "./components/daily";
import { Home } from "./components/Home";
import { StarField } from "./components/StarField";
import { Shooting } from "./components/daily-cards/routines/Shooting-routine";
import { CustomRoutine } from "./components/daily-cards/routines/Custom-routine";
import { Passing } from "./components/daily-cards/routines/Passing-routine";
import { Defense } from "./components/daily-cards/routines/Defense-routine";
import { Crossover } from "./components/daily-cards/routines/Crossover-routine";
import BasketballShoeRecommender from "./components/sneakersreco/basketballshoerecom";
import ProfileSect from "./components/profile/Profile";
import ShootingImprovement from "./components/improvement/Improvement";
import { LoginComponent } from "./components/loginComponent";
import { RegisterComponent } from "./components/register/registerComponent";
function App() {
  const location = useLocation();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <StarField width={dimensions.width} height={dimensions.height} />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Ruta padre: /dailyroutine */}
        <Route path="/dailyroutine" element={<Daily />}>
          {/* Ruta hija: /dailyroutine/shooting */}
          <Route path="shooting" element={<Shooting />} />
          <Route path="defense" element={<Defense />} />
          <Route path="crossover" element={<Crossover />} />
          <Route path="passing" element={<Passing />} />
          <Route path="custom" element={<CustomRoutine />} />

        </Route>
        <Route path="/sneakers" element={<BasketballShoeRecommender />}></Route>
        <Route path="/profile" element={<ProfileSect />}></Route>
        <Route path="/improvement" element={<ShootingImprovement />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
      </Routes>
    </>
  );
}

export default App;
