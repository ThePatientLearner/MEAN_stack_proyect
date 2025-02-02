import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonHeader, IonIcon, IonImg,
  IonItem, IonItemDivider, IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Categoria} from "../../common/series";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenu, IonList, IonMenuToggle, IonItem, IonIcon, IonLabel, RouterLink, IonImg, IonAvatar, IonItemDivider]
})
export class MenuPage implements OnInit {
  private dataService: DataService = inject(DataService);
  categorias: Categoria[] = [];
  componentes: string[] = []

  constructor() { }


  ngOnInit() {
    this.loadCategorias();
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


}
