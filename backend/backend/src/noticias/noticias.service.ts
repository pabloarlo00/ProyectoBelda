import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Noticia } from "./schemas/noticia.schema";

@Injectable()
export class NoticiasService {
  constructor(
    @InjectModel(Noticia.name) private noticiaModel: Model<Noticia>,
  ) {}

  async findAll(): Promise<Noticia[]> {
    return this.noticiaModel.find().exec();
  }

  async findOne(id: string): Promise<Noticia> {
    return this.noticiaModel.findById(id).exec();
  }

  async findByTerm(termino: string): Promise<Noticia[]> {
    return this.noticiaModel
      .find({
        $or: [
          { titulo: { $regex: termino, $options: "i" } },
          { autor: { $regex: termino, $options: "i" } },
        ],
      })
      .exec();
  }

  async create(data: any): Promise<Noticia> {
    const nueva = new this.noticiaModel(data);
    return nueva.save();
  }

  async addComentario(id: string, comentario: any): Promise<Noticia> {
    return this.noticiaModel
      .findByIdAndUpdate(
        id,
        { $push: { comentarios: comentario } },
        { new: true },
      )
      .exec();
  }
  async update(id: string, data: any): Promise<Noticia> {
    return this.noticiaModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.noticiaModel.findByIdAndDelete(id).exec();
  }

  async getSecciones(): Promise<string[]> {
    return this.noticiaModel.distinct("seccion").exec();
  }

  async findBySeccion(seccion: string): Promise<Noticia[]> {
    return this.noticiaModel.find({ seccion }).exec();
  }
}
