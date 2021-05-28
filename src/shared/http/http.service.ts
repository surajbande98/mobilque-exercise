import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class HttpService {

  headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private _config: ConfigurationService) { }

  public makePostReq(request: any, api: string): Observable<any> {
    return this.http.post<any>((this._config.baseUrl + api), request, this.headers);
  }

  public makeGetReq(api: string, params = {}): Observable<any> {
    return this.http.get((this._config.baseUrl + api), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: params
    });
  }

  /**
 * Convert Object to HttpParams
 * @param {Object} obj
 * @returns {HttpParams}
 */
  toHttpParams(obj: Object): HttpParams {
    return Object.getOwnPropertyNames(obj)
      .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
  }

}