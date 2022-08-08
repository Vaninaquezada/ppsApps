import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoFeoPage } from './grafico-feo.page';

const routes: Routes = [
  {
    path: '',
    component: GraficoFeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficoFeoPageRoutingModule {}
