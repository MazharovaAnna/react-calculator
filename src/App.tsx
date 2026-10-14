import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CalculatorProvider, ThemeProvider } from "@/context";
import { AppLayout } from "@/layouts/AppLayout";
import { CalculatorPage, ConverterPage } from "@/pages";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CalculatorProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<CalculatorPage mode="simple" />} />
              <Route path="/scientific" element={<CalculatorPage mode="scientific" />} />
              <Route path="/converter" element={<ConverterPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CalculatorProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}