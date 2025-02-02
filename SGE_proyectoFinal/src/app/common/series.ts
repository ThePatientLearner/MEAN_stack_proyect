
export interface ApiResponseSeries{
  status: boolean
  data: Serie[]
}

export interface Serie {
  _id: string
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


export interface Categoria {
  nombre: string
  imagen: string
}


export interface ApiResponseSerie{
  satus: boolean
  data: Serie
}

export interface ApiResponseCategorias{
  satus: boolean
  data: Categoria[]
}

export interface ApiResponseSeriesByCategorias{
  status: boolean,
  data: Serie[]
}

export interface ApiResponseMessage{
  status: boolean
  message: string
}





