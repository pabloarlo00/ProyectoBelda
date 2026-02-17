import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  LoadingController,
  IonCard,
  IonCardHeader,
  IonBadge,
  IonNote,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  NavController,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Noticia } from 'src/app/common/noticia';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonBadge,
    IonNote,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrincipalPage implements OnInit {
  private noticiaService: Service = inject(Service);

  notices: Noticia[] = [];

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) {}

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
