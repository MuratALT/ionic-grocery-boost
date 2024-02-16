import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealEditPage } from './meal-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MealEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealEditPageRoutingModule {}
