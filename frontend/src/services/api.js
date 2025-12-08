import axios from "axios";

const API_BASE_URL = "http://localhost:8000/";

// Função para criar cabeçalhos de autenticação Basic
const getAuthHeaders = (credentials) => {
  if (credentials) {
    const token = btoa(`${credentials.username}:${credentials.password}`);
    return {
      "Content-Type": "application/json",
      "Authorization": `Basic ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Estudantes
export const estudanteService = {
  getAll: (credentials) => api.get("/estudantes/", { headers: getAuthHeaders(credentials) }),
  getById: (id, credentials) => api.get(`/estudantes/${id}/`, { headers: getAuthHeaders(credentials) }),
  create: (data, credentials) => api.post("/estudantes/", data, { headers: getAuthHeaders(credentials) }),
  update: (id, data, credentials) => api.put(`/estudantes/${id}/`, data, { headers: getAuthHeaders(credentials) }),
  delete: (id, credentials) => api.delete(`/estudantes/${id}/`, { headers: getAuthHeaders(credentials) }),
  search: (query, credentials) => api.get("/estudantes/", { params: { search: query }, headers: getAuthHeaders(credentials) }),
};

// Cursos
export const cursoService = {
  getAll: (credentials) => api.get("/cursos/", { headers: getAuthHeaders(credentials) }),
  getById: (id, credentials) => api.get(`/cursos/${id}/`, { headers: getAuthHeaders(credentials) }),
  create: (data, credentials) => api.post("/cursos/", data, { headers: getAuthHeaders(credentials) }),
  update: (id, data, credentials) => api.put(`/cursos/${id}/`, data, { headers: getAuthHeaders(credentials) }),
  delete: (id, credentials) => api.delete(`/cursos/${id}/`, { headers: getAuthHeaders(credentials) }),
};

// Matrículas
export const matriculaService = {
  getAll: (credentials) => api.get("/matriculas/", { headers: getAuthHeaders(credentials) }),
  getById: (id, credentials) => api.get(`/matriculas/${id}/`, { headers: getAuthHeaders(credentials) }),
  create: (data, credentials) => api.post("/matriculas/", data, { headers: getAuthHeaders(credentials) }),
  update: (id, data, credentials) => api.put(`/matriculas/${id}/`, data, { headers: getAuthHeaders(credentials) }),
  delete: (id, credentials) => api.delete(`/matriculas/${id}/`, { headers: getAuthHeaders(credentials) }),
  getByEstudante: (estudanteId, credentials) =>
    api.get(`/estudantes/${estudanteId}/matriculas/`, { headers: getAuthHeaders(credentials) }),
  getByCurso: (cursoId, credentials) => api.get(`/cursos/${cursoId}/matriculas/`, { headers: getAuthHeaders(credentials) }),
};

export default api;
