import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion, IQuestionCM, IQuestionUM } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    protected readonly http: HttpClient
  ) { }

  public findAll(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${environment.endPoint}${environment.api.question}`);
  }

  public findById(id: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${environment.endPoint}${environment.api.question}/${id}`);
  }

  public insert(question: IQuestionCM): Observable<IQuestion> {
    return this.http.post<IQuestion>(`${environment.endPoint}${environment.api.question}`, question);
  }

  public update(question: IQuestionUM): Observable<IQuestion | IQuestion[]> {
    return this.http.put<IQuestion | IQuestion[]>(`${environment.endPoint}${environment.api.question}`, question);
  }

  public remove(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.endPoint}${environment.api.question}/${id}`);
  }
}
