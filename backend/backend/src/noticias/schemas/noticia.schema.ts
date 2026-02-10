import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Noticia extends Document {
    @Prop({ type: [String] }) // Especificamos que es un array de strings
    imagenes: string[];

    @Prop({ type: String, required: true }) // Especificamos String
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
}

export const NoticiaSchema = SchemaFactory.createForClass(Noticia);