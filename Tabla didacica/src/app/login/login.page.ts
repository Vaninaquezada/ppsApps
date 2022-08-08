import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail = '';
  pass = '';
  mensage = '';
  loading: HTMLIonLoadingElement;
  constructor(private authSvc: AuthService,
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) { }

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

  async openToast(error) {

    if ('auth/user-not-found' === error.code) {
      this.mensage = 'Usuario no encontrado.';
    }
    else if ('auth/invalid-email' === error.code) {
      this.mensage = 'Ingrese un email valido.';
    } else {

      this.mensage = error.code;
    }

    const toast = await this.toastController.create({
      message: this.mensage,
      duration: 2000,
      position: 'top',
      cssClass: 'css',
      color: 'dark'
    });
    toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('toast dismissed');
    });
  }

  onChange(selected: any) {

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
        this.mail = 'tester@tester.com';
        this.pass = '555555';
        break;
      case 'anonimo':
        this.mail = 'anonimo@anonimo.com';
        this.pass = '444444';
        break;
    }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: '<img src="../assets/img/spinner.gif" class="img-align"  />',
      translucent: true,
      spinner: null,
      //  cssClass: 'dio-5tpgiys2ol',
    });
    return this.loading.present();
  }

}
