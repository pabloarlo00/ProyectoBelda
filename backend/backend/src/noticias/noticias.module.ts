import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NoticiasController } from "./noticias.controller";
import { NoticiasService } from "./noticias.service";
import { NoticiaSchema } from "./schemas/noticia.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Noticia", schema: NoticiaSchema }]),
  ],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
