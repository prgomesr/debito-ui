import {Convenio} from '../core/models/model';

export class ConvenioSerializer {
  fromJson(json: any): Convenio {
    const convenio = new Convenio();
    convenio.id = json.id;
    convenio.conta = json.conta;
    convenio.sequencial = json.sequencial;
    convenio.numero = json.numero;

    return convenio;
  }

  toJson(convenio: Convenio): any {
    return {
      id: convenio.id,
      numero: convenio.numero,
      sequencial: convenio.sequencial,
      conta: convenio.conta
    };
  }
}
