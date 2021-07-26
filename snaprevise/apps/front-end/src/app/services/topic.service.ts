import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopic, ITopicCM, ITopicUM } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    protected readonly http: HttpClient
  ) { }

  public findAll(): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${environment.endPoint}${environment.api.topic}`);
  }

  public findById(id: string): Observable<ITopic> {
    return this.http.get<ITopic>(`${environment.endPoint}${environment.api.topic}/${id}`);
  }

  public insert(topic: ITopicCM): Observable<ITopic> {
    return this.http.post<ITopic>(`${environment.endPoint}${environment.api.topic}`, topic);
  }

  public update(topic: ITopicUM): Observable<ITopic | ITopic[]> {
    return this.http.put<ITopic | ITopic[]>(`${environment.endPoint}${environment.api.topic}`, topic);
  }

  public remove(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.endPoint}${environment.api.topic}/${id}`);
  }
}
