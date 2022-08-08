import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListafotosFeasPageRoutingModule } from './listafotos-feas-routing.module';

import { ListafotosFeasPage } from './listafotos-feas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListafotosFeasPageRoutingModule
  ],
  declarations: [ListafotosFeasPage]
})
export class ListafotosFeasPageModule {}
