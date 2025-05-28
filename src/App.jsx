import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Events from "./pages/Events/Events.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Empresa from "./pages/Empresa/Empresa.jsx";
import LoginAdmin from "./components/LoginForm/auth/LoginAdmin.jsx";
import styles from './App.module.css';

const isAuthenticated = () => {
  return localStorage.getItem('acessToken') ? true : false;

}

/*  if (!isAuthenticated()){
    return <Navigate to="/login" replace />
  }
  return children;
}*/


function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <main className={styles.main_content}>
          <Routes>
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/empresa" element={<Empresa />} />


            <Route path="/admin" element={
              
                <Admin />
              
            }
            />
          </Routes>
        </main>
        <footer className={styles.app_footer}>
          <div className={styles.footer_content}>
            <p>&copy; {new Date().getFullYear()} Edlane Moura - Fotógrafa Profissional. Todos os direitos reservados.</p>

          </div>

        </footer>
      </div>

    </Router>
  )
};

export default App
