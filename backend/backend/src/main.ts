import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían campos de más
      transform: true, // Transforma los datos automáticamente
    })
  );
  app.enableCors();
  await app.listen(3000);
  console.log("Servidor corriendo en http://localhost:3000");
}
bootstrap();
