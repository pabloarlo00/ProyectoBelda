import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../common/noticia';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  // Inyección funcional (estándar en Angular 17/18)
  private readonly http = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000/noticias';

  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.API_URL);
  }

  getOne(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.API_URL}/${id}`);
  }

  getSecciones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/secciones`);
  }

  crear(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.API_URL, noticia);
  }

  actualizar(id: string, noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(`${this.API_URL}/${id}`, noticia);
  }

  borrar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
