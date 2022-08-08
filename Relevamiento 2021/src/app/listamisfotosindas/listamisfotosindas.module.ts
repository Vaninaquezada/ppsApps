import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListamisfotosindasPageRoutingModule } from './listamisfotosindas-routing.module';

import { ListamisfotosindasPage } from './listamisfotosindas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListamisfotosindasPageRoutingModule
  ],
  declarations: [ListamisfotosindasPage]
})
export class ListamisfotosindasPageModule {}
