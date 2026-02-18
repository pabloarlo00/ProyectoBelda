import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


class Seccion {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  iconoWeb: string;

  @Prop({ required: true })
  iconoApp: string;
}


export class Comentario {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  comentario: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;
}
@Schema()
export class Noticia extends Document {
  @Prop({ type: [String] })
  imagenes: string[];

  @Prop({ type: String, required: true })
  titulo: string;

  @Prop({ type: String })
  subtitulo: string;

  @Prop({ type: Seccion, required: true })
  seccion: Seccion;

  @Prop({ type: String, required: true })
  autor: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;

  @Prop({ type: String, required: true })
  contenido: string;

  @Prop({ type: Comentario, default: [] })
  comentarios: Comentario[];
}

export const NoticiaSchema = SchemaFactory.createForClass(Noticia);
