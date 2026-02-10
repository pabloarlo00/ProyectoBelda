import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import {CrearNoticiaDto} from "./dto/crear-noticia.dto";

@Controller('noticias')
export class NoticiasController {
    constructor(private readonly noticiasService: NoticiasService) {}

    @Get()
    getAll() {
        return this.noticiasService.findAll(); }



    @Get('buscar')
    search(@Query('q') q: string) {
        return this.noticiasService.findByTerm(q); }

    @Get('secciones')
    getSecciones() {
        return this.noticiasService.getSecciones(); }

    @Get('seccion/:nombre')
    getBySeccion(@Param('nombre') nombre: string) {
        return this.noticiasService.findBySeccion(nombre); }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.noticiasService.findOne(id); }

    @Post()
    create(@Body() noticiaDto: CrearNoticiaDto) {
        return this.noticiasService.create(noticiaDto); }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.noticiasService.update(id, body); }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.noticiasService.delete(id); }
}