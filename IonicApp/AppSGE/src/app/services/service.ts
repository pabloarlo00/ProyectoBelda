import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Noticia, ResNoticia } from '../common/noticia';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getAllNotices(page: number): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(`${environment.baseUrl}/?page=${page}`);
  }

  buscarNoticias(termino: string): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(
      `${environment.baseUrl}/buscar?q=${termino}`,
    );
  }

  getNoticiaById(id: string): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(`${environment.baseUrl}/${id}`);
  }

  postComentario(id: string, comentario: any): Observable<ResNoticia> {
    return this.http.patch<ResNoticia>(
      `${environment.baseUrl}/${id}/comentarios`,
      comentario,
    );
  }

  getNoticiasBySeccion(seccion: string, page: any): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(
      `${environment.baseUrl}/seccion/${seccion}?page=${page}`,
    );
  }

  getSecciones(): Observable<ResNoticia> {
    return this.http.get<ResNoticia>(`${environment.baseUrl}/secciones`);
  }
}
