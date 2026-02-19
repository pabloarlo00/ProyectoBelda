import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Noticia, ResNoticia, Seccion } from 'src/app/common/noticia';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardComponent } from 'src/app/components/card/card.component';
import {
  add,
  bookOutline,
  cameraOutline,
  chatbubblesOutline,
  codeSlashOutline,
  gameControllerOutline,
  globeOutline,
  hardwareChipOutline,
  imageOutline,
  mailOutline,
  newspaperOutline,
  personCircleOutline,
  search,
  serverOutline,
  settingsOutline,
  terminalOutline,
  trendingUpOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    HeaderComponent,
    CardComponent,
    IonIcon,
    IonFab,
    IonFabButton,
    RouterLink,
  ],
})
export class SeccionesPage implements OnInit {
  private noticiaService = inject(Service);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);

  @Input() categoria!: string;

  notices: Noticia[] = [];
  seccionesDisponibles: Seccion[] = [];
  currentPage = 1;
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
      search: search,
      add: add,
    });
  }

  ngOnInit() {
    this.noticiaService.getSecciones().subscribe({
      next: (res: ResNoticia) => {
        if (res.secciones) {
          this.seccionesDisponibles = res.secciones;
          if (!this.categoria && res.secciones.length > 0) {
            this.updateQueryParam(res.secciones[0].nombre);
          }
        }
      },
      error: (err) => console.error('Error cargando secciones', err),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoria'] && changes['categoria'].currentValue) {
      this.resetAndLoad();
    }
  }

  private resetAndLoad() {
    this.notices = [];
    this.currentPage = 1;
    this.fetchData();
  }

  async fetchData(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles',
    });

    if (!event) await loading.present();

    this.noticiaService
      .getNoticiasBySeccion(this.categoria, this.currentPage)
      .subscribe({
        next: (res: ResNoticia) => {
          if (!event) loading.dismiss();

          if (res.status && res.noticias) {
            this.notices.push(...res.noticias);

            event?.target.complete();

            if (res.noticias?.length < 10 && event) {
              event.target.disabled = true;
            }
          }
        },
        error: (err) => {
          if (!event) loading.dismiss();
          console.error('Error fetching data:', err);
        },
      });
  }

  segmentChanged(event: any) {
    const newCategory = event.detail.value;
    if (newCategory) {
      this.updateQueryParam(newCategory);
    }
  }

  private updateQueryParam(cat: string) {
    this.router.navigate([], {
      queryParams: { categoria: cat },
      queryParamsHandling: 'merge',
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.fetchData(event);
  }
}
