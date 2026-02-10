import { NoticiasService } from './noticias.service';
import { CrearNoticiaDto } from "./dto/crear-noticia.dto";
export declare class NoticiasController {
    private readonly noticiasService;
    constructor(noticiasService: NoticiasService);
    getAll(): Promise<import("./schemas/noticia.schema").Noticia[]>;
    search(q: string): Promise<import("./schemas/noticia.schema").Noticia[]>;
    getSecciones(): Promise<string[]>;
    getBySeccion(nombre: string): Promise<import("./schemas/noticia.schema").Noticia[]>;
    getById(id: string): Promise<import("./schemas/noticia.schema").Noticia>;
    create(noticiaDto: CrearNoticiaDto): Promise<import("./schemas/noticia.schema").Noticia>;
    update(id: string, body: any): Promise<import("./schemas/noticia.schema").Noticia>;
    remove(id: string): Promise<any>;
}
