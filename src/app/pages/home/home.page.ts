import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [NFC, Ndef]
})
export class HomePage {
  idNFC: string;
  techTypes: string;

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.cekAndroidNFC();
  }

  cekAndroidNFC() {
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.nfc.readerMode(flags).subscribe((tag) => {
      let tagStringify = JSON.stringify(tag);
      
      this.idNFC = JSON.stringify(tag.id);
      this.techTypes = JSON.stringify(tag.techTypes);

      this.presentToastWithOptions(tagStringify);
    });
  }

  async presentToast(params) {
    const toast = await this.toastCtrl.create({
      message: params,
      duration: 2000,
    });
    toast.present();
  }

  async presentToastWithOptions(params) {
    const toast = await this.toastCtrl.create({
      header: 'Reading NFC',
      message: params,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
}
