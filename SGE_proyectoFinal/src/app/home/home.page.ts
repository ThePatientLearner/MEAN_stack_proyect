import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList
} from '@ionic/angular/standalone';
import {DomSanitizer} from "@angular/platform-browser";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, RouterLink],
  standalone: true
})
export class HomePage {


  constructor() {}

}
