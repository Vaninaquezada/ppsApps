import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficoFeoPageRoutingModule } from './grafico-feo-routing.module';

import { GraficoFeoPage } from './grafico-feo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficoFeoPageRoutingModule
  ],
  declarations: [GraficoFeoPage]
})
export class GraficoFeoPageModule {}
