import { useState, useEffect, useMemo, useCallback } from "react";
import { useEstudantes } from "../../contexts/EstudantesContext";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import EstudanteForm from "../../components/form/EstudanteForm";
import "../Page.css";
import { Plus } from "lucide-react";

export default function EstudantesPage() {
  const {
    estudantes,
    loading,
    error,
    carregarEstudantes,
    adicionarEstudante,
    atualizarEstudante,
    deletarEstudante,
  } = useEstudantes();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstudante, setSelectedEstudante] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    carregarEstudantes();
  }, [carregarEstudantes]);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    setSelectedEstudante(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((estudante) => {
    setSelectedEstudante(estudante);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletarEstudante(id);
      } catch (err) {
        alert("Erro ao deletar estudante: " + err.message);
      }
    },
    [deletarEstudante]
  );

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        if (selectedEstudante) {
          await atualizarEstudante(selectedEstudante.id, formData);
        } else {
          await adicionarEstudante(formData);
        }
        setModalOpen(false);
        setSelectedEstudante(null);
      } catch (err) {
        alert("Erro ao salvar: " + (err.response?.data?.detail || err.message));
      }
    },
    [selectedEstudante, adicionarEstudante, atualizarEstudante]
  );

  const columns = useMemo(
    () => [
      { key: "nome", label: "Nome" },
      { key: "email", label: "Email" },
      { key: "cpf", label: "CPF" },
      { key: "data_nascimento", label: "Data de Nascimento" },
      { key: "celular", label: "Celular" },
    ],
    []
  );

  const estudantesFiltrados = useMemo(() => {
    if (!searchQuery.trim()) {
      return estudantes;
    }

    const query = searchQuery.toLowerCase();
    return estudantes.filter(
      (estudante) =>
        estudante.nome.toLowerCase().includes(query) ||
        estudante.cpf.toLowerCase().includes(query)
    );
  }, [estudantes, searchQuery]);

  const tituloPage = "Gestão de Estudantes";

  return (
    <div className="page">
      <div className="page-header">
        <h1>{tituloPage}</h1>
        <view className="page_actions">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="btn-add" onClick={handleAdd}>
            <Plus size={18} />
            Adicionar
          </button>
        </view>
      </div>

      <DataTable
        title="Estudantes"
        columns={columns}
        data={estudantesFiltrados}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />

      <Modal
        isOpen={modalOpen}
        title={selectedEstudante ? "Editar Estudante" : "Novo Estudante"}
        onClose={() => {
          setModalOpen(false);
          setSelectedEstudante(null);
        }}
      >
        <EstudanteForm
          estudante={selectedEstudante}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setSelectedEstudante(null);
          }}
        />
      </Modal>
    </div>
  );
}
