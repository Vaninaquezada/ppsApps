import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListamisfotosfeasPageRoutingModule } from './listamisfotosfeas-routing.module';

import { ListamisfotosfeasPage } from './listamisfotosfeas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListamisfotosfeasPageRoutingModule
  ],
  declarations: [ListamisfotosfeasPage]
})
export class ListamisfotosfeasPageModule {}
