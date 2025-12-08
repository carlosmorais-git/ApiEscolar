import { useState, useEffect, useMemo, useCallback } from "react";
import { useMatriculas } from "../../contexts/MatriculasContext";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import MatriculaForm from "../../components/form/MatriculaForm";
import "../Page.css";
import { Plus } from "lucide-react";

const periodoMap = {
  M: "Matutino",
  V: "Vespertino",
  N: "Noturno",
};

export default function MatriculasPage() {
  const {
    matriculas,
    loading,
    error,
    estudantesMap,
    cursosMap,
    carregarDados,
    adicionarMatricula,
    atualizarMatricula,
    deletarMatricula,
  } = useMatriculas();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMatricula, setSelectedMatricula] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleAdd = useCallback(() => {
    setSelectedMatricula(null);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((matricula) => {
    setSelectedMatricula(matricula);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deletarMatricula(id);
      } catch (err) {
        alert("Erro ao deletar matrícula: " + err.message);
      }
    },
    [deletarMatricula]
  );

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        if (selectedMatricula) {
          await atualizarMatricula(selectedMatricula.id, formData);
        } else {
          await adicionarMatricula(formData);
        }
        setModalOpen(false);
        setSelectedMatricula(null);
      } catch (err) {
        alert("Erro ao salvar: " + (err.response?.data?.detail || err.message));
      }
    },
    [selectedMatricula, adicionarMatricula, atualizarMatricula]
  );

  const columns = useMemo(
    () => [
      {
        key: "estudante",
        label: "Estudante",
        render: (valor) => estudantesMap[valor]?.nome || `ID: ${valor}`,
      },
      {
        key: "curso",
        label: "Curso",
        render: (valor) => {
          const curso = cursosMap[valor];
          return curso
            ? `${curso.codigo} - ${curso.descricao}`
            : `ID: ${valor}`;
        },
      },
      {
        key: "periodo",
        label: "Período",
        render: (valor) => periodoMap[valor] || valor,
      },
    ],
    [estudantesMap, cursosMap]
  );

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const matriculasFiltradas = useMemo(() => {
    if (!searchQuery.trim()) {
      return matriculas;
    }

    const query = searchQuery.toLowerCase();
    return matriculas.filter((matricula) => {
      const estudante = estudantesMap[matricula.estudante];
      const curso = cursosMap[matricula.curso];

      return (
        estudante?.nome?.toLowerCase().includes(query) ||
        curso?.codigo?.toLowerCase().includes(query) ||
        curso?.descricao?.toLowerCase().includes(query)
      );
    });
  }, [matriculas, searchQuery, estudantesMap, cursosMap]);

  const tituloPage = "Verificar Matrículas em Aberto";
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
        columns={columns}
        data={matriculasFiltradas}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />

      <Modal
        isOpen={modalOpen}
        title={selectedMatricula ? "Editar Matrícula" : "Nova Matrícula"}
        onClose={() => {
          setModalOpen(false);
          setSelectedMatricula(null);
        }}
      >
        <MatriculaForm
          matricula={selectedMatricula}
          onSubmit={handleSubmit}
          estudantesMap={estudantesMap}
          cursosMap={cursosMap}
          onCancel={() => {
            setModalOpen(false);
            setSelectedMatricula(null);
          }}
        />
      </Modal>
    </div>
  );
}
