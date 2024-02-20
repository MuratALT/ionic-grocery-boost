import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlannerShowPageRoutingModule } from './planner-show-routing.module';

import { PlannerShowPage } from './planner-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlannerShowPageRoutingModule
  ],
  declarations: [PlannerShowPage]
})
export class PlannerShowPageModule {}
