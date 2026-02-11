export interface Noticia {
  _id?: string;
  imagenes: string[];
  titulo: string;
  subtitulo?: string;
  seccion: string;
  iconoSeccion?: string;
  autor: string;
  fecha?: Date | string;
  contenido: string;
}
