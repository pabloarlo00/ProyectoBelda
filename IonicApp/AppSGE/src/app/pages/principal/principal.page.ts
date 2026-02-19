import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  LoadingController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Noticia, ResNoticia } from 'src/app/common/noticia';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from 'src/app/components/card/card.component';
import { addIcons } from 'ionicons';
import { search } from 'ionicons/icons';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CardComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrincipalPage implements OnInit {
  private noticiaService: Service = inject(Service);

  notices: Noticia[] = [];
  currentPage = 1;
  constructor(private loadingCtrl: LoadingController) {
    addIcons({
      search,
    });
  }

  ngOnInit() {
    this.loadAllNotices();
  }

  async loadAllNotices(event?: InfiniteScrollCustomEvent) {
    let loading: HTMLIonLoadingElement | null = null;
    if (!event) {
      loading = await this.loadingCtrl.create({
        message: 'Cargando noticias...',
        spinner: 'bubbles',
      });
      await loading.present();
    }

    this.noticiaService.getAllNotices(this.currentPage).subscribe({
      next: (res: ResNoticia) => {
        if (loading) loading.dismiss();

        if (res.noticias) {
          this.notices.push(...res.noticias);
          event?.target.complete();
          if (res.noticias.length < 5 && event) {
            event.target.disabled = true;
          }
        }
      },
      error: (error) => {
        if (loading) loading.dismiss();
        console.error('Error:', error);
      },
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadAllNotices(event);
  }
}
