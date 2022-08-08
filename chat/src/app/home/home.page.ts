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
  onClick4A() {
    this.router.navigateByUrl('chata');
  }
  onClick4B() {
    this.router.navigateByUrl('chatb');
  }
  async signOut() {
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
