import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  LoadingController,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonBadge,
  IonNote,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Noticia } from 'src/app/common/noticia';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonBadge,
    IonNote,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class PrincipalPage implements OnInit {
  private noticiaService: Service = inject(Service);

  notices: Noticia[] = [];

  constructor(private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.loadAllNotices();
  }

  async loadAllNotices(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando noticias...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.noticiaService.getAllNotices().subscribe({
      next: (noticias) => {
        console.log('Noticias cargadas:', noticias);
        loading.dismiss();
        this.notices.push(...noticias);
        event?.target.complete();
        if (event) {
          event.target.disabled = true;
        }
      },
      error: (error) => {
        console.error('Error al cargar las noticias:', error);
        loading.dismiss();
      },

      complete: () => {
        console.log('Carga de noticias completada');
      },
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.loadAllNotices(event);
  }
}
