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
    path: 'meal-new',
    loadChildren: () => import('./meal-new/meal-new.module').then( m => m.MealNewPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
