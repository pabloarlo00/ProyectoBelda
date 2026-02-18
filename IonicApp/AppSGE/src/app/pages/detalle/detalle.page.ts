import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Service } from 'src/app/services/service';
import { Noticia } from 'src/app/common/noticia';
import { ToastService } from 'src/app/services/toast';
import { HeaderComponent } from 'src/app/components/header/header.component';
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
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonList,
    IonListHeader,
    IonAvatar,
    IonImg,
    IonIcon,
    IonChip,
    IonNote,
    IonAccordion,
    IonAccordionGroup,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallePage {
  private noticiaService: Service = inject(Service);
  private toastCtrl: ToastService = inject(ToastService);
  @ViewChild(IonModal) modal!: IonModal;
  noticia?: Noticia;
  isModalOpen = false;
  nuevoComentario = { nombre: '', email: '', comentario: '' };

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

  @Input() set id(noticiaId: string) {
    this.noticiaService.getNoticiaById(noticiaId).subscribe((data) => {
      this.noticia = data;
    });
  }

  setOpen(open: boolean) {
    this.isModalOpen = open;
  }

  confirmar() {
    const datosFormulario: any = this.nuevoComentario;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      datosFormulario.nombre &&
      datosFormulario.nombre.length >= 3 &&
      datosFormulario.email &&
      emailRegex.test(datosFormulario.email) &&
      datosFormulario.comentario &&
      datosFormulario.comentario.length >= 2
    ) {
      this.modal.dismiss(datosFormulario, 'confirm');
    } else {
      this.toastCtrl.show('Error: Datos no válidos', 'danger');
    }
  }
  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }
  onWillDismiss(event: any) {
    if (event.detail.role === 'confirm') {
      const datosRecibidos = event.detail.data;
      const idNoticia = this.noticia?._id;

      if (idNoticia) {
        this.noticiaService
          .postComentario(idNoticia, datosRecibidos)
          .subscribe({
            next: (noticiaActualizada) => {
              this.noticia = noticiaActualizada;
              this.toastCtrl.show(
                'Comentario guardado en el servidor!',
                'success',
              );
            },
            error: (err) => {
              this.toastCtrl.show(
                'Error al conectar con el servidor',
                'danger',
              );
              console.error(err);
            },
          });
      }
      this.nuevoComentario = { nombre: '', email: '', comentario: '' };
    }
  }
}
