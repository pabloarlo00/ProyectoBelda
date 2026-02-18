import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonNote,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Noticia } from 'src/app/common/noticia';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CardComponent } from 'src/app/components/card/card.component';

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
  ],
})
export class SeccionesPage implements OnInit {
  private noticiaService = inject(Service);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);

  @Input() categoria!: string;

  notices: Noticia[] = [];
  seccionesDisponibles: any[] = [];
  currentPage = 1;
  constructor() {}

  ngOnInit() {
    this.noticiaService.getSecciones().subscribe({
      next: (secciones) => {
        this.seccionesDisponibles = secciones;
        // Si entramos sin categoría, navegamos a la primera disponible [cite: 529]
        if (!this.categoria && secciones.length > 0) {
          this.updateQueryParam(secciones[0]);
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
        next: (res) => {
          if (!event) loading.dismiss(); // [cite: 241]

          this.notices.push(...res); // Concatenación con spread operator [cite: 242]

          event?.target.complete(); // Finalizar animación de scroll [cite: 243, 277]

          // Desactivar scroll si no hay más datos [cite: 245, 283]
          if (res.length < 10 && event) {
            event.target.disabled = true;
          }
        },
        error: (err) => {
          if (!event) loading.dismiss();
          console.error('Error fetching data:', err); // [cite: 252, 652]
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
      queryParamsHandling: 'merge', // [cite: 543]
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.fetchData(event);
  }
}
