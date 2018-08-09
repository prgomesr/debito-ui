import { Injectable } from '@angular/core';
import {ResourceService} from '../core/models/resource.service';
import {Conta} from '../core/models/model';
import {HttpClient} from '@angular/common/http';
import {ContaSerializer} from '../core/models/serializers';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends ResourceService<Conta>{

  constructor(http: HttpClient) {
    super(http, 'contas', new ContaSerializer() );
  }
}
