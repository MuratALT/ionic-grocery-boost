import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceriesShowPageRoutingModule } from './groceries-show-routing.module';

import { GroceriesShowPage } from './groceries-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceriesShowPageRoutingModule
  ],
  declarations: [GroceriesShowPage]
})
export class GroceriesShowPageModule {}
