import { createContext, useContext, useState, useCallback } from "react";
import { cursoService } from "../services/api";

const CursosContext = createContext();

export function CursosProvider({ children, credentials }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarCursos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cursoService.getAll(credentials);
      setCursos(response.data.results || response.data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar cursos:", err);
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  const adicionarCurso = useCallback(
    async (formData) => {
      const response = await cursoService.create(formData, credentials);
      setCursos((prev) => [...prev, response.data]);
      return response.data;
    },
    [credentials]
  );

  const atualizarCurso = useCallback(
    async (id, formData) => {
      await cursoService.update(id, formData, credentials);
      setCursos((prev) =>
        prev.map((cur) => (cur.id === id ? { ...cur, ...formData } : cur))
      );
    },
    [credentials]
  );

  const deletarCurso = useCallback(
    async (id) => {
      await cursoService.delete(id, credentials);
      setCursos((prev) => prev.filter((cur) => cur.id !== id));
    },
    [credentials]
  );

  const value = {
    cursos,
    loading,
    error,
    carregarCursos,
    adicionarCurso,
    atualizarCurso,
    deletarCurso,
  };

  return (
    <CursosContext.Provider value={value}>{children}</CursosContext.Provider>
  );
}

export function useCursos() {
  const context = useContext(CursosContext);
  if (!context) {
    throw new Error("useCursos deve ser usado dentro de CursosProvider");
  }
  return context;
}
