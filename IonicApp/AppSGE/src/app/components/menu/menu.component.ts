import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonToolbar,
  IonAvatar,
  IonImg,
} from '@ionic/angular/standalone';
import { Service } from '../../services/service';
import { ResNoticia } from 'src/app/common/noticia';
import { addIcons } from 'ionicons';
import {
  newspaperOutline,
  hardwareChipOutline,
  serverOutline,
  codeSlashOutline,
  terminalOutline,
  globeOutline,
  imageOutline,
  trendingUpOutline,
  settingsOutline,
  bookOutline,
  cameraOutline,
  chatbubblesOutline,
  gameControllerOutline,
  mailOutline,
  personCircleOutline,
  add,
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonList,
    IonMenu,
    IonMenuToggle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    IonLabel,
    IonItem,
    RouterLink,
    IonAvatar,
    IonImg,
  ],
})
export class MenuComponent implements OnInit {
  private dataService = inject(Service);

  constructor() {
    addIcons({
      'newspaper-outline': newspaperOutline,
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
      'person-circle-outline': personCircleOutline,
      add: add,
    });
  }
  componentes: any[] = [];

  ngOnInit() {
    this.cargarMenu();
  }
  cargarMenu() {
    this.componentes = [
      { nombre: 'INICIO', ruta: '/principal', icono: 'home-outline' },
    ];

    this.dataService.getSecciones().subscribe({
      next: (res: ResNoticia) => {
        if (res.status && res.secciones) {
          res.secciones.forEach((sec: any) => {
            this.componentes.push({
              nombre: sec.nombre,
              ruta: '/secciones',
              queryParams: { categoria: sec.nombre },
              icono: sec.iconoApp,
            });
          });
        }
      },

      error: (err) =>
        console.error('Error al cargar las secciones en el menu', err),
    });
  }
}
