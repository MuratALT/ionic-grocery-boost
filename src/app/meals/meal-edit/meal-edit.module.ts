import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealEditPageRoutingModule } from './meal-edit-routing.module';

import { MealEditPage } from './meal-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealEditPageRoutingModule
  ],
  declarations: [MealEditPage]
})
export class MealEditPageModule {}
