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

  buscarNoticias(termino: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(
      `${environment.baseUrl}/buscar?q=${termino}`,
    );
  }

  getNoticiaById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${environment.baseUrl}/${id}`);
  }

  postComentario(id: string, comentario: any): Observable<Noticia> {
    return this.http.patch<Noticia>(
      `${environment.baseUrl}/${id}/comentarios`,
      comentario,
    );
  }
}
