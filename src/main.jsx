import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Mainframe from './components/Mainframe';
import './lib/multiLang/i18n'
import ApplicationTrail from "./components/ApplicationTrail.jsx";
import { ThemeProvider } from './layout/ThemeContext';
import './layout/layout.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainframe />} />
          <Route path="/trail" element={<ApplicationTrail />} />
          <Route path="/genre/:genreId" element={<App />} />
          <Route path="/book/:bookId" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
