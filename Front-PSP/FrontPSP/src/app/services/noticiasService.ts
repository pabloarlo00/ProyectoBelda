import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia, ResNoticia } from '../common/noticia';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  // Inyección funcional (estándar en Angular 17/18)
  private readonly http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000/noticias';

  getAll(): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(this.API_URL);
  }

  getOne(id: string): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(`${this.API_URL}/${id}`);
  }

  getSecciones(): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(`${this.API_URL}/secciones`);
  }

  crear(noticia: Noticia): Observable<ResNoticia> {
    return this.http.post<ResNoticia>(this.API_URL, noticia);
  }

  actualizar(id: string, noticia: Noticia): Observable<ResNoticia> {
    return this.http.put<ResNoticia>(`${this.API_URL}/${id}`, noticia);
  }

  borrar(id: string): Observable<ResNoticia> {
    return this.http.delete<ResNoticia>(`${this.API_URL}/${id}`);
  }
}
