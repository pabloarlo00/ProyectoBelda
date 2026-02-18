import { DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonNote,
  IonCardTitle,
  IonCardContent,
  IonText,
} from '@ionic/angular/standalone';
import { Noticia } from 'src/app/common/noticia';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonNote,
    IonCardTitle,
    IonCardContent,
    IonText,
    DatePipe,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardComponent implements OnInit {
  @Input() item!: Noticia;
  constructor() {}

  ngOnInit() {}
}
