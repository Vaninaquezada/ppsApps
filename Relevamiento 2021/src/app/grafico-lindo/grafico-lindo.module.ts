import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoLindoPageRoutingModule } from './grafico-lindo-routing.module';

import { GraficoLindoPage } from './grafico-lindo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoLindoPageRoutingModule
  ],
  declarations: [GraficoLindoPage]
})
export class GraficoLindoPageModule {}
