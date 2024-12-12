import {
  parseISO,
  format,
  isEqual,
  isBefore,
  isAfter,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  addYears,
  addMonths,
  getYear,
  getMonth,
} from "date-fns";

export default class Tools {
  isValidPassword(password: string) {
    if (!password) return false;
    if (password.length < 8) return false;
    return true;
  }

  somenteNumeros(num: string) {
    return num.replace(/[^\d]+/g, "");
  }

  formatCPF = (cpf: string) => {
    if (!cpf) {
      return cpf;
    }
    if (cpf.length > 2) {
      return `${cpf
        .substr(0, cpf.length - 2)
        .split(/(?=(?:...)*$)/)
        .join(".")}-${cpf.substr(-2)}`;
    } else {
      return cpf;
    }
  };

  validarCPF(cpf: string): boolean {
    cpf = this.somenteNumeros(cpf);
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }
    if (
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }
    let numero = 0;
    let caracter = "";
    const numeros = "0123456789";
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = "";
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  isValidEmail(email: string): boolean {
    const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  temNomeMinimo(nome: string) {
    const espaco = " ";
    const minPalavras = 2; // Qtde Mínima de Palavras no Nome
    const minCaracteres = 5; // Qtde de carateres mínimos
    const arr = nome.trim().split(espaco);
    let cont = 0;

    if (arr.length >= minPalavras) {
      arr.forEach((element) => {
        if (element.length > 0) {
          cont += element.length;
        }
      });
    }
    return cont >= minCaracteres ? true : false;
  }

  formatCodAluno(codigo: string) {
    if (!codigo) {
      return codigo;
    }
    codigo = codigo.toString();
    if (codigo.toString().indexOf("-") > -1) {
      codigo = codigo.split("-").join("");
    }
    return `${codigo.substr(0, codigo.length - 1)}-${codigo.substr(-1)}`;
  }

  formatDateBR(dateOri: string) {
    if (dateOri == null || dateOri.length == 0) return "";
    const dtParse = parseISO(dateOri);
    const fmtDate = format(dtParse, "dd/MM/yyyy");
    return fmtDate;
  }

  formatDateEN(dateOri: string) {
    let tmp = [""];
    if (dateOri.indexOf("/") != -1) tmp = dateOri.split("/");
    if (dateOri.indexOf("-") != -1) tmp = dateOri.split("-");
    const dia = "00".concat(tmp[0]).substr(-2, 2);
    const mes = "00".concat(tmp[1]).substr(-2, 2);
    const ano = "0000".concat(tmp[2]).substr(-4, 4);
    const dateEN = ano + "-" + mes + "-" + dia;
    const dtParse = parseISO(dateEN);
    const fmtDate = format(dtParse, "yyyy-MM-dd");
    return fmtDate;
  }

  isEqualDate(dataOri: string, dateToCompare: string) {
    const parseOri = parseISO(dataOri);
    const parseFim = parseISO(dateToCompare);
    return isEqual(parseOri, parseFim);
  }

  isBeforeDate(dataOri: string, dateToCompare: string) {
    const parseOri = parseISO(dataOri);
    const parseFim = parseISO(dateToCompare);
    const result = isBefore(parseOri, parseFim);
    return result;
  }

  isAfterDate(dataOri: string, dateToCompare: string) {
    const parseOri = parseISO(dataOri);
    const parseFim = parseISO(dateToCompare);
    const result = isAfter(parseOri, parseFim);
    return result;
  }

  formatCertidaoNascimento(certidao: string) {
    certidao = certidao.replace(/\D/g, "");
    // "999999 99 99 9999 9 99999 999 9999999 99"
    certidao = certidao.replace(
      /^(\d{6})(\d{2})(\d{2})(\d{4})(\d{1})(\d{5})(\d{3})(\d{7})(\d{2})/g,
      "$1 $2 $3 $4 $5 $6 $7 $8 $9"
    );
    return certidao;
  }

  formatPhone(phone: string) {
    let phoneString = phone.toString();
    phoneString = phoneString.replace(/\D/g, "");
    phoneString = phoneString.replace(/^(\d{2})(\d)/g, "($1) $2");
    phoneString = phoneString.replace(/(\d)(\d{4})$/, "$1-$2");
    return phoneString;
  }

  formatCEP(cep: string) {
    if (!cep) {
      return cep;
    }
    return `${cep.substr(0, cep.length - 3)}-${cep.substr(-3)}`;
  }

  formatIdade(date: string) {
    const result = [];
    const now = new Date();
    let age = parseISO(date);

    const years = differenceInYears(now, age);
    if (years > 0) {
      result.push(`${years} ano(s)`);
      age = addYears(age, years);
    }

    const months = differenceInMonths(now, age);
    if (months > 0) {
      result.push(`${months} mês(es)`);
      age = addMonths(age, months);
    }

    const days = differenceInDays(now, age);
    if (days > 0) {
      result.push(`${days} dia(s)`);
    }

    return result.join(", ");
  }

  todayEN() {
    const hoje = new Date(Date.now());
    const day = hoje.getUTCDate();
    return `${getYear(hoje)}-${getMonth(hoje) + 1}-${day}`;
  }

  removerAcentos(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  idadeValidaParaInscricao(
    minDateNasctoEN: string,
    maxDateNasctoEN: string,
    dtNasctoEN: string
  ) {
    const dataIniBR = this.formatDateBR(minDateNasctoEN);
    const dataFimBR = this.formatDateBR(maxDateNasctoEN);
    if (this.isBeforeDate(dtNasctoEN, minDateNasctoEN))
      return `Idade não permitida! Somente nascidos entre: ${dataIniBR} a ${dataFimBR}.`;
    if (this.isAfterDate(dtNasctoEN, maxDateNasctoEN))
      return `Idade não permitida! Somente nascidos entre: ${dataIniBR} a ${dataFimBR}.`;
    return "";
  }

  isAdult(age: number, limit: number = 18) {
    return age < limit ? false : true;
  }

  idade(nascimento: Date, hoje: Date = new Date()) {
    let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if (
      new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
      new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate())
    )
      diferencaAnos--;
    return diferencaAnos;
  }
}
