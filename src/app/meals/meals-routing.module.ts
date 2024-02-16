import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./meal-new/meal-new.module').then((m) => m.MealNewPageModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./meal-edit/meal-edit.module').then((m) => m.MealEditPageModule),
  },
  {
    path: 'meal-new',
    loadChildren: () =>
      import('./meal-new/meal-new.module').then((m) => m.MealNewPageModule),
  },
  {
    path: 'show/:id',
    loadChildren: () =>
      import('./meal-show/meal-show.module').then((m) => m.MealShowPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
