import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Noticia } from "./interfaces/noticias.interface";
import { CrearComentarioDto } from "./dto/crear-comentario.dto";
import { CrearNoticiaDto } from "./dto/crear-noticia.dto";
@Injectable()
export class NoticiasService {
  constructor(@InjectModel("Noticia") private noticiaModel: Model<Noticia>) {}

  async findAllAdmin(): Promise<Noticia[]> {
    return this.noticiaModel.find().sort({ fecha: -1 }).exec();
  }

  async findAll(page: number = 1): Promise<Noticia[]> {
    const limit = 5;
    const skip = (page - 1) * limit;

    return this.noticiaModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ fecha: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Noticia> {
    const Noticia = this.noticiaModel.findById(id).exec();
    if (!Noticia) {
      throw new NotFoundException({
        status: false,
        message: "Noticia No encontrada",
      });
    }
    return Noticia;
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

  async create(crearNoticiaDto: CrearNoticiaDto): Promise<Noticia> {
    const nueva = new this.noticiaModel(crearNoticiaDto);
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
  async update(id: string, crearNoticiaDto: CrearNoticiaDto): Promise<Noticia> {
    return this.noticiaModel
      .findByIdAndUpdate(id, crearNoticiaDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    const deleteNoticia = this.noticiaModel.findByIdAndDelete(id).exec();
    if (!deleteNoticia) {
      throw new NotFoundException({
        status: false,
        message: "Noticia no encontrada",
      });
    }
    return deleteNoticia;
  }

  async getSecciones(): Promise<any[]> {
    return this.noticiaModel
      .aggregate([
        {
          $group: {
            _id: "$seccion.nombre",
            nombre: { $first: "$seccion.nombre" },
            iconoApp: { $first: "$seccion.iconoApp" },
            iconoWeb: { $first: "$seccion.iconoWeb" },
          },
        },
        { $sort: { nombre: 1 } },
        {
          $project: {
            _id: 0,
            nombre: 1,
            iconoApp: 1,
            iconoWeb: 1, // quito el ID por que me ralla la cabota
          },
        },
      ])
      .exec();
  }

  async findBySeccion(
    nombreSeccion: string,
    page: number = 1,
  ): Promise<Noticia[]> {
    const limit = 5;
    const skip = (page - 1) * limit;

    return this.noticiaModel
      .find({ "seccion.nombre": nombreSeccion })
      .skip(skip)
      .limit(limit)
      .sort({ fecha: -1 })
      .exec();
  }
}
