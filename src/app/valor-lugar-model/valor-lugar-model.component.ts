import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-valor-lugar-modal',
  standalone: true,
  templateUrl: './valor-lugar-model.component.html',
  styleUrls: ['./valor-lugar-model.component.scss'],
  imports: [IonicModule,FormsModule,CommonModule]
})
export class ValorLugarModalComponent  implements OnInit {
  @Input() lugar:any;
  precioActual:number = 0; 


  constructor(private modalController:ModalController) { }

  ngOnInit() {
    this.precioActual = this.lugar.precio
  }

  cerrarModal(){
    this.modalController.dismiss();
  }
  cambiarPrecio(){
    this.modalController.dismiss({nuevoPrecio:this.precioActual});
  }
}