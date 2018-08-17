import { Injectable } from '@angular/core';
import {Remessa} from '../core/models/model';
import {ResourceService} from '../core/models/resource.service';
import {HttpClient} from '@angular/common/http';
import {RemessaSerializer} from './remessa-serializer';

@Injectable({
  providedIn: 'root'
})
export class RemessaService extends ResourceService<Remessa> {

  constructor(http: HttpClient) {
    super(
      http, 'remessas', new RemessaSerializer()
    );
  }
}
