import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DemoPage from "./pages/DemoPage";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const App = () => {
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </>
  );
};

export default App;
