import { Injectable } from '@angular/core';
import {ResourceService} from '../core/models/resource.service';
import {Cliente} from '../core/models/model';
import {HttpClient} from '@angular/common/http';
import {ClienteSerializer} from '../core/models/serializers';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends ResourceService<Cliente>{

  constructor(http: HttpClient) {
    super(http, 'clientes', new ClienteSerializer());
  }
}
