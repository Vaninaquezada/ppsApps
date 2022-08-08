import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListafotosLindasPage } from './listafotos-lindas.page';

const routes: Routes = [
  {
    path: '',
    component: ListafotosLindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListafotosLindasPageRoutingModule {}
