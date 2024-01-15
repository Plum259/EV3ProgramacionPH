import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Camera, Photo, CameraResultType} from '@capacitor/camera'
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule,FormsModule]
})
export class CamaraComponent  implements OnInit {
  foto:Photo|null = null
  constructor(private modalController:ModalController) { }

  ngOnInit() {}
  async tomarFoto(){
    this.foto = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation:true
    });
  }
  confirmarFoto(){
    if (this.foto){
      this.modalController.dismiss({foto:this.foto.webPath});
    } else {
      this.modalController.dismiss();
    }
  }
  cerrarModalSinFoto(){
    this.modalController.dismiss();
  }
}