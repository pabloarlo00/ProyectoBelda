import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class CrearNoticiaDto {
    @IsArray()
    @IsString({ each: true })
    imagenes: string[];

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsOptional()
    subtitulo: string;

    @IsString()
    @IsNotEmpty()
    seccion: string;

    @IsString()
    @IsOptional()
    iconoSeccion: string;

    @IsString()
    @IsNotEmpty()
    autor: string;

    @IsString()
    @IsNotEmpty()
    contenido: string;
}