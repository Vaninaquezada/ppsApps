import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoLindoPage } from './grafico-lindo.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoLindoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoLindoPageRoutingModule {}
