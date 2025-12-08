import { useState, useEffect } from "react";

import "../Form.css";

export default function MatriculaForm({
  matricula,
  onSubmit,
  onCancel,
  estudantesMap,
  cursosMap,
}) {
  const [formData, setFormData] = useState({
    estudante: "",
    curso: "",
    periodo: "M",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (matricula) {
      setFormData(matricula);
    }
  }, [matricula]);

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

    if (!formData.estudante) {
      novosErros.estudante = "Estudante é obrigatório";
    }

    if (!formData.curso) {
      novosErros.curso = "Curso é obrigatório";
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
      const dadosParaEnviar = {
        ...formData,
        estudante: parseInt(formData.estudante),
        curso: parseInt(formData.curso),
      };
      await onSubmit(dadosParaEnviar);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="estudante">Estudante</label>
        <select
          id="estudante"
          name="estudante"
          value={formData.estudante}
          onChange={handleChange}
          className={errors.estudante ? "error" : ""}
        >
          <option value="">Selecione um estudante</option>
          {Object.values(estudantesMap).map((est) => (
            <option key={est.id} value={est.id}>
              {est.nome}
            </option>
          ))}
        </select>
        {errors.estudante && (
          <span className="error-text">{errors.estudante}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="curso">Curso</label>
        <select
          id="curso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className={errors.curso ? "error" : ""}
        >
          <option value="">Selecione um curso</option>
          {Object.values(cursosMap).map((cur) => (
            <option key={cur.id} value={cur.id}>
              {cur.codigo} - {cur.descricao}
            </option>
          ))}
        </select>
        {errors.curso && <span className="error-text">{errors.curso}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="periodo">Período</label>
        <select
          id="periodo"
          name="periodo"
          value={formData.periodo}
          onChange={handleChange}
        >
          <option value="M">Matutino</option>
          <option value="V">Vespertino</option>
          <option value="N">Noturno</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Salvando..." : matricula ? "Atualizar" : "Criar"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
