import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {ApiResponseSeries} from '../common/series';
import {Observable} from 'rxjs';
import {
  ApiResponseCategorias,
  ApiResponseMessage,
  ApiResponseSerie,
  ApiResponseSeries, ApiResponseSeriesByCategorias, Categoria,
  Serie
} from '../common/series';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http: HttpClient= inject(HttpClient)
  serieSeleccionada?: Serie;


  constructor() { }
  getData():Observable<ApiResponseSeries>{
    return this.http.get<ApiResponseSeries>(environment.apiUrl)
  }

  getOneData(id:string):Observable<ApiResponseSerie>{
    return this.http.get<ApiResponseSerie>(environment.apiUrl+"serie/"+id)
  }

  getCategorias():Observable<ApiResponseCategorias>{
    return this.http.get<ApiResponseCategorias>(environment.apiUrl+"categorias");
  }

  addMovie(serie: Serie): Observable<ApiResponseMessage>{
    return this.http.post<ApiResponseMessage>(environment.apiUrl,serie)
  }

  updateMovie(serie: Serie): Observable<ApiResponseMessage>{
    console.log(serie._id)
    return this.http.patch<ApiResponseMessage>(environment.apiUrl+serie._id,serie)
  }

  getSeriesByCategoria(categoria: Categoria): Observable<Serie[]> {
    const categoriaEspaciosFiltrados = categoria.nombre.replace(/ /g, '%20');
    return this.http.get<Serie[]>(
      environment.apiUrl + "searchCategoria?categoria=" + categoriaEspaciosFiltrados
    );
  }

  getSeriesByNombre(nombre: string): Observable<Serie[]> {
    const nombreEspaciosFiltrados = nombre.replace(/ /g, '%20');
    return this.http.get<Serie[]>(
      environment.apiUrl + "search?titulo=" + nombreEspaciosFiltrados
    );
  }

  deleteMovie(id: string):Observable<ApiResponseMessage>{
    return this.http.delete<ApiResponseMessage>(environment.apiUrl+"delete/"+id)
  }

}
