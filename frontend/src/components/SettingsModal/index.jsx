import { User, LogOut } from "lucide-react";
import "./SettingsModal.css";

export default function SettingsModal({
  isOpen,
  onClose,
  credentials,
  onLogout,
}) {
  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Configurações</h2>
          <button className="btn-close-settings" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* Card de Conta */}
          <div className="account-card">
            <div className="account-icon">
              <User size={32} />
            </div>
            <div className="account-info">
              <h3>Conta Conectada</h3>
              <p className="username">{credentials?.username || "Usuário"}</p>
            </div>
            <p className="account-type">Administrador</p>
          </div>

          {/* Botão de Logout */}
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={18} />
            Sair da Conta
          </button>

          {/* Informações do Sistema */}
          <div className="system-info">
            <h4>Informações do Sistema</h4>
            <div className="info-item">
              <span className="info-label">Versão:</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">API:</span>
              <span className="info-value">http://localhost:8000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
