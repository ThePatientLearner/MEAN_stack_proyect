import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonRow,
  IonSearchbar, IonSpinner, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderPage} from "../header/header.page";
import {DataService} from "../../services/data.service";
import {ApiResponseSeries, Categoria, Serie} from "../../common/series";
import {Subject} from "rxjs";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderPage, IonSearchbar, IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow, IonSpinner, IonText, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class BuscadorPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll!: IonInfiniteScroll;
  loading: boolean = false;
  error: string | null = null;
  private seriesIniciales: number = 5;
  private cargasContinuasImagenes: number = 3;
  private indiceActual: number = 0;
  private allSeries: Serie[] = [];
  private dataSerivce: DataService = inject(DataService)
  series: Serie[] = []
  data!: ApiResponseSeries;
  nombreBuscado: string ='';
  hayDatos: boolean = false;



  constructor() {
  }

  ngOnInit() {
    this.hayDatos = false;

  }

  buscarSeries(event: any) {
    const termino = event.detail.value?.trim();
    if (termino && termino.length >= 1) { // para al menos poner dos letras ants de que busque algo
      this.loading = true;
      this.dataSerivce.getSeriesByNombre(termino).subscribe({
        next: (response) => {
          // Asegúrate de que response.data existe y es un array
          this.allSeries = Array.isArray(response) ? response : [];
          // Inicializa series con solo los primeros 5 elementos
          this.series = this.allSeries.slice(0, this.seriesIniciales);
          this.hayDatos = this.allSeries.length > 0;
          this.loading = false;
          this.indiceActual = this.seriesIniciales;

          // Habilita el infinite scroll solo si hay más series para cargar
          if (this.infiniteScroll) {
            this.infiniteScroll.disabled = this.allSeries.length <= this.seriesIniciales;
          }
        },
        error: (err) => {
          console.error('Error en la búsqueda:', err);
          this.series = [];
          this.allSeries = [];
          this.hayDatos = false;
          this.loading = false;
        }
      });
    } else {
      this.series = [];
      this.allSeries = [];
      this.hayDatos = false;
    }
  }

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

}





