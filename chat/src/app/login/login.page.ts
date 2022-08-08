import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail = '';
  pass = '';
  loading: HTMLIonLoadingElement;
  constructor(private authSvc: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }
  async onLogin(email, password) {
    try {
      await this.presentLoading();
      console.log('pass ', password.value);
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        this.redirecUser();
        this.loading.dismiss();
        console.log('usuario ', user);
      }
    } catch (error) {
      console.log('error ', error);
      this.loading.dismiss();
    }
  }
  async onLoginGoogle(email, password) {
    try {
      const user = await this.authSvc.loginGoogle();

    } catch (error) {
      console.log('error ', error);

    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '<img src="../assets/img/spinner.svg" class="img-align"  />',
      translucent: true,
      spinner: null,
      //  cssClass: 'dio-5tpgiys2ol',
    });
    return this.loading.present();
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
      case 'tester':
        this.mail = 'anonimo@anonimo.com';
        this.pass = '444444';
        break;
      case 'anonimo':
        this.mail = 'tester@tester.com';
        this.pass = '555555';
        break;
    }
  }

}
