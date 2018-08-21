import {Injectable} from '@angular/core';
import {ResourceService} from '../core/models/resource.service';
import {Cliente} from '../core/models/model';
import {HttpClient} from '@angular/common/http';
import {ClienteSerializer} from './cliente-serializer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ResourceService<Cliente> {

  constructor(http: HttpClient) {
    super(http, 'clientes', new ClienteSerializer());
  }

  public updateStatus(id: number, valor: boolean): Observable<any> {
    return this.http.put(`${this.url}/${this.endpoint}/${id}/ativo`, valor, this.headers());
  }

}
