import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CalculatorProvider, ThemeProvider } from "@/context";
import { CalculatorPage, ConverterPage } from "@/pages";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CalculatorProvider>
          <Routes>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/scientific" element={<CalculatorPage />} />
            <Route path="/converter" element={<ConverterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CalculatorProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}