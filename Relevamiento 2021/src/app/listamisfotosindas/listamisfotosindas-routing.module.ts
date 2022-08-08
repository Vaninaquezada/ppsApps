import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListamisfotosindasPage } from './listamisfotosindas.page';

const routes: Routes = [
  {
    path: '',
    component: ListamisfotosindasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListamisfotosindasPageRoutingModule {}
