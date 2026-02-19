import { Routes } from '@angular/router';
import { ListaNoticiasComponent } from './components/lista-noticias/lista-noticias';
import { FormularioNoticiaComponent } from './components/formulario-noticia/formulario-noticia';

export const routes: Routes = [
  { path: '', component: ListaNoticiasComponent },

  { path: 'nueva', component: FormularioNoticiaComponent },

  { path: 'editar/:id', component: FormularioNoticiaComponent },

  { path: '**', redirectTo: '' },
];
