import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor( private alertController: AlertController,
               private toastController: ToastController) { }


  async alertaInformativa( mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      buttons: [{
        text: 'CERRAR',
        role: 'cancel'
      }]
    });
    toast.present();
  }
}
