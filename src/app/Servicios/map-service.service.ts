import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  private apiUrl = 'http://api.opentripmap.com/0.1'
  private apiKey = '5ae2e3f221c38a28845f05b6fc3fe9fe8b36ba04a5ce0f9adad8a075'
  private radio = 100000000
  constructor() { }

  async obtenerLugares(query:string,lat:number,lon:number){
    const url = `${this.apiUrl}/en/places/autosuggest?kinds=interesting_places&name=${query}&radius=${this.radio}&lon=${lon}&lat=${lat}&apikey=${this.apiKey}`

    try {
      const response = await Http.request({
        method:'GET',
        url:url
      });
      return response.data;
    } catch (error){
      new Error('Error al obtener los lugares' + error);
    }
  }
  async obtenerImagenLugar(xid:string){
    const urlDetalles = `${this.apiUrl}/en/places/xid/${xid}?apikey=${this.apiKey}`;
    try {
      const respuesta = await Http.request({
        method:'GET',
        url:urlDetalles
      });
      return respuesta.data.preview?.source;
    } catch (error){
      console.error('Error al obtener la imagen del lugar',error)
    }
  }
}
