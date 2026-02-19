

export interface ResNoticia {
    status: boolean;
    message?: string;    // Opcional, para mensajes de éxito/error
    noticias?: Noticia[]; // Para listados (getAll, buscar, secciones)
    noticia?: Noticia;   // Para una sola noticia (getById)
    secciones?: string[]; // Para el listado de secciones
}

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

