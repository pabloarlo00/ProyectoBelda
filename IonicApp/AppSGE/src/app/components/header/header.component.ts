import { Component, model, ModelSignal } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonAvatar,
  IonMenuButton,
  IonImg,

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonAvatar,
    IonMenuButton,
    IonImg,
  ],
})
export class HeaderComponent {
  constructor(private navCtrl: NavController) {}

  irAlInicio() {
    this.navCtrl.navigateRoot('/principal');
  }
}
