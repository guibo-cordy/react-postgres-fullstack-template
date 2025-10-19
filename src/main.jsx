import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Mainframe from './components/Mainframe';
import './lib/multiLang/i18n'
import AppTrail from "./applications/Trail/AppTrail.jsx";
import AppTriathlon from "./applications/triathlon/AppTriathlon.jsx";
import DemoChart from "./applications/triathlon/DemoChart.jsx";
import { ThemeProvider } from './layout/ThemeContext';
import './layout/layout.css';
import { DataModelProvider } from './components/DataModelContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <DataModelProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainframe />} />
            <Route path="/trail" element={<AppTrail />} />
            <Route path="/triathlon" element={<AppTriathlon />} />
            <Route path="/chart" element={<DemoChart />} />
            <Route path="/genre/:genreId" element={<App />} />
            <Route path="/book/:bookId" element={<App />} />
          </Routes>
        </BrowserRouter>
      </DataModelProvider>
    </ThemeProvider>
  </StrictMode>,
);
