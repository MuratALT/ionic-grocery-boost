import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealShowPage } from './meal-show.page';

const routes: Routes = [
  {
    path: '',
    component: MealShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealShowPageRoutingModule {}
