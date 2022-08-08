import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Imagen } from '../clases/imagen';
import { User } from '../clases/user.interface';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AdministrarService {
  loading: HTMLIonLoadingElement;
  id;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private loadingController: LoadingController) { }

  getImagenes() {
    console.log('error al subir la fotito ');
    return this.db.collection('userD', imagenes => imagenes.orderBy('apellido', 'desc'))
      .snapshotChanges().pipe(map(imagenes => imagenes.map(a => {
        const data = a.payload.doc.data() as User;
        // data.id = a.payload.doc.id;

        return data;
      })));

  }
  getImagen(imgId: string) {
    return this.db.collection('userD').doc(imgId).valueChanges();
  }



  sendImagenToFirebase(img: Imagen) {

    try {
      this.db.collection('userD').add({
        usuario: img.usuario,
        imagen: img.imagen,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        tipo: img.tipo,
        votacion: img.votacion
      });
    } catch (error) {
      console.log('error sendImagenToFirebase ' + error);
    }

  }
  generaId() {
    this.id = this.db.createId();
    return this.id;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    return this.loading.present();
  }
  async uploadFile(id, file): Promise<any> {
    console.log('file ' + file);
    this.generaId();
    try {
      await this.presentLoading();
      const task = await this.storage.ref('fotosUsuarios').child(id).putString(file, 'data_url', { contentType: 'image/png' });
      this.loading.dismiss();
      return this.storage.ref(`fotosUsuarios/${id}`).getDownloadURL().toPromise();
    } catch (error) {
      console.log('error al subir la fotito ' + error);
    }

  }
}
