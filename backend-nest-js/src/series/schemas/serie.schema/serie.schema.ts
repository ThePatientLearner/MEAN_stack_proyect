import { Schema } from "mongoose";


export const SerieSchema = new Schema({
        titulo: { type: String, required: true },
        imagenes: [{ type: String, required: true }],
        categorias: [{
                nombre: { type: String, required: true },
                imagen: { type: String, required: true }
        }],
        numeroCapitulos: { type: Number, required: true },
        fechaEmision: { type: Date, required: true },
        sinopsis: { type: String, required: true },
        puntuaciones: {
                type: [{
                        email: { type: String, required: true },
                        puntuaciones: { type: Number, required: true }
                }],
                required: false
        }
});




