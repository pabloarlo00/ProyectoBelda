import { Document } from 'mongoose';
export declare class Noticia extends Document {
    imagenes: string[];
    titulo: string;
    subtitulo: string;
    seccion: string;
    iconoSeccion: string;
    autor: string;
    fecha: Date;
    contenido: string;
}
export declare const NoticiaSchema: import("mongoose").Schema<Noticia, import("mongoose").Model<Noticia, any, any, any, Document<unknown, any, Noticia, any, {}> & Noticia & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Noticia, Document<unknown, {}, import("mongoose").FlatRecord<Noticia>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Noticia> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
