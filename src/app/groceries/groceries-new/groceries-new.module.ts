import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceriesNewPageRoutingModule } from './groceries-new-routing.module';

import { GroceriesNewPage } from './groceries-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceriesNewPageRoutingModule
  ],
  declarations: [GroceriesNewPage]
})
export class GroceriesNewPageModule {}
