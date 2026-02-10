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
exports.NoticiasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const noticia_schema_1 = require("./schemas/noticia.schema");
let NoticiasService = class NoticiasService {
    constructor(noticiaModel) {
        this.noticiaModel = noticiaModel;
    }
    async findAll() {
        return this.noticiaModel.find().exec();
    }
    async findOne(id) {
        return this.noticiaModel.findById(id).exec();
    }
    async findByTerm(termino) {
        return this.noticiaModel.find({
            $or: [
                { titulo: { $regex: termino, $options: 'i' } },
                { autor: { $regex: termino, $options: 'i' } }
            ]
        }).exec();
    }
    async create(data) {
        const nueva = new this.noticiaModel(data);
        return nueva.save();
    }
    async update(id, data) {
        return this.noticiaModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return this.noticiaModel.findByIdAndDelete(id).exec();
    }
    async getSecciones() {
        return this.noticiaModel.distinct('seccion').exec();
    }
    async findBySeccion(seccion) {
        return this.noticiaModel.find({ seccion }).exec();
    }
};
exports.NoticiasService = NoticiasService;
exports.NoticiasService = NoticiasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(noticia_schema_1.Noticia.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NoticiasService);
//# sourceMappingURL=noticias.service.js.map