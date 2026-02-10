import { Model } from 'mongoose';
import { Noticia } from './schemas/noticia.schema';
export declare class NoticiasService {
    private noticiaModel;
    constructor(noticiaModel: Model<Noticia>);
    findAll(): Promise<Noticia[]>;
    findOne(id: string): Promise<Noticia>;
    findByTerm(termino: string): Promise<Noticia[]>;
    create(data: any): Promise<Noticia>;
    update(id: string, data: any): Promise<Noticia>;
    delete(id: string): Promise<any>;
    getSecciones(): Promise<string[]>;
    findBySeccion(seccion: string): Promise<Noticia[]>;
}
