import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModule, IModuleCM, IModuleUM } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(
    protected readonly http: HttpClient
  ) { }

  public findAll(): Observable<IModule[]> {
    return this.http.get<IModule[]>(`${environment.endPoint}${environment.api.module}`);
  }

  public findById(id: string): Observable<IModule> {
    return this.http.get<IModule>(`${environment.endPoint}${environment.api.module}/${id}`);
  }

  public insert(module: IModuleCM): Observable<IModule> {
    return this.http.post<IModule>(`${environment.endPoint}${environment.api.module}`, module);
  }

  public update(module: IModuleUM): Observable<IModule | IModule[]> {
    return this.http.put<IModule | IModule[]>(`${environment.endPoint}${environment.api.module}`, module);
  }

  public remove(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.endPoint}${environment.api.module}/${id}`);
  }
}
