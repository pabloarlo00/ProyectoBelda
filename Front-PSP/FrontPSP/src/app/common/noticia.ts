export interface ResNoticia {
    status: boolean;
    message?: string;    // Opcional, para mensajes de éxito/error
    noticias?: Noticia[]; // Para listados (getAll, buscar, secciones)
    noticia?: Noticia;   // Para una sola noticia (getById)
    secciones?: string[]; // Para el listado de secciones
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





