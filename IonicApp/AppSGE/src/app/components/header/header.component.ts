import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonAvatar,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonAvatar,
    IonMenuButton,
  ],
})
export class HeaderComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  irAlInicio() {
    this.navCtrl.navigateRoot('/home'); // Te manda al inicio y limpia el historial
  }
}
