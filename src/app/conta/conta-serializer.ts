import {Conta} from '../core/models/model';

export class ContaSerializer {
  fromJson(json: any): Conta {
    const conta = new Conta();
    conta.id = json.id;
    conta.agencia = json.agencia;
    conta.banco = json.banco;
    conta.digitoAgencia = json.digitoAgencia;
    conta.digitoConta = json.digitoConta;
    conta.empresa = json.empresa;
    conta.numero = json.numero;

    return conta;
  }

  toJson(conta: Conta): any {
    return {
      id: conta.id,
      agencia: conta.agencia,
      banco: conta.banco,
      digitoAgencia: conta.digitoAgencia,
      digitoConta: conta.digitoConta,
      empresa: conta.empresa,
      numero: conta.numero
    };
  }
}
