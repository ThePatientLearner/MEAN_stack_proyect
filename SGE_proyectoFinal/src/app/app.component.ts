import { Component } from '@angular/core';
import {IonApp, IonMenu, IonRouterOutlet, MenuController} from '@ionic/angular/standalone';
import {TabsPage} from "./pages/tabs/tabs.page";
import {addIcons} from "ionicons";
import {
  add, calendarOutline,
  chevronBackOutline,
  createOutline,
  folderOpen, logoFacebook, logoGithub,
  menuOutline,
  search,
  trashOutline,
  videocam
} from "ionicons/icons";
import {MenuPage} from "./pages/menu/menu.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TabsPage, IonMenu, MenuPage],
  standalone: true
})
export class AppComponent {
  constructor(private menuCtrl: MenuController) {
    addIcons({videocam,folderOpen,search,trashOutline,createOutline,menuOutline,add,chevronBackOutline,calendarOutline,logoGithub,logoFacebook})
  }
}
