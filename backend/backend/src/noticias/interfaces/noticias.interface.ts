export interface SeccionInterface {
  nombre: string;
  iconoWeb: string;
  iconoApp: string;
}

export interface ComentarioInterface {
  nombre: string;
  email: string;
  comentario: string;
  fecha?: Date;
}

export interface Noticia {
  _id?: string;
  imagenes: string[];
  titulo: string;
  subtitulo?: string;
  seccion: SeccionInterface;
  autor: string;
  fecha?: Date;
  contenido: string;
  comentarios?: ComentarioInterface[];
}
