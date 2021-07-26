import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPaper, IPaperCM, IPaperUM } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(
    protected readonly http: HttpClient
  ) { }

  public findAll(): Observable<IPaper[]> {
    return this.http.get<IPaper[]>(`${environment.endPoint}${environment.api.paper}`);
  }

  public findById(id: string): Observable<IPaper> {
    return this.http.get<IPaper>(`${environment.endPoint}${environment.api.paper}/${id}`);
  }

  public insert(paper: IPaperCM): Observable<IPaper> {
    return this.http.post<IPaper>(`${environment.endPoint}${environment.api.paper}`, paper);
  }

  public update(paper: IPaperUM): Observable<IPaper | IPaper[]> {
    return this.http.put<IPaper | IPaper[]>(`${environment.endPoint}${environment.api.paper}`, paper);
  }

  public remove(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.endPoint}${environment.api.paper}/${id}`);
  }
}
