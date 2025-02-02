import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Categoria, Serie} from "./interfaces/serie/serie.interface";
import {SerieDto} from "./dto/serie.dto/serie.dto";

@Injectable()
export class SeriesService {
    constructor(@InjectModel('Serie') private serieModel: Model<Serie>) {}
    
    
    async addSerie(serieDto: SerieDto): Promise<any>{
        const serie= new this.serieModel(serieDto);
        return serie.save();
    }

    async getSeries(): Promise<Serie[]>{
        return this.serieModel.find();
    }

    async getSerie(idSerie: string): Promise<Serie> {
        return this.serieModel.findById(idSerie);
    }

    async getCategorias() {
        try {
            const categorias = await this.serieModel.distinct('categorias');
            return categorias.map(categoria => ({ // aqui recogems las categorias y las mapeamos con sus valores
                nombre: categoria.nombre,
                imagen: categoria.imagen
            }));
        } catch (error) {
            throw new Error(`Error al obtener categorías: ${error.message}`);
        }
    }


    async getSeriesByName(name: string): Promise<Serie[]> {
        // el buscador
        const regex = new RegExp(name, 'i');
        return this.serieModel.find({
            title: { $regex: regex },
        });
    }

    async updateSerie(id: string, serieDto: SerieDto): Promise<any>{
        return this.serieModel.findByIdAndUpdate(
            id,
            {$set: serieDto},
            {new: true}
        );
    }

    async deleteSerie(idSerie: string): Promise<any>{
        return this.serieModel.findByIdAndDelete(idSerie);
    }

    // para encontrr una srie por categoria buscandola
    //DUDA DE SI ESTO ES ASI.
    async findByCategory(categoryName: string): Promise<any[]> {
        try {
            const regex = new RegExp(categoryName, 'i');
            return this.serieModel
                .find({
                    'categorias.nombre': { $regex: regex }
                })
                .exec();
        } catch (error) {
            throw new Error(`Error al buscar por categoría: ${error.message}`);
        }
    }


    //esto para buscar pr titulo
    // gpt me comento de hacerlo asi para manejar los espacios y convertirlos en '%20'
    async findByTitle(titulo: string): Promise<Serie[]> {
        try {
            return this.serieModel.find({
                titulo: {
                    $regex: titulo,
                    $options: 'i'
                }
            }).exec();
        } catch (error) {
            throw new Error(`Error al buscar por título: ${error.message}`);
        }
    }

}
