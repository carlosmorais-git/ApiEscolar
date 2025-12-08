import { useState, useEffect } from "react";
import { validarCodigo } from "../../../utils/validators";
import "../Form.css";

export default function CursoForm({ curso, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    codigo: "",
    descricao: "",
    nivel: "B",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (curso) {
      setFormData(curso);
    }
  }, [curso]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.codigo.trim()) {
      novosErros.codigo = "Código é obrigatório";
    } else if (!validarCodigo(formData.codigo)) {
      novosErros.codigo = "Código deve ter no mínimo 3 caracteres";
    }

    if (!formData.descricao.trim()) {
      novosErros.descricao = "Descrição é obrigatória";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="codigo">Código</label>
        <input
          id="codigo"
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          placeholder="Digite o código do curso"
          className={errors.codigo ? "error" : ""}
        />
        {errors.codigo && <span className="error-text">{errors.codigo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          placeholder="Digite a descrição do curso"
          rows="4"
          className={errors.descricao ? "error" : ""}
        />
        {errors.descricao && (
          <span className="error-text">{errors.descricao}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="nivel">Nível</label>
        <select
          id="nivel"
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
        >
          <option value="B">Básico</option>
          <option value="I">Intermediário</option>
          <option value="A">Avançado</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Salvando..." : curso ? "Atualizar" : "Criar"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
