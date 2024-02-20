import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlannerShowPage } from './planner-show.page';

const routes: Routes = [
  {
    path: '',
    component: PlannerShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlannerShowPageRoutingModule {}
