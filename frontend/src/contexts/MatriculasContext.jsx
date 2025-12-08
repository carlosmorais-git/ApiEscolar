import { createContext, useContext, useState, useCallback } from "react";
import {
  matriculaService,
  estudanteService,
  cursoService,
} from "../services/api";

const MatriculasContext = createContext();

export function MatriculasProvider({ children, credentials }) {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estudantesMap, setEstudantesMap] = useState({});
  const [cursosMap, setCursosMap] = useState({});

  const carregarDados = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [matResponse, estResponse, curResponse] = await Promise.all([
        matriculaService.getAll(credentials),
        estudanteService.getAll(credentials),
        cursoService.getAll(credentials),
      ]);

      setMatriculas(matResponse.data.results || matResponse.data);

      // Criar maps para referência rápida
      const estMap = {};
      const estudantes = estResponse.data.results || estResponse.data;

      estudantes.forEach((est) => {
        estMap[est.id] = est;
      });

      setEstudantesMap(estMap);

      const curMap = {};
      const cursos = curResponse.data.results || curResponse.data;
      cursos.forEach((cur) => {
        curMap[cur.id] = cur;
      });
      setCursosMap(curMap);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  const adicionarMatricula = useCallback(
    async (formData) => {
      const response = await matriculaService.create(formData, credentials);
      setMatriculas((prev) => [...prev, response.data]);
      return response.data;
    },
    [credentials]
  );

  const atualizarMatricula = useCallback(
    async (id, formData) => {
      await matriculaService.update(id, formData, credentials);
      setMatriculas((prev) =>
        prev.map((mat) => (mat.id === id ? { ...mat, ...formData } : mat))
      );
    },
    [credentials]
  );

  const deletarMatricula = useCallback(
    async (id) => {
      await matriculaService.delete(id, credentials);
      setMatriculas((prev) => prev.filter((mat) => mat.id !== id));
    },
    [credentials]
  );

  const value = {
    matriculas,
    loading,
    error,
    estudantesMap,
    cursosMap,
    carregarDados,
    adicionarMatricula,
    atualizarMatricula,
    deletarMatricula,
  };

  return (
    <MatriculasContext.Provider value={value}>
      {children}
    </MatriculasContext.Provider>
  );
}

export function useMatriculas() {
  const context = useContext(MatriculasContext);
  if (!context) {
    throw new Error(
      "useMatriculas deve ser usado dentro de MatriculasProvider"
    );
  }
  return context;
}
