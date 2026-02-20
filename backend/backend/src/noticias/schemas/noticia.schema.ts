import { Schema } from "mongoose";

const SeccionSchema = new Schema(
  {
    nombre: { type: String, required: true },
    iconoWeb: { type: String, required: true },
    iconoApp: { type: String, required: true },
  },
  { _id: false },
);

const ComentarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

export const NoticiaSchema = new Schema(
  {
    imagenes: [{ type: String }],
    titulo: { type: String, required: true, index: true },
    subtitulo: { type: String },
    seccion: { type: SeccionSchema, required: true },
    autor: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    contenido: { type: String, required: true },
    comentarios: { type: [ComentarioSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
