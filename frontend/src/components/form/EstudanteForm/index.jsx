import { useState, useEffect } from "react";
import {
  validarCPF,
  validarNome,
  validarCelular,
  validarEmail,
  removerFormatacao,
} from "../../../utils/validators";
import "../Form.css";

export default function EstudanteForm({ estudante, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    data_nascimento: "",
    celular: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (estudante) {
      setFormData(estudante);
    }
  }, [estudante]);

  const formatarCelular = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 11) {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
    }
    return valor;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === "celular") {
      novoValor = formatarCelular(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }));

    // Limpar erro do campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
    } else if (!validarNome(formData.nome)) {
      novosErros.nome = "Nome deve conter apenas letras";
    }

    if (!formData.email.trim()) {
      novosErros.email = "Email é obrigatório";
    } else if (!validarEmail(formData.email)) {
      novosErros.email = "Email inválido";
    }

    if (!formData.cpf.trim()) {
      novosErros.cpf = "CPF é obrigatório";
    } else if (!validarCPF(removerFormatacao(formData.cpf))) {
      novosErros.cpf = "CPF inválido";
    }

    if (!formData.data_nascimento) {
      novosErros.data_nascimento = "Data de nascimento é obrigatória";
    }

    if (!formData.celular.trim()) {
      novosErros.celular = "Celular é obrigatório";
    } else if (!validarCelular(formData.celular)) {
      novosErros.celular = "Celular deve estar no formato: 86 99999-9999";
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
        cpf: removerFormatacao(formData.cpf),
        celular: removerFormatacao(formData.celular),
      };
      await onSubmit(dadosParaEnviar);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite o nome completo"
          className={errors.nome ? "error" : ""}
        />
        {errors.nome && <span className="error-text">{errors.nome}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Digite o email"
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="Digite o CPF (11 dígitos)"
          maxLength="14"
          className={errors.cpf ? "error" : ""}
        />
        {errors.cpf && <span className="error-text">{errors.cpf}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="data_nascimento">Data de Nascimento</label>
        <input
          id="data_nascimento"
          type="date"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChange={handleChange}
          className={errors.data_nascimento ? "error" : ""}
        />
        {errors.data_nascimento && (
          <span className="error-text">{errors.data_nascimento}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="celular">Celular</label>
        <input
          id="celular"
          type="text"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          placeholder="86 99999-9999"
          maxLength="14"
          className={errors.celular ? "error" : ""}
        />
        {errors.celular && <span className="error-text">{errors.celular}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Salvando..." : estudante ? "Atualizar" : "Criar"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
