import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  SearchbarCustomEvent,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Noticia, ResNoticia } from 'src/app/common/noticia';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons'; // Importante
import { searchOutline, imageOutline } from 'ionicons/icons';
import { CardComponent } from 'src/app/components/card/card.component';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSearchbar,
    HeaderComponent,
    IonIcon,
    CardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BuscarPage {
  constructor() {
    addIcons({ searchOutline, imageOutline });
  }

  private noticiaService = inject(Service);

  resultados: Noticia[] = [];

  filter(event: SearchbarCustomEvent) {
    const valor = event.detail.value;

    if (valor && valor.length > 0) {
      const termino = valor.toLowerCase();

      this.noticiaService.buscarNoticias(termino).subscribe({
        next: (res: ResNoticia) => {
          if(res.noticias){
            this.resultados = res.noticias;
          }

        },
        error: (err) => console.error(err),
      });
    } else {
      this.clear();
    }
  }

  clear() {
    this.resultados = [];
  }
}
