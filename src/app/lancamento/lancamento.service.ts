import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LancamentoSerializer} from './lancamento-serializer';
import {Filtro, Lancamento} from '../core/models/model';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {ResourceService} from '../core/models/resource.service';
import {environment} from '../../environments/environment';

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

  filter(filtro: Filtro): Observable<any[]> {
    let params = new HttpParams();
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}`, {params, headers});
  }

  filterComPaginacao(filtro: Filtro): Observable<any> {
    let params = new HttpParams();
    params = params.set('size', filtro.itensPorPagina.toString());
    params = params.set('page', filtro.pagina.toString());
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}/paginacao`, {params, headers}).map((data: any) => {
        const result = {
          registros: data.content,
          total: data.totalElements
        };
        return result;
      });
  }

  lancamentoPorLote(filtro: Filtro, vencimento: Date): Observable<any> {
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
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
    return this.http
      .post<any>(`${this.url}/${this.endpoint}/cadastrar-por-lote`, vencimento, {params, headers});
  }

  baixarRemessa(id: number) {
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
    return this.http
      .get(`${this.url}/${this.endpoint}/${id}/pegar-remessa`, {responseType: 'blob', headers})
      .map(res => this.downloadFile(res, 'text/plain', `${environment.nomeArquivoRemessa}.TXT`));
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

  filterRemessa(filtro: Filtro): Observable<any[]> {
    let params = new HttpParams();
    if (filtro.convenio) {
      params = params.set('convenio', filtro.convenio.id.toString());
    }
    if (filtro.vencimento) {
      params = params.set('vencimento', moment(filtro.vencimento).format('YYYY-MM-DD'));
    }
    const headers = new HttpHeaders(
      {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      });
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}/gerar-remessa`, {params, headers});
  }

  urlUploadAnexo(id: number): string {
    return `${this.url}/${this.endpoint}/anexo/${id}`;
  }
}
