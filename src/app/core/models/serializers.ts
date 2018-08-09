import {Cliente, Conta, Lancamento} from './model';
import * as moment from 'moment';

export class LancamentoSerializer {
  fromJson(json: any): Lancamento {
    const lancamento = new Lancamento();
    lancamento.id = json.id;
    lancamento.valor = json.valor;
    lancamento.valorPago = json.valorPago;
    if (json.vencimento) {
      lancamento.vencimento = moment(json.vencimento, 'YYYY-MM-DD').toDate();
    }
    if (json.pagamento) {
      lancamento.pagamento = moment(json.pagamento, 'YYYY-MM-DD').toDate();
    }
    lancamento.situacao = json.situacao;
    lancamento.lote = json.lote;
    lancamento.cliente = json.cliente;
    lancamento.conta = json.conta;

    return lancamento;
  }

  toJson(lancamento: Lancamento): any {
    return {
      id: lancamento.id,
      valor: lancamento.valor,
      valorPago: lancamento.valorPago,
      vencimento: lancamento.vencimento,
      pagamento: lancamento.pagamento,
      situacao: lancamento.situacao,
      lote: lancamento.lote,
      cliente: lancamento.cliente,
      conta: lancamento.conta
    };
  }
}

export class ContaSerializer {
  fromJson(json: any): Conta {
    const conta = new Conta();
    conta.id = json.id;
    conta.agencia = json.agencia;
    conta.banco = json.banco;
    conta.convenio = json.convenio;
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
      convenio: conta.convenio,
      digitoAgencia: conta.digitoAgencia,
      digitoConta: conta.digitoConta,
      empresa: conta.empresa,
      numero: conta.numero
    };
  }
}

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
