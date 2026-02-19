export interface ResNoticia {
  status: boolean;
  message?: string;
  noticias?: Noticia[];
  noticia?: Noticia;
  secciones?: Seccion[];
}

export interface Noticia {
  _id?: string;
  titulo: string;
  subtitulo: string;
  contenido: string;
  autor: string;
  seccion: Seccion;
  imagenes: string[];
  fecha?: Date | string;
}

export interface Seccion {
  nombre: string;
  iconoWeb: string;
  iconoApp: string;
}
