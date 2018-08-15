import {Lancamento} from '../core/models/model';
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
    lancamento.convenio = json.convenio;

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
      convenio: lancamento.convenio
    };
  }
}
