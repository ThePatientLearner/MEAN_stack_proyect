import {inject, Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastCtrl = inject(ToastController);

  constructor() { }

  async puntuacionToastBien(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'success'
    });
    await toast.present();
  }

  async puntuacionToastMal(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'danger'
    });
    await toast.present();
  }
}
