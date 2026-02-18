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
} from "@nestjs/common";
import { NoticiasService } from "./noticias.service";
import { CrearNoticiaDto } from "./dto/crear-noticia.dto";

import { CrearComentarioDto } from "./dto/crear-comentario.dto";

@Controller("noticias")
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Get()
  getAll(@Query("page") page: number = 1) {
    return this.noticiasService.findAll(page);
  }

  @Get("buscar")
  search(@Query("q") q: string) {
    return this.noticiasService.findByTerm(q);
  }

  @Get("secciones")
  getSecciones() {
    return this.noticiasService.getSecciones();
  }

  @Get("seccion/:nombre")
  getBySeccion(
    @Param("nombre") nombre: string,
    @Query("page") page: number = 1,
  ) {
    return this.noticiasService.findBySeccion(nombre, page);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.noticiasService.findOne(id);
  }

  @Post()
  create(@Body() noticiaDto: CrearNoticiaDto) {
    return this.noticiasService.create(noticiaDto);
  }

  @Patch("/:id/comentarios")
  createComentario(
    @Body() comentarioDto: CrearComentarioDto,
    @Param("id") id: string,
  ) {
    return this.noticiasService.addComentario(id, comentarioDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.noticiasService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.noticiasService.delete(id);
  }
}
