import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeContextProvider from "./utils/contexts/theme-context/ThemeContextProvider";

import "./main.css";

import Landing from "./routes/landing/Landing";
import MyError from "./utils/error/Error";
import LoginContextProvider from "./utils/contexts/login-context/LoginContextProvider";
/* import LoginSignup from "./routes/login/LoginSignup"; */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <LoginContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="*" element={<MyError ErrorCode={404} />} />
          </Routes>
        </BrowserRouter>
      </LoginContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
