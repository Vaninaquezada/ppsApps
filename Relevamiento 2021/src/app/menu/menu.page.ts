import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Imagen } from '../clases/imagen';
import { BaserelevamientoService } from '../servicios/baserelevamiento.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  usuario: string;
  photo: SafeResourceUrl;
  photo2: string;
  loading: HTMLIonLoadingElement;
  fecha: Date = new Date();
  tipo: 'linda';
  id: string;
  constructor(private authSvc: AuthService, private router: Router, private sanitizer: DomSanitizer, private storage: AngularFireStorage,
    private loadingController: LoadingController,
    public base: BaserelevamientoService,
    public firestore: AngularFirestore) {



  }
  async ngOnInit() {
    this.usuario = (await this.authSvc.getUserAuth()).email;
  }
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    try {
      console.log('hola');
      // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
      this.generaId();
      console.log('id ' + this.id);
      const url = await this.uploadFile(this.id, image.dataUrl);
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.photo2 = url;
      this.subirFoto();
      this.router.navigate(['listafotos-lindas']);

    } catch (error) {
      console.log('Error:' + error);
    }

  }


  async uploadFile(id, file): Promise<any> {
    console.log('file ' + file);

    try {
      await this.presentLoading();
      const task = await this.storage.ref('lindo').child(id).putString(file, 'data_url', { contentType: 'image/png' });
      this.loading.dismiss();
      return this.storage.ref(`lindo/${id}`).getDownloadURL().toPromise();
    } catch (error) {
      console.log('error al subir la fotito ' + error);
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
      votacion: [],
    };

    this.base.sendImagenToFirebase(foto);
  }


  generaId() {
    this.id = this.firestore.createId();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Espere un momento...',
      translucent: true,
      cssClass: 'loadingio-spinner-double-ring-m0lnt1iaggc',
    });
    return this.loading.present();
  }

  async onLogout() {
    try {
      const user = await this.authSvc.logOut();
      this.router.navigate(['login']);
      console.log('Login-> ', user);

    } catch (error) {
      console.log('Error code-> ', error.code);


    }
  }

  onClickListaLindo() {

    this.router.navigate(['listafotos-lindas']);
  }

  onClickMisListaLindo() {

    this.router.navigate(['listamisfotosindas']);
  }
  async singOut() {

    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
  onClickGraficoLindo() {
    this.router.navigate(['grafico-lindo']);
  }
}
