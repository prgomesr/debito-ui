import {Resource} from './resource.service';

export class Lancamento extends Resource {
  valor: number;
  valorPago: number;
  vencimento: Date;
  pagamento: Date;
  situacao: string;
  lote: string;
  cliente = new Cliente();
  conta = new Conta();
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
  convenio = new Convenio();
}

export class Empresa extends Resource {

}

export class Convenio extends Resource {

}
