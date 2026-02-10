import { Routes } from '@angular/router';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias';
import { FormularioNoticiaComponent } from './components/formulario-noticia/formulario-noticia';

export const routes: Routes = [
  // Ruta para ver la lista (página de inicio)
  { path: '', component: ListaNoticiasComponent },

  // Ruta para el formulario de crear
  { path: 'nueva', component: FormularioNoticiaComponent },

  // Ruta para el formulario de editar (recibe un ID)
  { path: 'editar/:id', component: FormularioNoticiaComponent },

  // Si ponen cualquier otra cosa, vuelve al inicio
  { path: '**', redirectTo: '' },
];
