import { createContext, useContext, useState, useCallback } from "react";
import { estudanteService } from "../services/api";

const EstudantesContext = createContext();

export function EstudantesProvider({ children, credentials }) {
  const [estudantes, setEstudantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarEstudantes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await estudanteService.getAll(credentials);
      setEstudantes(response.data.results || response.data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar estudantes:", err);
    } finally {
      setLoading(false);
    }
  }, [credentials]);

  const adicionarEstudante = useCallback(
    async (formData) => {
      const response = await estudanteService.create(formData, credentials);
      setEstudantes((prev) => [...prev, response.data]);
      return response.data;
    },
    [credentials]
  );

  const atualizarEstudante = useCallback(
    async (id, formData) => {
      await estudanteService.update(id, formData, credentials);
      setEstudantes((prev) =>
        prev.map((est) => (est.id === id ? { ...est, ...formData } : est))
      );
    },
    [credentials]
  );

  const deletarEstudante = useCallback(
    async (id) => {
      await estudanteService.delete(id, credentials);
      setEstudantes((prev) => prev.filter((est) => est.id !== id));
    },
    [credentials]
  );

  const buscarEstudantes = useCallback(
    async (query) => {
      try {
        const response = await estudanteService.search(query, credentials);
        setEstudantes(response.data.results || response.data);
      } catch (err) {
        console.error("Erro ao buscar estudantes:", err);
      }
    },
    [credentials]
  );

  const value = {
    estudantes,
    loading,
    error,
    carregarEstudantes,
    adicionarEstudante,
    atualizarEstudante,
    deletarEstudante,
    buscarEstudantes,
  };

  return (
    <EstudantesContext.Provider value={value}>
      {children}
    </EstudantesContext.Provider>
  );
}

export function useEstudantes() {
  const context = useContext(EstudantesContext);
  if (!context) {
    throw new Error(
      "useEstudantes deve ser usado dentro de EstudantesProvider"
    );
  }
  return context;
}
