import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenufeoPageRoutingModule } from './menufeo-routing.module';

import { MenufeoPage } from './menufeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenufeoPageRoutingModule
  ],
  declarations: [MenufeoPage]
})
export class MenufeoPageModule {}
