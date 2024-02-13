import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealNewPage } from './meal-new.page';

const routes: Routes = [
  {
    path: '',
    component: MealNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealNewPageRoutingModule {}
