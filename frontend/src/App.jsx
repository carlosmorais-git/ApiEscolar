import { useState } from "react";
import Sidebar from "./components/Sidebar";
import LoginModal from "./components/LoginModal";
import SettingsModal from "./components/SettingsModal";
import { CursosProvider } from "./contexts/CursosContext";
import { EstudantesProvider } from "./contexts/EstudantesContext";
import { MatriculasProvider } from "./contexts/MatriculasContext";
import EstudantesPage from "./pages/EstudantesPage";
import CursosPage from "./pages/CursosPage";
import MatriculasPage from "./pages/MatriculasPage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("estudantes");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogin = (userCredentials) => {
    setCredentials(userCredentials);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCredentials(null);
    setIsAuthenticated(false);
    setSettingsOpen(false);
  };

  const renderPage = () => {
    switch (activeTab) {
      case "estudantes":
        return <EstudantesPage />;
      case "cursos":
        return <CursosPage />;
      case "matriculas":
        return <MatriculasPage />;
      default:
        return <EstudantesPage />;
    }
  };

  if (!isAuthenticated) {
    return <LoginModal onLogin={handleLogin} />;
  }

  return (
    <EstudantesProvider credentials={credentials}>
      <CursosProvider credentials={credentials}>
        <MatriculasProvider credentials={credentials}>
          <div className="app">
            <Sidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onSettingsClick={() => setSettingsOpen(true)}
            />
            <main className="main-content">{renderPage()}</main>

            <SettingsModal
              isOpen={settingsOpen}
              onClose={() => setSettingsOpen(false)}
              credentials={credentials}
              onLogout={handleLogout}
            />
          </div>
        </MatriculasProvider>
      </CursosProvider>
    </EstudantesProvider>
  );
}

export default App;
