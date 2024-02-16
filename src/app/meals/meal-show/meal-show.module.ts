import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealShowPageRoutingModule } from './meal-show-routing.module';

import { MealShowPage } from './meal-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealShowPageRoutingModule
  ],
  declarations: [MealShowPage]
})
export class MealShowPageModule {}
