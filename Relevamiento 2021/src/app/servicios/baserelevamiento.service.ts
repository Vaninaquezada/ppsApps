import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/database';
import { map } from 'rxjs/operators';
import { Imagen } from '../clases/imagen';
import { Votacion } from '../clases/votacion';
@Injectable({
  providedIn: 'root'
})
export class BaserelevamientoService {
  lindas;
  constructor(private db: AngularFirestore) { }

  getImagenes() {

    // eslint-disable-next-line arrow-body-style
    return this.db.collection('relevamiento', imagenes => imagenes.orderBy('fecha', 'desc')).snapshotChanges().pipe(map(imagenes => {
      return imagenes.map(a => {
        const data = a.payload.doc.data() as Imagen;
        data.id = a.payload.doc.id;

        return data;
      });
    }));

  }
  getImagen(imgId: string) {
    return this.db.collection('relevamiento').doc(imgId).valueChanges();
  }

  sendVoteToFirebase(voto: Votacion, imgId: string) {

    this.db.collection('relevamiento').doc(imgId).update({
      votacion: firebase.firestore.FieldValue.arrayUnion(voto),
    });
  }

  sendImagenToFirebase(img: Imagen) {

    try {
      this.db.collection('relevamiento').add({
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

  getVotacion() {

    // eslint-disable-next-line arrow-body-style
    return this.db.collection('votacion').snapshotChanges().pipe(map(vote => {
      return vote.map(a => {
        const data = a.payload.doc.data() as Votacion;
        data.id = a.payload.doc.id;
        return data;

      });
    }));

    /*   return new Promise((resolve) => {
         this.db.collection('votacion').snapshotChanges().subscribe((data: []) => {
           resolve(data);
         });
       });
       */
  }

  sendVotoToFirebase(voto: Votacion) {

    try {
      this.db.collection('votacion').add({
        usuario: voto.usuario,
        img: voto.img,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
        tipo: voto.tipo,

      });
    } catch (error) {
      console.log('error sendImagenToFirebase ' + error);
    }

  }
}
