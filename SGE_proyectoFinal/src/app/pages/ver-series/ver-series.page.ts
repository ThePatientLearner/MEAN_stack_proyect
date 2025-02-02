
import {CUSTOM_ELEMENTS_SCHEMA, ViewChild} from '@angular/core';

import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton, IonGrid,
  IonHeader,
  IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderPage} from "../header/header.page";
import {DataService} from "../../services/data.service";
import {ApiResponseSeries, Categoria, Serie} from "../../common/series";
import {Router, RouterLink} from "@angular/router";
import {register} from "swiper/element/bundle";
import Swiper from "swiper";
register();

@Component({
  selector: 'app-ver-series',
  templateUrl: './ver-series.page.html',
  styleUrls: ['./ver-series.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderPage, IonFab, IonFabButton, IonIcon, IonText, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonButton, IonSpinner, IonCardSubtitle, RouterLink, IonInfiniteScroll, IonInfiniteScrollContent, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class VerSeriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll?: IonInfiniteScroll;

  private readonly dataService : DataService = inject(DataService)
  loading: boolean = false;
  error: string | null = null;
  private seriesIniciales: number = 5;
  private cargasContinuasImagenes: number = 3;
  private indiceActual: number = 0;
  private allSeries: Serie[] = [];
  series: Serie[] = [];
  categorias: Categoria[] = []
  data!: ApiResponseSeries;
  serie?: Serie;

  constructor(private router: Router) {
  }

  ngOnInit(){
    //this.loadSeries();
    this.loadSeries();
    this.loadCategorias();
  }

  public loadSeries() {
    this.loading = true;
    this.error = null;
    this.dataService.getData().subscribe({
      next: (value) => {
        this.data = value;
        this.allSeries = value.data.sort((a, b) => {
          return new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime();
        });

        // Cargamos solo las primeras 5 series
        this.series = this.allSeries.slice(0, this.seriesIniciales);
      },
      // ... resto del método sin cambios ...
    });
  }

  loadData(event: any) {
    console.log('Cargando siguientes series...');

    // Calcula el próximo segmento de datos
    const startIndex = this.series.length;
    const endIndex = startIndex + this.cargasContinuasImagenes;
    const nextItems = this.allSeries.slice(startIndex, endIndex);

    if (nextItems.length === 0) {
      event.target.disabled = true;
      return;
    }

    // Agregar nuevas series y actualizar el array
    this.series = [...this.series, ...nextItems];
    event.target.complete();

    // Verificar si hay más datos para cargar
    if (endIndex >= this.allSeries.length) {
      event.target.disabled = true;
    }
  }

  protected loadCategorias(){
    this.dataService.getCategorias().subscribe({

        next: value => {
          console.log(value)
          this.categorias = value.data;
        },
        complete: () => {
          console.log('Genres loaded!')
          console.log()
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }


  removeSerie(serie: Serie) {
    if (confirm(`¿Estás seguro de que quieres borrar la serie "${serie.titulo}"?`)) {
      this.dataService.deleteMovie(serie._id).subscribe({
        next: (response) => {
          console.log('Serie eliminada:', response.message);
          this.loadSeries()
        },
        error: (err) => {
          console.error('Error al borrar la Serie:', err);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
      });
    }
  }


  verDetalles(serie: Serie) {
    this.router.navigate(['/detalles'], {
      queryParams: { id: serie._id }
    });
  }

}

/*
  public loadSeries() {
    this.loading = true;
    this.error = null;
    this.dataService.getData().subscribe({
      next: (value) => {
        this.data = value;
        this.allSeries = value.data.sort((a, b) => {
          return new Date(b.fechaEmision).getTime() - new Date(a.fechaEmision).getTime();
        });
        // Cargamos solo los primeros 5
        this.series = this.allSeries


      },
      error: (err) => {
        this.error = 'Error al cargar las series';
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  loadData(event: any) {
    console.log('Cargando siguientes series...');

    // Calcula el próximo segmento de datos
    const startIndex = this.series.length;
    const endIndex = startIndex + this.pageSize;
    const nextItems = this.allSeries.slice(startIndex, endIndex);

    if (nextItems.length === 0) {
      event.target.disabled = true;
      return;
    }

    this.series = [...this.series, ...nextItems];
    event.target.complete();

    // Reinicia el scroll si hay más datos
    if (this.series.length < this.allSeries.length) {
      event.target.disabled = false;
    }
  }

   */


/*
loadData(event: any) {
  console.log('Cargando siguientes series...');
  setTimeout(() => {
    const nextItems = this.allSeries.slice(
      this.indiceActual,
      this.indiceActual + this.cargasContinuasImagenes
    );

    if (nextItems.length === 0) {
      event.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

    this.series.push(...nextItems);
    this.indiceActual += this.cargasContinuasImagenes;
    event.target.complete();
  }, 500);
}

 */

