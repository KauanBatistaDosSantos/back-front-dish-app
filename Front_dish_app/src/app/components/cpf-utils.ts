export class CpfUtils {
    static formatarCpf(cpf: string): string {
      if (!cpf) return '';
      const cpfApenasNumeros = cpf.replace(/\D/g, '').slice(0, 11);
      return cpfApenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  
    static validarCpf(cpf: string): boolean {
      const cpfApenasNumeros = cpf.replace(/\D/g, '');
      if (cpfApenasNumeros.length !== 11 || /^(\d)\1+$/.test(cpfApenasNumeros)) {
        return false;
      }
      let soma = 0, resto;
      for (let i = 1; i <= 9; i++) soma += parseInt(cpfApenasNumeros.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpfApenasNumeros.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++) soma += parseInt(cpfApenasNumeros.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpfApenasNumeros.substring(10, 11))) return false;
      return true;
    }
  }
  