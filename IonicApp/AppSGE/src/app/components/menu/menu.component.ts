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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Service } from '../../services/service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    IonList,
    IonMenu,
    IonMenuToggle,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonIcon,
    IonLabel,
    IonItem,
    RouterLink,
  ],
})
export class MenuComponent implements OnInit {
  private dataService = inject(Service);

  componentes: any[] = [
    { nombre: 'Noticias', ruta: '/principal', icono: 'newspaper-outline' },
    { nombre: 'Buscar', ruta: '/buscar', icono: 'search-outline' },
  ];

  ngOnInit() {
    // Aquí podrías cargar los componentes desde un JSON si lo prefieres [cite: 422, 425]
  }
}
