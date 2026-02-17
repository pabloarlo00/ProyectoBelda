import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
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

  @Prop({ type: String, required: true })
  seccion: string;

  @Prop({ type: String })
  iconoSeccion: string;

  @Prop({ type: String, required: true })
  autor: string;

  @Prop({ type: Date, default: Date.now })
  fecha: Date;

  @Prop({ type: String, required: true })
  contenido: string;

  @Prop({ type: [Object], default: [] })
  comentarios: Comentario[];
}

export const NoticiaSchema = SchemaFactory.createForClass(Noticia);
