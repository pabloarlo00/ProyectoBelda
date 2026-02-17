// create-comentario.dto.ts
import { IsString, IsEmail, MinLength } from "class-validator";

export class CrearComentarioDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  comentario: string;
}
