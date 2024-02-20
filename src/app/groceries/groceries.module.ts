import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceriesPageRoutingModule } from './groceries-routing.module';

import { GroceriesPage } from './groceries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceriesPageRoutingModule
  ],
  declarations: [GroceriesPage]
})
export class GroceriesPageModule {}
