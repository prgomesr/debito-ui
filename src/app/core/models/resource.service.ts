import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {Filtro} from './model';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';

export class Resource {
  id: number;
}

export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}

export class ResourceService<T extends Resource> {

  url = 'http://localhost:8080';
  constructor(private http: HttpClient,
              private endpoint: string,
              private serializer: Serializer) { }

  public create(item: T): Observable<T> {
    return this.http
      .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
      .map(data => this.serializer.fromJson(data) as T);
  }

  public update(item: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
        this.serializer.toJson(item))
      .map(data => this.serializer.fromJson(data) as T);
  }

  read(id: number): Observable<T> {
    return this.http
      .get(`${this.url}/${this.endpoint}/${id}`)
      .map((data: any) => this.serializer.fromJson(data) as T);
  }

  list(): Observable<T[]> {
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}`);
  }

  filter(filtro: Filtro): Observable<T[]> {
    let params = new HttpParams();
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}`, {params});
  }

  filterRemessa(filtro: Filtro): Observable<T[]> {
    let params = new HttpParams();
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}/gerar-remessa`, {params});
  }

  lancamentoPorLote(filtro: Filtro, vencimento: Date): Observable<T> {
    let params = new HttpParams();
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    if (vencimento) {
      moment(vencimento).format('YYYY-MM-DD');
    }
    return this.http
      .post<T>(`${this.url}/${this.endpoint}/cadastrar-por-lote`, vencimento, {params});
  }

  baixarRemessa(id: number) {
    return this.http
      .get(`${this.url}/${this.endpoint}/${id}/pegar-remessa`, {responseType: 'blob'})
      .map(res => this.downloadFile(res, 'application/txt', `${environment.nomeArquivoRemessa}.TXT`));
  }

  delete(id: number) {
    return this.http
      .delete(`${this.url}/${this.endpoint}/${id}`);
  }

  downloadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);

    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

}
