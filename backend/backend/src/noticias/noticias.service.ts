import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Noticia } from "./schemas/noticia.schema";

@Injectable()
export class NoticiasService {
  constructor(
    @InjectModel(Noticia.name) private noticiaModel: Model<Noticia>,
  ) {}

  async findAll(page: number = 1): Promise<Noticia[]> {
    const limit = 10;
    const skip = (page - 1) * limit;

    return this.noticiaModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ fecha: -1 })
      .exec();
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

  async getSecciones(): Promise<String[]> {
    return this.noticiaModel.distinct("seccion.nombre").exec();
  }

  async findBySeccion(
    nombreSeccion: string,
    page: number = 1,
  ): Promise<Noticia[]> {
    const limit = 10;
    const skip = (page - 1) * limit;

    return this.noticiaModel
      .find({ "seccion.nombre": nombreSeccion })
      .skip(skip)
      .limit(limit)
      .sort({ fecha: -1 })
      .exec();
  }
}
