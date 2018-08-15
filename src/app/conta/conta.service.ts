import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceService} from '../core/models/resource.service';
import {Conta} from '../core/models/model';
import {ContaSerializer} from './conta-serializer';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends ResourceService<Conta>{

  constructor(http: HttpClient) {
    super(http, 'contas', new ContaSerializer
    () );
  }
}
