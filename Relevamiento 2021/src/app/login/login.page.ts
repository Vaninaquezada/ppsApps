/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseErrors } from '../clases/firebase-errors';
import { AuthErrorsService } from '../servicios/auth-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mail = '';
  pass = '';
  mensage = '';
  credentialForm: FormGroup;
  firebaseErrors: FirebaseErrors;

  constructor(private authSvc: AuthService, private router: Router, private fb: FormBuilder, private alertController: AlertController,
    private loadingController: LoadingController, private authError: AuthErrorsService) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  async onLogin(email, password) {
    const loading = await this.loadingController.create();
    await loading.present();

    console.log('pass ', password.value);


    const user = await this.authSvc.login(email.value, password.value).then(
      (res) => {
        loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (err) => {
        loading.dismiss();

        const alert = await this.alertController.create({
          header: ':(',
          message: this.authError.getError(err.code),
          buttons: ['Aceptar'],
          cssClass: 'alertita'
        });

        await alert.present();
      }
    );



  }

  redirecUser() {

    this.router.navigate(['home']);
  }


  onClick(selected: any) {

    console.log(selected);

    switch (selected) {
      case "admin":

        this.mail = "admin@admin.com";
        this.pass = "111111";

        break;
      case "invitado":
        this.mail = "invitado@invitado.com";
        this.pass = "222222";
        break;
      case "usuario":
        this.mail = "usuario@usuario.com";
        this.pass = "333333";
        break;
      case "tester":
        this.mail = "anonimo@anonimo.com";
        this.pass = "444444";
        break;
      case "anonimo":
        this.mail = "tester@tester.com";
        this.pass = "555555";
        break;
    }
  }


}
