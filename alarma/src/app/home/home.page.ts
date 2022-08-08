/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

// Plugins
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

import { AlertController, Platform } from '@ionic/angular';
import { AudioService } from '../servicios/audio.service';


//import { AudioService } from 'src/app/services/audio.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textoBoton: string = "Active la alarma";
  botonActivo: boolean = false;
  clase;
  usuario;
  mensajito: string = "";
  password: string;
  deshabilitarBoton: boolean = false;
  estado: Estado = Estado.DESACTIVADA;
  ejeX;
  ejeY;
  ejeZ;
  timeStamp;
  options: GyroscopeOptions = {
    frequency: 1000
  }
  deviceRef;
  posicion;
  posicion2;
  posicionAnterior = "";
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  rutaSonido: string = "/assets/audio/"
  public xOrient: any;
  public yOrient: any;
  public zOrient: any;
  public timestamp: any;
  public accX: any;
  public accY: any;
  public accZ: any;
  audio = new Audio();
  constructor(private authSvc: AuthService, private router: Router, private platform: Platform, private deviceMotion: DeviceMotion,
    private flashlight: Flashlight, private vibration: Vibration, private audioService: AudioService,
    private alertController: AlertController, private gyroscope: Gyroscope) {
    this.getUserMail();
  }
  onClick() {

    if (this.botonActivo == false) {
      this.estado = Estado.ACTIVADA;
      this.botonActivo = true;
      this.textoBoton = "Alarma activada";
      this.clase = "boto2";
      this.start();
      console.log(this.textoBoton);

    } else {

      this.deshabilitarBoton = true;


      console.log(this.textoBoton);
      //this.botonActivo = false;

      this.presentAlertPrompt()
      // this.start();

    }
  }


  async presentAlertPrompt() {
    //this.getUser();
    console.log("usuario", this.usuario);
    const alert = await this.alertController.create({

      header: 'Ingrese sus credenciales para desactivar la alarma',
      cssClass: 'alertita',
      inputs: [
        {
          name: 'contraseña',
          type: 'password',
          placeholder: 'Contraseña',
          attributes: {
            maxlength: 6,
            inputmode: 'decimal'
          }
        }
      ],
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
            this.password = data.contraseña;
            // this.usuario = data.correo;
            this.desactivarAlarma();
            //  this.onCredentials(data.correo, data.contraseña)
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertPromptError() {
    //this.getUser();
    const alert = await this.alertController.create({

      header: 'Credenciales invalidas',
      cssClass: 'alertita',
      buttons: [
        {
          text: 'Ok',
          cssClass: 'alertButton',
        }
      ]
    });

    await alert.present();
  }


  async singOut() {
    console.log("hola");
    await this.authSvc.logOut();
    this. stop();
    this.router.navigate(['login']);
  }

  async desactivarAlarma() {


    console.log("usuario", this.usuario);
    const mail = await this.authSvc.validatePassword(this.usuario, this.password);

    console.log("mail", mail);
    if (mail) {

      this.estado = Estado.DESACTIVADA;
      this.botonActivo = false;
      this.clase = "";
      this.deshabilitarBoton = false;
      this.textoBoton = "Alarma desactivada";
      this.stop();
      // this.presentAlert("Alarma desactivada");
    } else {
      console.log("mail");
      this.presentAlertPromptError();
    }
    console.log("mail", mail);
  }

  private async getUserMail() {
    if (await this.authSvc.getUsuario()) {
      this.usuario = (await this.authSvc.getUsuario()).email;

    } else {
      this.usuario = "usuario anonimo";
    }

  }

  start() {
    try {
      let option: DeviceMotionAccelerometerOptions =
      {
        frequency: 500
      };

      this.deviceRef = this.deviceMotion.watchAcceleration(option)
        .subscribe((acc: DeviceMotionAccelerationData) => {
          this.ejeX = "" + acc.x;
          this.ejeY = "" + acc.y;
          this.ejeZ = "" + acc.z;
          this.timeStamp = "" + acc.timestamp;


          if (this.ejeX > 1 && this.ejeX <= 9) {
            console.log("IZQUIERDA");
            this.posicion = "izquierda";
            this.posicion2 = "izquierda.aac";
          }

          if (this.ejeX < -1 && this.ejeX >= -9) {
            console.log("DERECHA");
            this.posicion = "derecha";

            this.posicion2 = "derecha.aac";
          }

          if (this.ejeX < 1 && this.ejeZ >= 9 || this.ejeX < 1 && this.ejeZ <= -9) {
            console.log("HORIZONTAL");
            this.posicion = "horizontal";

            this.posicion2 = "horizontal.aac";
          }

          if (this.ejeY >= 8 || this.ejeY <= -8) {
            console.log("VERTICAL");
            this.posicion = "vertical";

            this.posicion2 = "vertical.aac";
          }

          if (this.posicion != this.posicionAnterior) {
            this.audio.src = this.rutaSonido + this.posicion2;
            switch (this.posicion) {
              case "vertical":

                this.audio.load();
                this.audio.play();
                this.flashlight.switchOff();
                setTimeout(() => {
                  this.flashlight.switchOn();
                }, 5000);
                this.flashlight.switchOff();
                this.posicionAnterior = this.posicion;

                break;
              case "horizontal":
                this.flashlight.switchOff();
                this.vibration.vibrate(5000);
                this.audio.load();
                this.audio.play();
                this.posicionAnterior = this.posicion;

                break;
              case "derecha":
                this.flashlight.switchOff();
                this.audio.load();
                this.audio.play();
                this.posicionAnterior = this.posicion;

                break;
              case "izquierda":
                this.flashlight.switchOff();
                this.audio.load();
                this.audio.play();
                this.posicionAnterior = this.posicion;

                break;
            }
          }


        });
    }
    catch (error) {
      console.error("ERROR: ", error);
      this. stop();
    }
  }
  stop() {
    this.deviceRef.unsubscribe();
    this.flashlight.switchOff();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message,
      mode: "ios",
      translucent: true
    });

    await alert.present();
  }



  gyrascope() {

    let options: GyroscopeOptions = {
      frequency: 500
    };

    this.gyroscope.getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient = orientation.x;
        this.yOrient = orientation.y;
        this.zOrient = orientation.z;
        this.timestamp = orientation.timestamp;

      })
      .catch()


    this.gyroscope.watch()
      .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        this.xOrient = orientation.x;
        this.yOrient = orientation.y;
        this.zOrient = orientation.z;
        this.timestamp = orientation.timestamp;
      });
  }

  Accelerometer() {
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
        console.log(acceleration),

      //  (error: any) => console.log(error)

    );

    // Watch device acceleration
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(acceleration);
      this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;
    });

  }

}

enum Estado {
  ACTIVADA = 1,
  DESACTIVADA = 0
}
