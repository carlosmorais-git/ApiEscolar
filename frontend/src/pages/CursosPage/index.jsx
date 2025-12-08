import { useState, useEffect, useMemo, useCallback } from "react";
import { useCursos } from "../../contexts/CursosContext";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import CursoForm from "../../components/form/CursoForm";
import "../Page.css";
import { Plus } from "lucide-react";

const nivelMap = {
  B: "Básico",
  I: "Intermediário",
  A: "Avançado",
};

export default function CursosPage() {
  const {
    cursos,
    loading,
    error,
    carregarCursos,
    adicionarCurso,
    atualizarCurso,
    deletarCurso,
  } = useCursos();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    carregarCursos();
  }, [carregarCursos]);

  const handleAdd = useCallback(() => {
    setSelectedCurso(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((curso) => {
    setSelectedCurso(curso);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletarCurso(id);
      } catch (err) {
        alert("Erro ao deletar curso: " + err.message);
      }
    },
    [deletarCurso]
  );

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        if (selectedCurso) {
          await atualizarCurso(selectedCurso.id, formData);
        } else {
          await adicionarCurso(formData);
        }
        setModalOpen(false);
        setSelectedCurso(null);
      } catch (err) {
        alert("Erro ao salvar: " + (err.response?.data?.detail || err.message));
      }
    },
    [selectedCurso, adicionarCurso, atualizarCurso]
  );
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const cursosFiltrados = useMemo(() => {
    if (!searchQuery.trim()) {
      return cursos;
    }

    const query = searchQuery.toLowerCase();
    return cursos.filter(
      (curso) =>
        curso.codigo.toLowerCase().includes(query) ||
        curso.descricao.toLowerCase().includes(query)
    );
  }, [cursos, searchQuery]);

  const columns = useMemo(
    () => [
      { key: "codigo", label: "Código" },
      { key: "descricao", label: "Descrição" },
      {
        key: "nivel",
        label: "Nível",
        render: (valor) => nivelMap[valor] || valor,
      },
    ],
    []
  );

  const tituloPage = "Listagem de todos os Cursos Disponíveis";

  return (
    <div className="page">
      <div className="page-header">
        <h1>{tituloPage}</h1>
        <view className="page_actions">
          <input
            type="text"
            placeholder="Buscar por código ou descrição..."
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
        title="Cursos"
        columns={columns}
        data={cursosFiltrados}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />

      <Modal
        isOpen={modalOpen}
        title={selectedCurso ? "Editar Curso" : "Novo Curso"}
        onClose={() => {
          setModalOpen(false);
          setSelectedCurso(null);
        }}
      >
        <CursoForm
          curso={selectedCurso}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setSelectedCurso(null);
          }}
        />
      </Modal>
    </div>
  );
}
