import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { rejects } from 'assert';
import { Credito } from '../clases/credito';
import { AuthService } from '../servicios/auth.service';
import { CargaCreditoService } from '../servicios/carga-credito.service';
import { AlertController, ToastController } from '@ionic/angular';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { BarcodeScanner } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result = null;
  scanActive = false;
  credito = ' 0';
  creditos: Credito[] = [];
  c: Credito;
  usuario;
  data;
  mensaje = '';
  constructor(private router: Router,
    public toastController: ToastController,
    private carga: CargaCreditoService,
    private alertController: AlertController,
    private authSvc: AuthService) {

    this.scanActive = false;
    this.getUseMail();
    // this.credito = this.c.total.toString();
  //  console.log('c', this.c);
    // this.credito = this.c.total.toString();

  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit() {
    this.c = {
      id: '',
      email: '',
      total: 0,
      cincuenta: 0,
      diez: 0,
      cien: 0,
    };
    this.getUseMail();
    this.traerCreditos();
  }
  async startScanner() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log('result', result);
      if (result.hasContent) {
        this.result = result.content;
        this.scanActive = false;
        this.cargaCredito(this.result);
      } else {
        this.mensaje = 'No se pudo realizar la carga de credito';
      }
    }

  }
  sannerMock() {

    this.result = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
    this.cargaCredito(this.result);
    console.log('consulta', this.creditos);
  }

  cargaCredito(credito) {
    this.traerCreditos();
    this.credito = this.c.total.toString();
    let carga = 0;
    let codigo = '';
    if (credito === '8c95def646b6127282ed50454b73240300dccabc') {
      carga = 10;
      codigo = 'diez';
    }
    if (credito === 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ') {
      this.credito = '50';
      codigo = 'cincuenta';
      carga = 50;
    }
    if (credito === '2786f4877b9091dcad7f35751bfcf5d5ea712b2f') {
      carga = 100;
      codigo = 'cien';
    }
    if (this.revisarCarga(codigo)) {
      this.c.total += carga;
      this.carga.sendCreditoToFirebase(this.c);
      this.credito = this.c.total.toString();
      this.mensaje = 'Su carga de ' + carga + ' creditos se realizo correctamente.';

    } else {
      this.mensaje = 'Ya superaste la carga límite con ese QR.';
    }

    this.presentToast();
    //console.info('mensaje', this.mensaje);

  }
  async getUseMail() {
    this.usuario = (await this.authSvc.getUserAuth()).email;
    console.log('getUserAuth', this.usuario);
  }

  revisarCarga(codigo) {
    let veces = 1;

    if (this.c.email === 'admin@admin.com') {
      veces = 2;
      console.log('veces', veces);
    }

    if (codigo === 'cien' && this.c.cien < veces) {
      this.mensaje = 'Se realizo la carga de 100 creditos ';
      this.c.cien += 1;

      return true;
    }
    if (codigo === 'cincuenta' && this.c.cincuenta < veces) {
      this.mensaje = 'Se realizo la carga de 50 creditos ';
      this.c.cincuenta += 1;

      return true;
    }
    if (codigo === 'diez' && this.c.diez < veces) {
      this.mensaje = 'Se realizo la carga de 10 creditos ';
      this.c.diez += 1;

      return true;
    }
    return false;
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
  async checkPermission() {
    return new Promise(async (resolve) => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        resolve(true);
      } else {
        resolve(false);
      }
    });


  }

  stopScanner() {
    this.scanActive = false;
    BarcodeScanner.stopScan();

  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000,
      cssClass: 'mensajito',
      position: 'middle',
    });
    toast.present();
  }

  async presentAlertPrompt() {
    //this.getUser();
    console.log('usuario', this.usuario);
    const alert = await this.alertController.create({

      header: '¿Estas seguro que queres eliminar tu crédito?',
      cssClass: 'alertita',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          cssClass: 'alertButton',
          handler: (data) => {
            this.mensaje = 'Se elimino tu crédito';
            this.carga.deleteCreditoToFirebase(this.c.id);
            this.c.total = 0;
            this.traerCreditos();
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }


  borrarCredito() {

    this.presentAlertPrompt();

    /*
        this.mensaje = '';
        this.carga.deleteCreditoToFirebase(this.c.id);
        this.c.total = 0;
        this.traerCreditos();
        */
  }
  async traerCreditos() {
    // this.c = await this.carga.getCreditos();
    this.getUseMail();
    return await this.carga.getCreditos().subscribe((data) => {
      let cargado = false;
      this.creditos = data;

      console.log('this.creditos', this.creditos);
      this.creditos.forEach(credito => {
        console.log('true', this.usuario === credito.email);
        console.log('credito.email', credito.email);

        console.log('this.usuario ', this.usuario);
        if (this.usuario === credito.email) {
          this.c = credito;

          cargado = true;
        }


      });
      if (!cargado) {
        console.log('undefined ', this.c);

        this.addCredito();
        cargado = false;
      }
    });
  }

  async traerCredito() {

    console.log('mail user', this.usuario);
    if (this.c === undefined) {
      console.log('undefined ', this.c);

      this.addCredito();
    }
    console.log('traer', this.c);


  }

  addCredito() {
    this.carga.addCredito();

    this.traerCreditos();
  }
  async singOut() {

    await this.authSvc.logOut();
    this.mensaje = '';
    this.router.navigate(['login']);

  }

}
