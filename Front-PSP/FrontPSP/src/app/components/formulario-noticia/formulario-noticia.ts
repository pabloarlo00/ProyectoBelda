import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticiasService';
import { ResNoticia } from '../../common/noticia';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './formulario-noticia.html',
})
export class FormularioNoticiaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private noticiaService = inject(NoticiaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  seccionesConIconos: any[] = [];
  filtroIcono: string = '';
  crearNuevaSeccion: boolean = false;

  iconosData = [
    { label: 'Noticias', web: 'bi-newspaper', app: 'newspaper-outline' },
    { label: 'Tecnología', web: 'bi-cpu', app: 'hardware-chip-outline' },
    { label: 'Base de Datos', web: 'bi-database', app: 'server-outline' },
    { label: 'Código', web: 'bi-code-slash', app: 'code-slash-outline' },
    { label: 'Terminal', web: 'bi-terminal', app: 'terminal-outline' },
    { label: 'Mundo', web: 'bi-globe', app: 'globe-outline' },
    { label: 'Imagen', web: 'bi-image', app: 'image-outline' },
    { label: 'Gráficos', web: 'bi-graph-up', app: 'trending-up-outline' },
    { label: 'Ajustes', web: 'bi-gear', app: 'settings-outline' },
    { label: 'Educación', web: 'bi-book', app: 'book-outline' },
    { label: 'Cámara', web: 'bi-camera', app: 'camera-outline' },
    { label: 'Mensajes', web: 'bi-chat-dots', app: 'chatbubbles-outline' },
    { label: 'Juegos', web: 'bi-controller', app: 'game-controller-outline' },
    { label: 'Email', web: 'bi-envelope', app: 'mail-outline' }
  ];

  public form: FormGroup = this.fb.group({
    _id: [null],
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    subtitulo: [''],
    contenido: ['', Validators.required],
    autor: ['', Validators.required],
    seccion: this.fb.group({
      nombre: ['', Validators.required],
      iconoWeb: ['', Validators.required],
      iconoApp: ['', Validators.required]
    }),
    imagenes: this.fb.array([], [Validators.required, Validators.minLength(3)]),
  });

  get imagenes() {
    return this.form.get('imagenes') as FormArray;
  }
@Input() set id(noticiaId: string) {
    if (noticiaId) {
      this.cargarNoticia(noticiaId);
    }
  }
ngOnInit(): void {
    this.cargarSecciones();
    
    if (!this.form.get('_id')?.value) {
      for (let i = 0; i < 3; i++) {
        this.agregarImagen();
      }
    }
  }

cargarNoticia(id: string) {
  this.noticiaService.getOne(id).subscribe({
    next: (res: ResNoticia) => {
      this.imagenes.clear();
      if(res.noticia){
      if (res.noticia.imagenes && res.noticia.imagenes.length > 0) {
        res.noticia.imagenes.forEach(() => this.agregarImagen());
      } else {
        for (let i = 0; i < 3; i++) this.agregarImagen();
      }
      this.form.patchValue(res.noticia);

      console.log('Noticia cargada con éxito:', res.noticia);
      }

    },
    error: (err) => {
      console.error('Error al cargar la noticia:', err);
    }
  });
}
  get iconosFiltrados() {
    return this.iconosData.filter((icon) =>
      icon.label.toLowerCase().includes(this.filtroIcono.toLowerCase()) ||
      icon.web.toLowerCase().includes(this.filtroIcono.toLowerCase())
    );
  }

  seleccionarIcono(iconObj: any) {
    this.form.get('seccion')?.patchValue({
      iconoWeb: iconObj.web,
      iconoApp: iconObj.app
    });
    this.filtroIcono = '';
  }

  cargarSecciones() {
    this.noticiaService.getAll().subscribe((res: ResNoticia) => {
      const mapa = new Map();
      if(res.noticias){
      res.noticias.forEach((n) => {
        if (n.seccion && !mapa.has(n.seccion.nombre)) {
          mapa.set(n.seccion.nombre, n.seccion);
        }
      });
      }

      this.seccionesConIconos = Array.from(mapa.values());
    });
  }

  alCambiarSeccion(event: any) {
    const nombreSeccion = event.target.value;
    const encontrado = this.seccionesConIconos.find((s) => s.nombre === nombreSeccion);
    if (encontrado) {
      this.form.get('seccion')?.patchValue(encontrado);
    }
  }

  toggleNuevaSeccion() {
    this.crearNuevaSeccion = !this.crearNuevaSeccion;
    this.form.get('seccion')?.reset({ nombre: '', iconoWeb: '', iconoApp: '' });
  }

  agregarImagen(): void {
    this.imagenes.push(this.fb.control('', Validators.required));
  }

  quitarImagen(index: number): void {
    this.imagenes.removeAt(index);
  }

  guardar(): void {
    if (this.form.invalid) return;
    const noticiaParaEnviar = this.form.value;
    if (!noticiaParaEnviar._id) delete noticiaParaEnviar._id;

    const action = noticiaParaEnviar._id 
      ? this.noticiaService.actualizar(noticiaParaEnviar._id, noticiaParaEnviar)
      : this.noticiaService.crear(noticiaParaEnviar);

    action.subscribe(() => this.router.navigate(['/']));
  }

  imgError(event: any) {
    event.target.src = 'assets/images/placeholder.png';
  }

  volver(): void {
    this.location.back();
  }
}