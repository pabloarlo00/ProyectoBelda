import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { NoticiasService } from "./noticias.service";
import { CrearNoticiaDto } from "./dto/crear-noticia.dto";

import { CrearComentarioDto } from "./dto/crear-comentario.dto";

@Controller("noticias")
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get("all-admin")
  async getAllAdmin() {
    try {
      const data = await this.noticiasService.findAllAdmin();
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new BadRequestException({ status: false, message: e.message });
    }
  }
  @Get()
  async getAll(@Query("page") page: number = 1) {
    try {
      const data = await this.noticiasService.findAll(page);
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get("buscar")
  async search(@Query("q") q: string) {
    try {
      const data = await this.noticiasService.findByTerm(q);
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get("secciones")
  async getSecciones() {
    try {
      const data = await this.noticiasService.getSecciones();
      return {
        status: true,
        secciones: data,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get("seccion/:nombre")
  async getBySeccion(
    @Param("nombre") nombre: string,
    @Query("page") page: number = 1,
  ) {
    try {
      const data = await this.noticiasService.findBySeccion(nombre, page);
      return {
        status: true,
        noticias: data,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    try {
      const data = await this.noticiasService.findOne(id);
      if (!data) throw new NotFoundException("Noticia no encontrada");
      return {
        status: true,
        noticia: data,
      };
    } catch (e) {
      if (e instanceof NotFoundException) throw e;
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Post()
  async create(@Body() CrearNoticiaDto: CrearNoticiaDto) {
    try {
      const data = await this.noticiasService.create(CrearNoticiaDto);
      return {
        status: true,
        message: "Noticia creada con éxito",
        noticia: data,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Patch("/:id/comentarios")
  async createComentario(
    @Body() comentarioDto: CrearComentarioDto,
    @Param("id") id: string,
  ) {
    try {
      const data = await this.noticiasService.addComentario(id, comentarioDto);
      return {
        status: true,
        message: "Comentario añadido con éxito",
        noticiaActualizada: data,
      };
    } catch (e) {
      throw new BadRequestException({
        status: false,
        message: e.message,
      });
    }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: any) {
    try {
      const data = await this.noticiasService.update(id, body);
      return {
        status: true,
        message: "Noticia actualizada con éxito",
        noticia: data,
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      await this.noticiasService.delete(id);
      return {
        status: true,
        message: "Noticia eliminada correctamente",
      };
    } catch (e) {
      throw new InternalServerErrorException({
        status: false,
        message: e.message,
      });
    }
  }
}
