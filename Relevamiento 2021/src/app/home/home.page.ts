import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private authSvc: AuthService) { }

  onClickLindo(): void {
    this.router.navigate(['menu']);
  }

  onClickFeo(): void {
    this.router.navigate(['menufeo']);
  }
  async singOut() {
    console.log('hola');
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
