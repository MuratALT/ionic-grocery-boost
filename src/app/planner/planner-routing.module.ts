import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlannerPage } from './planner.page';

const routes: Routes = [
  {
    path: '',
    component: PlannerPage,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./planner-new/planner-new.module').then(
        (m) => m.PlannerNewPageModule
      ),
  },
  {
    path: 'show/:id',
    loadChildren: () =>
      import('./planner-show/planner-show.module').then(
        (m) => m.PlannerShowPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlannerPageRoutingModule {}
