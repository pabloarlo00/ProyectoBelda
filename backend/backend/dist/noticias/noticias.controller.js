"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticiasController = void 0;
const common_1 = require("@nestjs/common");
const noticias_service_1 = require("./noticias.service");
const crear_noticia_dto_1 = require("./dto/crear-noticia.dto");
let NoticiasController = class NoticiasController {
    constructor(noticiasService) {
        this.noticiasService = noticiasService;
    }
    getAll() {
        return this.noticiasService.findAll();
    }
    search(q) {
        return this.noticiasService.findByTerm(q);
    }
    getSecciones() {
        return this.noticiasService.getSecciones();
    }
    getBySeccion(nombre) {
        return this.noticiasService.findBySeccion(nombre);
    }
    getById(id) {
        return this.noticiasService.findOne(id);
    }
    create(noticiaDto) {
        return this.noticiasService.create(noticiaDto);
    }
    update(id, body) {
        return this.noticiasService.update(id, body);
    }
    remove(id) {
        return this.noticiasService.delete(id);
    }
};
exports.NoticiasController = NoticiasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('secciones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "getSecciones", null);
__decorate([
    (0, common_1.Get)('seccion/:nombre'),
    __param(0, (0, common_1.Param)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "getBySeccion", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_noticia_dto_1.CrearNoticiaDto]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoticiasController.prototype, "remove", null);
exports.NoticiasController = NoticiasController = __decorate([
    (0, common_1.Controller)('noticias'),
    __metadata("design:paramtypes", [noticias_service_1.NoticiasService])
], NoticiasController);
//# sourceMappingURL=noticias.controller.js.map