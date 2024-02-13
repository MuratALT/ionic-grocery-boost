import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealNewPageRoutingModule } from './meal-new-routing.module';

import { MealNewPage } from './meal-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealNewPageRoutingModule
  ],
  declarations: [MealNewPage]
})
export class MealNewPageModule {}
