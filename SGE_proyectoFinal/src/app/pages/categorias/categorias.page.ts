import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBadge, IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent, IonFab, IonFabButton, IonGrid,
  IonHeader, IonIcon,
  IonImg, IonInfiniteScroll, IonInfiniteScrollContent,
  IonLabel, IonRow, IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderPage} from "../header/header.page";
import {DataService} from "../../services/data.service";
import {ApiResponseSeries, ApiResponseSeriesByCategorias, Categoria, Serie} from "../../common/series";
import {RouterLink} from "@angular/router";
import {register} from "swiper/element/bundle";
register();


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderPage,
    IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonLabel, IonBadge, IonButton, IonCardSubtitle, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow, IonSpinner, RouterLink, IonInfiniteScrollContent, IonInfiniteScroll]
})
export class CategoriasPage implements OnInit {
  private readonly dataService : DataService = inject(DataService)
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll!: IonInfiniteScroll;
  loading: boolean = false;
  error: string | null = null;
  private seriesIniciales: number = 4; // pongo 4 aqui ya que es dificil ver 5 juntas en esta seccion
  private cargasContinuasImagenes: number = 3;
  private indiceActual: number = 0;
  private allSeries: Serie[] = [];
  hayDatos?: boolean = false
  categoriaSeleccionada?: string; // para gurdoar la categoria seleccionada
  series: Serie[] = []
  categorias: Categoria[] = []
  data!: ApiResponseSeries;
  serie?: Serie;

  ngOnInit(){

    this.loadCategorias();
  }

  seleccionarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = categoria.nombre;
    this.loading = true;
    this.dataService.getSeriesByCategoria(categoria).subscribe({
      next: (response) => {
        this.allSeries = response;
        // Cargamos inicialmente solo 5 series
        this.series = this.allSeries.slice(0, this.seriesIniciales);
        this.hayDatos = true;
        this.indiceActual = this.seriesIniciales;

        if (this.infiniteScroll) {
          this.infiniteScroll.disabled = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar series por categoría:', err);
        this.series = [];
        this.hayDatos = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
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




protected loadCategorias() {
    this.dataService.getCategorias().subscribe({
      next: value => {
        // Crear un Map usando el nombre como clave para eliminar duplicados
        const categoriasMap = new Map(
          value.data.map(categoria => [categoria.nombre.toLowerCase(), categoria])
        );

        // Convertir el Map de vuelta a array
        this.categorias = Array.from(categoriasMap.values());

        console.log('Categorías filtradas:', this.categorias);
      },
      complete: () => {
        console.log('Genres loaded without duplicates!');
      },
      error: err => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }



  protected readonly inject = inject;
}
