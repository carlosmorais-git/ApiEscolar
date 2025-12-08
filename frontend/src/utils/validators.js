// Validar CPF
export const validarCPF = (cpf) => {
  if (!cpf || cpf.length !== 11) return false;
  if (!/^\d+$/.test(cpf)) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validar primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let resto = soma % 11;
  let dv1 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[9]) !== dv1) return false;
  
  // Validar segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  resto = soma % 11;
  let dv2 = resto < 2 ? 0 : 11 - resto;
  
  if (parseInt(cpf[10]) !== dv2) return false;
  
  return true;
};

// Validar nome (apenas letras e espaços)
export const validarNome = (nome) => {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(nome);
};

// Validar celular (formato: 86 99999-9999)
export const validarCelular = (celular) => {
  return /^\d{2}\s\d{5}-\d{4}$/.test(celular);
};

// Validar código (mínimo 3 caracteres)
export const validarCodigo = (codigo) => {
  return codigo && codigo.length >= 3;
};

// Validar email
export const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Formatar CPF para exibição
export const formatarCPF = (cpf) => {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formatar celular
export const formatarCelular = (celular) => {
  if (!celular) return '';
  return celular.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
};

// Remover formatação
export const removerFormatacao = (valor) => {
  return valor.replace(/\D/g, '');
};
