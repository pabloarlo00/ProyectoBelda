import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticiasModule } from './noticias/noticias.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://pabloarlo00_db_user:BGFxjpdgzFxJAmmF@cluster0.xztdr3k.mongodb.net/?appName=Cluster0'),
        NoticiasModule,
    ],
})
export class AppModule {}