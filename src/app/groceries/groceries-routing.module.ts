import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceriesPage } from './groceries.page';

const routes: Routes = [
  {
    path: '',
    component: GroceriesPage,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./groceries-new/groceries-new.module').then(
        (m) => m.GroceriesNewPageModule
      ),
  },
  {
    path: 'show/:id',
    loadChildren: () =>
      import('./groceries-show/groceries-show.module').then(
        (m) => m.GroceriesShowPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceriesPageRoutingModule {}
