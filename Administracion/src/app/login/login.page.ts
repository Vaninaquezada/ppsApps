import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail = '';
  pass = '';
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }
  async onLogin(email, password) {
    try {
      console.log('pass ', password.value);
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        this.redirecUser();
        console.log('usuario ', user);
      }
    } catch (error) {
      console.log('error ', error);

    }
  }
  async onLoginGoogle(email, password) {
    try {
      const user = await this.authSvc.loginGoogle();

    } catch (error) {
      console.log('error ', error);

    }
  }

  redirecUser() {
    this.router.navigate(['home']);
  }
  onClick(selected: any) {

    console.log(selected);

    switch (selected) {
      case 'admin':
        this.mail = 'admin@admin.com';
        this.pass = '111111';
        break;
      case 'invitado':
        this.mail = 'invitado@invitado.com';
        this.pass = '222222';
        break;
      case 'usuario':
        this.mail = 'usuario@usuario.com';
        this.pass = '333333';
        break;
      case 'anonimo':
        this.mail = 'anonimo@anonimo.com';
        this.pass = '444444';
        break;
      case 'tester':
        this.mail = 'tester@tester.com';
        this.pass = '555555';
        break;
    }
  }

}
