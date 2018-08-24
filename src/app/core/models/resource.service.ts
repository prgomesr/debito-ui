import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

export class Resource {
  id: number;
}

export interface Serializer {
  fromJson(json: any): Resource;

  toJson(resource: Resource): any;
}

export class ResourceService<T extends Resource> {

  url = 'http://localhost:8080';

  constructor(public http: HttpClient,
              public endpoint: string,
              public serializer: Serializer) {
  }

  public create(item: T): Observable<T> {
    return this.http
      .post<T>(`${this.url}/${this.endpoint}`, this.headers(), this.serializer.toJson(item))
      .map(data => this.serializer.fromJson(data) as T);
  }

  public update(item: T): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`, this.headers(),
        this.serializer.toJson(item))
      .map(data => this.serializer.fromJson(data) as T);
  }

  read(id: number): Observable<T> {
    return this.http
      .get(`${this.url}/${this.endpoint}/${id}`, this.headers())
      .map((data: any) => this.serializer.fromJson(data) as T);
  }

  list(): Observable<T[]> {
    return this.http
      .get<any[]>(`${this.url}/${this.endpoint}`, this.headers());
  }


  delete(id: number) {
    return this.http
      .delete(`${this.url}/${this.endpoint}/${id}`, this.headers());
  }

  headers() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
      )
    };
    return httpOptions;
  }


}
