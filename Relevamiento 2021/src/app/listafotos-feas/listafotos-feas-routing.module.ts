import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListafotosFeasPage } from './listafotos-feas.page';

const routes: Routes = [
  {
    path: '',
    component: ListafotosFeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListafotosFeasPageRoutingModule {}
