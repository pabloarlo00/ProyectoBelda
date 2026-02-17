import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { MenuComponent } from './components/menu/menu.component';
import { addIcons } from 'ionicons';
import {
  newspaperOutline,
  searchOutline,
  homeOutline,
  arrowBackOutline,
  menuOutline,
} from 'ionicons/icons';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
})
export class AppComponent {
  constructor() {
    addIcons({
      'newspaper-outline': newspaperOutline,
      'search-outline': searchOutline,
      'home-outline': homeOutline,
      'arrow-back-outline': arrowBackOutline,
      'menu-outline': menuOutline,
    });
  }
}
