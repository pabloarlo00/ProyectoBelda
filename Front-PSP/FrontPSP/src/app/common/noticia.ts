export interface Noticia {
  _id?: string; // Opcional porque al crear una noticia nueva aún no tiene ID
  titulo: string;
  subtitulo: string;
  contenido: string;
  autor: string;
  seccion: string; // Nombre de la categoría (ej: "SGE")
  iconoSeccion: string; // Clase de Bootstrap Icons (ej: "bi-cpu")
  imagenes: string[]; // Array de URLs de las imágenes
  fecha?: Date | string; // Puede venir como objeto Date o como string ISO desde la API
}
