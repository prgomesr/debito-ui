import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Empresa} from '../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  list(): Observable<Empresa []> {
    return this.http.get<Empresa []>(`${this.url}/empresas`);
  }
}
