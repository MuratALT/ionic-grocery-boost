import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlannerNewPageRoutingModule } from './planner-new-routing.module';

import { PlannerNewPage } from './planner-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlannerNewPageRoutingModule
  ],
  declarations: [PlannerNewPage]
})
export class PlannerNewPageModule {}
