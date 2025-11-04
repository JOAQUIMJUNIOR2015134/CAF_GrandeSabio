import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import SobreNos from "./Pages/SobreNos.jsx";
import Servicos from "./Pages/Servicos.jsx";
import Projectos from "./Pages/Projectos.jsx";
import Contactos from "./Pages/Contactos.jsx";
import Footer from "./Components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SobreNos" element={<SobreNos />} />
          <Route path="/Servicos" element={<Servicos />} />
          <Route path="/Projectos" element={<Projectos />} />
          <Route path="/Contactos" element={<Contactos />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
