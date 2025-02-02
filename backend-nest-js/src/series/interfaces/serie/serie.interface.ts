export class Serie {
    titulo: string
    imagenes: string[]
    categorias: Categoria[]
    numeroCapitulos: number
    fechaEmision: string
    sinopsis: string
    puntuaciones?: {
        email: string,
        puntuaciones: number
    }[]
}

export class Categoria{
    nombre: string;
    imagen: string;
}
