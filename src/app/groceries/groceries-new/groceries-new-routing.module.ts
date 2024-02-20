import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceriesNewPage } from './groceries-new.page';

const routes: Routes = [
  {
    path: '',
    component: GroceriesNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceriesNewPageRoutingModule {}
