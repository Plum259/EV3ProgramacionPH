import { Component,OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapServiceService } from '../Servicios/map-service.service';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { ValorLugarModalComponent } from '../valor-lugar-model/valor-lugar-model.component';
import { CamaraComponent } from '../camara/camara.component';
import { Preferences } from '@capacitor/preferences';

interface Lugar {
  properties:{
    xid:string
    name:string
  }
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,ValorLugarModalComponent],
})
export class HomePage implements OnInit{
  lugaresEncontrados: any[] = [];
  lugaresConImagen:any[] = [];
  lugaresInicio:any[] = [];
  constructor(private Mapa:MapServiceService,private modalController:ModalController) {}

  async guardarInicio(){
    const lugaresString = JSON.stringify(this.lugaresInicio);
    await Preferences.set({
      key:'lugaresInicio',
      value:lugaresString,
    });
  }
  async cargarInicio(){
    const {value} = await Preferences.get({key: 'lugaresInicio'});
    this.lugaresInicio = value ? JSON.parse(value) : [];
  }

  buscarLugares(event:any){
    const query = event.target.value;
    const latitud = -33.45001087796459 
    const longitud = -70.66559690421072
    this.Mapa.obtenerLugares(query, latitud, longitud).then(async data => {
      const promesas = data.features.map(async (lugar:Lugar)=> {
        const imagenUrl = await this.Mapa.obtenerImagenLugar(lugar.properties.xid);
        return {...lugar,imagenUrl};
      });
      const lugaresConDetalle = await Promise.all(promesas);
      this.lugaresConImagen = lugaresConDetalle
        .filter(lugar => lugar.imagenUrl)
        .slice(0,10);
      this.lugaresEncontrados = this.lugaresConImagen;
      console.log(this.lugaresEncontrados);
    }).catch(error => {
      console.error('Error cargando los lugares',error);
    });
    this.lugaresEncontrados = this.lugaresEncontrados.map(lugar => ({...lugar,
    precio:0}));
  }
  agregarAInicio(lugar:any){
    if (!this.lugaresInicio.find(l => l.properties.xid === lugar.properties.xid)){
      this.lugaresInicio.push({...lugar, precio:lugar.precio || 0})
    }
  }
  async cambiarPrecio(lugar:any){
    const modal = await this.modalController.create({
      component:ValorLugarModalComponent,
      componentProps: {lugar:lugar}
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data?.nuevoPrecio){
      const lugarIndice = this.lugaresInicio.findIndex(l => l.properties.xid === lugar.properties.xid);
      if (lugarIndice !== -1) {
        this.lugaresInicio[lugarIndice].precio = data.nuevoPrecio;
      }
    }

  }
  async cambiarFoto(lugar:any){
    const modal = await this.modalController.create({
      component:CamaraComponent,
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data?.foto){
      const lugarIndice = this.lugaresInicio.findIndex(l => l.properties.xid === lugar.properties.xid);
      if (lugarIndice !== -1) {
        this.lugaresInicio[lugarIndice].imagenUrl = data.foto;
      }
    }
  }
  eliminarDeInicio(lugar:any){
    this.lugaresInicio = this.lugaresInicio.filter(l => l.properties.xid !== lugar.properties.xid);
  }
  ngOnInit(){
    this.cargarInicio();
  }
}

