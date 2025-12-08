import { Users, BookOpen, ClipboardList, Settings } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ activeTab, onTabChange, onSettingsClick }) {
  const tabs = [
    { id: "estudantes", label: "Estudantes", icon: Users },
    { id: "cursos", label: "Cursos", icon: BookOpen },
    { id: "matriculas", label: "Matrículas", icon: ClipboardList },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* svg de logo */}
        <img src="../logo.svg" alt="Logo" width={40} height={40} />
        <h1>Painel de Controle</h1>
      </div>

      <nav className="sidebar-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={onSettingsClick}>
          <Settings size={20} />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
}
