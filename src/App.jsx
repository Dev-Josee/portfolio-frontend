import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Events from "./pages/Events/Events.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Ensaios from "./pages/Ensaios/Ensaios.jsx";
import LoginAdmin from "./components/LoginForm/auth/LoginAdmin.jsx";

import styles from './App.module.css';

const isAuthenticated = () => {
  return localStorage.getItem('accessToken') ? true : false;

}
const ProtectRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children;
};



// Estado inicial para saber se é mobile
const isMobileDevice = () => typeof window !== "undefined" && window.innerWidth <= 768;



// Import dinâmico apenas para mobile
const LottieScreen = isMobileDevice()
  ? lazy(() => import("./components/common/LoaderScreen.jsx"))
  : null;




function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    // Detecta resize
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Timer do loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  return (
    <Router>
      {isLoading && isMobile && LottieScreen ? (
        <Suspense fallback={<div>Carregando...</div>}>
          <LottieScreen />
        </Suspense>
      ) : (
        <div className={styles.app}>

          <Header />
          <main className={styles.main_content}>
            <Routes>
              <Route path="/login" element={<LoginAdmin />} />
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ensaios" element={<Ensaios />} />
              <Route path="/admin" element={
                <ProtectRoute>
                  <Admin />
                </ProtectRoute>
              }
              />
            </Routes>
          </main>
          <footer className={styles.app_footer}>
            <div className={styles.footer_content}>
              <p>&copy; {new Date().getFullYear()} Feedhi. Todos os direitos reservados.</p>

            </div>

          </footer>
        </div>

      )}
    </Router>

  )
};

export default App
