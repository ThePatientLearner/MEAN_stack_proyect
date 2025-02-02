import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton, IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonImg, IonList, IonMenu,
  IonMenuButton, IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {MenuPage} from "../menu/menu.page";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonMenuButton, IonButtons, IonMenuToggle, IonButton, IonAvatar, IonImg, IonIcon, IonMenu, IonList, MenuPage, RouterLink]
})
export class HeaderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
