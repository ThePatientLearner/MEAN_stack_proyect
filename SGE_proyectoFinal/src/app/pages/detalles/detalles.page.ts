import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonBadge,
  IonButton, IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
  IonCol,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonGrid,
  IonHeader, IonIcon,
  IonImg, IonInput, IonItem, IonLabel, IonModal, IonRange,
  IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {HeaderPage} from "../header/header.page";
import {Serie} from "../../common/series";
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/data.service";
import { register } from 'swiper/element/bundle';
import {ToastService} from "../../services/toast.service";
import {sadOutline} from "ionicons/icons";
register();

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderPage, IonCard, IonGrid, IonRow, IonCol, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonChip, IonLabel, IonText, IonButton, IonModal, IonButtons, ReactiveFormsModule, IonItem, IonInput, IonRange, IonFab, IonFabButton, IonIcon, IonFabList, IonBadge]
})
export class DetallesPage implements OnInit {
  serie?: Serie;
  ratingForm: FormGroup;
  isModalOpen = false;
  puntuacionMedia: number = -1

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder) {
    this.ratingForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
      ]],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.dataService.getOneData(params['id']).subscribe({
          next: (response) => {
            this.serie = response.data;
            this.sacarMediaPuntuacionesSerie();
            console.log(this.serie)
          },
          error: (error) => {
            console.error('Error al cargar la serie:', error);
          }
        });
      }
    });
    console.log("puntuacion media: " + this.puntuacionMedia)

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  sacarMediaPuntuacionesSerie() {
    if (!this.serie?.puntuaciones || this.serie.puntuaciones.length === 0) {
      this.puntuacionMedia = -1;
      return; // asi paro la funcion si no hay puntuaciones o serie
    }

    const arrayLenght = this.serie.puntuaciones.length;
    let sumaPuntuaciones = 0;

    for (let i = 0; i < arrayLenght; i++) {
      sumaPuntuaciones += this.serie.puntuaciones[i].puntuaciones;
    }

    this.puntuacionMedia = sumaPuntuaciones / arrayLenght;
    console.log("Puntuación media: " + this.puntuacionMedia);
  }

  submitRating() {
    if (this.ratingForm.valid && this.serie) {
      const nuevaPuntuacion = {
        email: this.ratingForm.get('email')?.value,
        puntuaciones: this.ratingForm.get('rating')?.value
      };

      if (!this.serie.puntuaciones) {
        this.serie.puntuaciones = [];
      }

      this.serie.puntuaciones.push(nuevaPuntuacion);
      this.serie.numeroCapitulos = 73
      this.dataService.updateMovie(this.serie).subscribe({
        next: (response) => {
          // Recargar los datos de la serie después de la actualización
          this.dataService.getOneData(this.serie!._id).subscribe({
            next: (serieActualizada) => {
              this.serie = serieActualizada.data;
              this.sacarMediaPuntuacionesSerie();
              console.log(this.serie)
              this.setOpen(false);
              this.ratingForm.reset({
                email: '',
                rating: 5
              });
            }
          });
        },
        error: (err) => {
          console.error('Error al actualizar la serie:', err);
        }
      });
    }
  }








  protected readonly indexedDB = indexedDB;
}
