import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {ApiResponseSeries} from '../common/series';
import {Observable} from 'rxjs';
import {
  ApiResponseCategorias,
  ApiResponseMessage,
  ApiResponseSerie,
  ApiResponseSeries,
  Serie
} from '../common/series';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private readonly http: HttpClient= inject(HttpClient)


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


  deleteMovie(id: string):Observable<ApiResponseMessage>{
    return this.http.delete<ApiResponseMessage>(environment.apiUrl+"delete/"+id)
  }

}
