import { Injectable } from '@angular/core';
import {ResourceService} from '../core/models/resource.service';
import {HttpClient} from '@angular/common/http';
import {LancamentoSerializer} from '../core/models/serializers';
import {Lancamento} from '../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends ResourceService<Lancamento> {

  constructor(http: HttpClient) {
    super(
      http,
      'lancamentos',
      new LancamentoSerializer()
    );
  }
}
