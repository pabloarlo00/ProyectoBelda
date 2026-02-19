import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticiasService';
import { Noticia, ResNoticia } from '../../common/noticia';

@Component({
  selector: 'app-lista-noticias',
  standalone: true,
  // Importamos CommonModule para los pipes como | date y RouterModule para los enlaces
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-noticias.html',
  styleUrl: './lista-noticias.css',
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaSeleccionada: Noticia | null = null;

  // Inyectamos el servicio de forma moderna
  private noticiaService = inject(NoticiaService);

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.noticiaService.getAll().subscribe({
      next: (res: ResNoticia) => {
        if(res.noticias){
        this.noticias = res.noticias;
        }

        console.log('Noticias cargadas con éxito:', this.noticias);
      },
      error: (err) => {
        console.error('Error al conectar con la API:', err);
      },
    });
  }

  prepararBorrado(noticia: Noticia): void {
    this.noticiaSeleccionada = noticia;
  }

  confirmarEliminar(): void {
    if (this.noticiaSeleccionada && this.noticiaSeleccionada._id) {
      this.noticiaService.borrar(this.noticiaSeleccionada._id).subscribe({
        next: () => {
          this.noticias = this.noticias.filter((n) => n._id !== this.noticiaSeleccionada?._id);
          this.noticiaSeleccionada = null;
          console.log('Noticia eliminada correctamente');
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }
}
