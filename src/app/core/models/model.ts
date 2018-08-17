import {Resource} from './resource.service';

export class Lancamento extends Resource {
  valor: number;
  valorPago: number;
  vencimento: Date;
  pagamento: Date;
  situacao = 'PENDENTE';
  lote: string;
  cliente = new Cliente();
  convenio = new Convenio();
}

export class Cliente extends Resource {
  nome: string;
  agencia: string;
  conta: string;
  digitoAgencia: string;
  digitoConta: string;
  identificadorBanco: string;
  banco: string;
}

export class Conta extends Resource {
  agencia: string;
  digitoAgencia: string;
  digitoConta: string;
  numero: string;
  banco: string;
  empresa = new Empresa();
}

export class Empresa extends Resource {
  nome: string;
}

export class Convenio extends Resource {
  numero: string;
  sequencial: string;
  conta = new Conta();
}

export class Filtro {
  vencimento: Date;
  convenio: Convenio;
}

export class Remessa  extends Resource {
  nome: string;
  data: Date;
  valor: number;
  situacao: string;
}

