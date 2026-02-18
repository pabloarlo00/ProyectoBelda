export interface Noticia {
  _id?: string;
  imagenes: string[];
  titulo: string;
  subtitulo?: string;
  seccion: Seccion;
  autor: string;
  fecha?: Date | string;
  contenido: string;
  comentarios: Comentario[];
}

export interface Comentario {
  nombre: string;
  email: string;
  comentario: string;
}

export interface Seccion {
  nombre: string;
    iconoWeb: string;
    iconoApp: string;
}

