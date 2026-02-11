import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NoticiasModule } from "./noticias/noticias.module";
import "dotenv/config";
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), NoticiasModule],
})
export class AppModule {}
