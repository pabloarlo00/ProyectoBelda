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
  bookOutline,
  cameraOutline,
  chatbubblesOutline,
  codeSlashOutline,
  gameControllerOutline,
  globeOutline,
  hardwareChipOutline,
  imageOutline,
  mailOutline,
  serverOutline,
  settingsOutline,
  terminalOutline,
  trendingUpOutline,
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
      'hardware-chip-outline': hardwareChipOutline,
      'server-outline': serverOutline,
      'code-slash-outline': codeSlashOutline,
      'terminal-outline': terminalOutline,
      'globe-outline': globeOutline,
      'image-outline': imageOutline,
      'trending-up-outline': trendingUpOutline,
      'settings-outline': settingsOutline,
      'book-outline': bookOutline,
      'camera-outline': cameraOutline,
      'chatbubbles-outline': chatbubblesOutline,
      'game-controller-outline': gameControllerOutline,
      'mail-outline': mailOutline,
    });
  }
}
