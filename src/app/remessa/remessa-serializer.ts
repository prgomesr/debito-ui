import {Remessa} from '../core/models/model';
import * as moment from 'moment';

export class RemessaSerializer {
  fromJson(json: any): Remessa {
    const remessa = new Remessa();
    remessa.id = json.id;
    remessa.nome = json.nome;
    if (json.data) {
      remessa.data = moment(json.data, 'YYYY-MM-DD').toDate();
    }
    remessa.valor = json.valor;
    remessa.situacao = json.situacao;

    return remessa;
  }

  toJson(remessa: Remessa): any {
    return {
      id: remessa.id,
      nome: remessa.nome,
      data: remessa.data,
      valor: remessa.valor,
      situacao: remessa.situacao,
    };
  }
}
