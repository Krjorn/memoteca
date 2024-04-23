import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListThoughtsComponent } from './components/thoughts/list-thoughts/list-thoughts.component';
import { CreateThoughtComponent } from './components/thoughts/create-thought/create-thought.component';
import { DeleteThoughtComponent } from './components/thoughts/delete-thought/delete-thought.component';
import { EditThoughtComponent } from './components/thoughts/edit-thought/edit-thought.component';

const routes: Routes = [
  {
    path: 'listThoughts',
    component: ListThoughtsComponent
  },
  {
    path: 'createThought',
    component: CreateThoughtComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listThoughts'
  },
  {
    path: 'listThoughts/deleteThought/:id',
    component: DeleteThoughtComponent
  },
  {
    path: 'listThoughts/editThought/:id',
    component: EditThoughtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
