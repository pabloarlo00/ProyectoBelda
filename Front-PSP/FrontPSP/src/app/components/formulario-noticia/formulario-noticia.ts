import { Component, OnInit, inject } from '@angular/core';
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

  seccionesConIconos: { nombre: string; icono: string }[] = [];
  filtroIcono: string = '';
  crearNuevaSeccion: boolean = false;
  iconosBootstrap: string[] = [
    'bi-newspaper',
    'bi-cpu',
    'bi-database',
    'bi-code-slash',
    'bi-terminal',
    'bi-laptop',
    'bi-graph-up',
    'bi-gear',
    'bi-award',
    'bi-book',
    'bi-bug',
    'bi-camera',
    'bi-chat-dots',
    'bi-cloud',
    'bi-controller',
    'bi-display',
    'bi-envelope',
    'bi-file-earmark-code',
    'bi-globe',
    'bi-hash',
    'bi-image',
  ];
  public form: FormGroup = this.fb.group({
    _id: [null],
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    subtitulo: [''],
    contenido: ['', Validators.required],
    autor: ['', Validators.required],
    seccion: ['', Validators.required],
    iconoSeccion: ['', Validators.required],
    imagenes: this.fb.array([], [Validators.required, Validators.minLength(3)]),
  });

  get imagenes() {
    return this.form.get('imagenes') as FormArray;
  }

  ngOnInit(): void {
    this.cargarSecciones();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noticiaService.getOne(id).subscribe((noticia) => {
        noticia.imagenes.forEach(() => this.agregarImagen());
        this.form.patchValue(noticia);
      });
    } else {
      for (let i = 0; i < 3; i++) {
        this.agregarImagen();
      }
    }
  }

  get iconosFiltrados() {
    return this.iconosBootstrap.filter((icon) =>
      icon.toLowerCase().includes(this.filtroIcono.toLowerCase()),
    );
  }

  seleccionarIcono(nombre: string) {
    this.form.patchValue({ iconoSeccion: nombre });
    this.filtroIcono = ''; // Limpiamos la búsqueda tras elegir
  }
  cargarSecciones() {
    this.noticiaService.getAll().subscribe((noticias) => {
      const mapa = new Map();
      noticias.forEach((n) => {
        if (!mapa.has(n.seccion)) {
          mapa.set(n.seccion, n.iconoSeccion);
        }
      });
      this.seccionesConIconos = Array.from(mapa, ([nombre, icono]) => ({ nombre, icono }));
    });
  }

  alCambiarSeccion(event: any) {
    const seccionSeleccionada = event.target.value;
    const encontrado = this.seccionesConIconos.find((s) => s.nombre === seccionSeleccionada);
    if (encontrado) {
      this.form.patchValue({ iconoSeccion: encontrado.icono });
    }
  }

  toggleNuevaSeccion() {
    this.crearNuevaSeccion = !this.crearNuevaSeccion;
    this.form.patchValue({
      seccion: '',
      iconoSeccion: '',
    });
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

    if (!noticiaParaEnviar._id) {
      delete noticiaParaEnviar._id;
    }

    if (noticiaParaEnviar._id) {
      this.noticiaService.actualizar(noticiaParaEnviar._id, noticiaParaEnviar).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.noticiaService.crear(noticiaParaEnviar).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  imgError(event: any) {
    event.target.src = 'images/placeholder.png';
    event.target.classList.add('opacity-50');
  }
  volver(): void {
    this.location.back();
  }
}
