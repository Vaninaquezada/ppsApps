/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
//import { BarcodeScannerPlugin, ScanOptions, BarcodeScanner } from '@capacitor-community/barcode-scanner'
//import { Camera, CameraPlugin, CameraResultType, CameraSource } from '@capacitor/camera'
import { rejects } from 'assert';
import { Imagen } from '../clases/imagen';
import { User } from '../clases/user.interface';
import { AdministrarService } from '../servicios/administrar.service';
import { AuthService } from '../servicios/auth.service';
import { CargaCreditoService } from '../servicios/carga-credito.service';
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
  credito = '';
  creditos;
  usuario;
  user: User;
  data;
  image;
  id;

  webviewPath;
  credentialForm: FormGroup;
  photo: SafeResourceUrl;
  photo2: string;
  fotito;
  fecha: Date = new Date();
  nombre = '';
  apellido = '';
  mensajito = '';
  dni = '';
  email = '';
  password = '';
  password2 = '';
  mensajeError = '';
  constructor(private router: Router,
    private carga: CargaCreditoService,
    private authSvc: AuthService,
    private administrar: AdministrarService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.getUseMail();

  }

  ngOnInit(): void {
    this.credentialForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  async startScanner() {
    const allowed = await this.checkPermission();
    this.mensajito = 'escaner empezadp';

    if (allowed) {
      this.scanActive = true;
      this.mensajito = 'escaner emposo';
      const result = await BarcodeScanner.startScan();

      console.log('result', result);
      if (result.hasContent) {
        this.result = result.content;
        this.cargaDatos(this.result);
        this.scanActive = false;
        this.mensajito = 'escaner content';
      }
    };

  }
  sannerMock() {

    this.result = '00400566677@Carla@FernandezA@F@1232122@A@17/09/1945@23/09/2014@259';
    this.cargaDatos(this.result);
    console.log(this.result);
  }

  cargaDatos(data) {

    console.log(data.split('@'));
    const datos = data.split('@');
    this.credentialForm.setValue({
      nombre: datos[2],
      apellido: datos[1],
      dni: datos[4],
      email: this.credentialForm.get('email').value,
      password: this.credentialForm.get('password').value,
      password2: this.credentialForm.get('password2').value,
    });


  }
  private async getUseMail() {
    if (await this.authSvc.getUsuario()) {
      this.usuario = (await this.authSvc.getUsuario()).email;
    } else {
      this.usuario = 'usuario anonimo';
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngAfterViewInit() {
    BarcodeScanner.prepare();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
  async checkPermission() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return new Promise(async (resolve, rejects) => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        resolve(true);
      } else {
        resolve(false);
      }
    });


  }
  async singOut() {

    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
  stopScanner() {
    this.scanActive = false;
    BarcodeScanner.stopScan();

  }
  irLista() {

    this.router.navigate(['listado']);
  }


  async signUp() {
    try {
      let pass = this.credentialForm.get('password').value;
      const pass2 = this.credentialForm.get('password').value;
      if (pass !== pass2) {
        this.mensajeError = 'Las contraseñas no son iguales';
        this.credentialForm.setValue({
          nombre: this.credentialForm.get('nombre').value,
          apellido: this.credentialForm.get('apellido').value,
          dni: this.credentialForm.get('dni').value,
          email: this.credentialForm.get('email').value,
          password: '',
          password2: '',
        });


      } else {


        let foto = '';
        if (this.image !== undefined) {

          console.log('hola imagen  ', this.image.dataUrl);
          this.id = this.administrar.generaId();
          const url = await this.administrar.uploadFile(this.id, this.image.dataUrl);
          this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.photo2 = url;
          foto = this.photo2;
          console.log('holis', this.photo2);

        }

        this.user = {
          email: this.credentialForm.get('email').value,
          nombre: this.credentialForm.get('nombre').value,
          apellido: this.credentialForm.get('apellido').value,
          dni: this.credentialForm.get('dni').value,
          photoURL: foto,
          uid: '',
          emailVerified: false,
          displayName: '',

        };
        pass = this.credentialForm.get('password').value;
        console.log(' this.user ', this.user);


        const user = await this.authSvc.registro(this.user, pass);
        console.log('usuario ', user);
        if (user) {

          this.router.navigate(['listado']);
          console.log('usuario ', user);
        }

      }
    } catch (error) {
      console.log('error ', error);

    }
  }
  subirFoto() {
    const foto: Imagen = {
      usuario: this.usuario,
      imagen: this.photo2,
      fecha: this.fecha.toDateString(),
      tipo: 'linda',
      id: this.id,
      idimg: 's',
      votacion: []
    };

    //this.administrar.sendImagenToFirebase(foto);
  }
  async cargarImagen() {

    this.image = await Plugins.Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    try {

      //   this.webviewPath = image.webPath;
      console.log('image.dataUrl' + this.image.dataUrl);
      console.log('hola');
      this.fotito = this.image.dataUrl;
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.image && (this.image.dataUrl));




    } catch (error) {
      console.log('Error:' + error);
    }

  }


}
