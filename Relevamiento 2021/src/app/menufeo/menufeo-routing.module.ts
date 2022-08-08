import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenufeoPage } from './menufeo.page';

const routes: Routes = [
  {
    path: '',
    component: MenufeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenufeoPageRoutingModule {}
