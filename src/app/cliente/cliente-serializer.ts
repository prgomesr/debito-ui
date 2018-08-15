import {Cliente} from '../core/models/model';

export class ClienteSerializer {
  fromJson(json: any): Cliente {
    const cliente = new Cliente();
    cliente.id = json.id;
    cliente.agencia = json.agencia;
    cliente.digitoAgencia = json.digitoAgencia;
    cliente.digitoConta = json.digitoConta;
    cliente.conta = json.conta;
    cliente.banco = json.banco;
    cliente.identificadorBanco = json.identificadorBanco;
    cliente.nome = json.nome;

    return cliente;
  }

  toJson(cliente: Cliente): any {
    return {
      id: cliente.id,
      agencia: cliente.agencia,
      banco: cliente.banco,
      nome: cliente.nome,
      digitoAgencia: cliente.digitoAgencia,
      digitoConta: cliente.digitoConta,
      identificadorBanco: cliente.identificadorBanco,
      conta: cliente.conta
    };
  }
}
