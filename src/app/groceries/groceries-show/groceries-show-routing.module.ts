import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceriesShowPage } from './groceries-show.page';

const routes: Routes = [
  {
    path: '',
    component: GroceriesShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceriesShowPageRoutingModule {}
