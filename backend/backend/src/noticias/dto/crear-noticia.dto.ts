import { Type } from "class-transformer";
import { IsString, IsArray, IsOptional, IsNotEmpty, IsObject, ValidateNested } from "class-validator";


class SeccionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  iconoWeb: string;

  @IsString()
  @IsNotEmpty()
  iconoApp: string;
}

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

@IsObject()
  @ValidateNested()
  @Type(() => SeccionDto)
  seccion: SeccionDto;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsString()
  @IsNotEmpty()
  contenido: string;
}
