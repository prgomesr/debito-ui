import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RemessaSerializer} from './remessa-serializer';
import {ResourceService} from '../core/models/resource.service';
import {Remessa} from '../core/models/model';

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
