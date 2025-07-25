import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Events from "./pages/Events/Events.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Ensaios from "./pages/Ensaios/Ensaios.jsx";
import LoginAdmin from "./components/LoginForm/auth/LoginAdmin.jsx";
import LottieScreen from "./components/common/LoaderScreen.jsx";
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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <Router>
      {isLoading ? (
        <LottieScreen />
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
