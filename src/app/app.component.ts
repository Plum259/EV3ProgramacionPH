import { Component} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MapServiceService } from './Servicios/map-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {defineCustomElements} from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,HttpClientModule,FormsModule],
})
export class AppComponent{
  constructor() {}
  
}
defineCustomElements(window)