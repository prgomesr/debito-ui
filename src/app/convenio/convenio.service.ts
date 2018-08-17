import { Injectable } from '@angular/core';
import {ResourceService} from '../core/models/resource.service';
import {Convenio} from '../core/models/model';
import {HttpClient} from '@angular/common/http';
import {ConvenioSerializer} from './convenio-serializer';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService extends ResourceService<Convenio>
{

  constructor(http: HttpClient) {
    super(http, 'convenios', new ConvenioSerializer());
  }
}
