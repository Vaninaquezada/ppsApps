import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListamisfotosfeasPage } from './listamisfotosfeas.page';

const routes: Routes = [
  {
    path: '',
    component: ListamisfotosfeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListamisfotosfeasPageRoutingModule {}
