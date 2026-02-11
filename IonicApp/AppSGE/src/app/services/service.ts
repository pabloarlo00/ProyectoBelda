import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia } from '../common/noticia';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getAllNotices(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(environment.baseUrl + '/');
  }
}
