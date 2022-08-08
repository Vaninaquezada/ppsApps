/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import 'firebase/database';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../clases/user.interface';
import { Credito } from '../clases/credito';

@Injectable({
  providedIn: 'root'
})
export class CargaCreditoService {
  // public user$: Observable<User> = this.authSvc.;
  public credito;
  mail;
  //rol;
  // credito: Credito;
  constructor(private afs: AngularFirestore, private authSvc: AuthService, private router: Router) {
    this.getUseMail();

  }



  async addCredito() {
    this.getUseMail();
  //  console.info("agregar", this.mail);
    const credito = await this.afs.collection('credito').add({
      id: '',
      email: this.mail,
      total: 0,
      cincuenta: 0,
      diez: 0,
      cien: 0,
    });
    return credito;
  }

  sendCreditoToFirebase(credito: Credito) {

    this.afs.collection('credito').doc(credito.id).update({
      total: credito.total,
      cincuenta: credito.cincuenta,
      diez: credito.diez,
      cien: credito.cien,
      id: credito.id,
    }
    )


  }

  deleteCreditoToFirebase(id: string) {

    this.afs.collection('credito').doc(id).update({
      total: 0,
      cincuenta: 0,
      diez: 0,
      cien: 0,

    });
  }

  getCreditos() {
   // let users = [];
    this.getUseMail();
    //   this.getUseMail();

    /*  return this.getUsers().pipe(
        switchMap(res => {
          users = res;
          return this.afs.collection("credito",
          ref => ref.where('email', '==', this.mail)).valueChanges({ idField: 'uid' }) as Observable<Credito[]>;
        }),
        map(creditos => {
          // Get the real name for each user
          for (let m of creditos) {
            // m.fromName = this.getUserForMsg(m.from, users);
            //  m.myMsg = this.mail === m.from;
          }
          return creditos
        })
      )
  */


    try {

      //  return this.afs.collection('credito').ref.where("email", "==", "admin@admin.com").get();
      //   return this.afs.collection('credito').valueChanges({ idField: 'email' }) as Observable<Credito[]>;
      // return this.afs.collection("credito", ref => ref.where('email', '==', this.mail)).valueChanges() as Observable<Credito[]>;

      // eslint-disable-next-line arrow-body-style
      return this.afs.collection('credito').snapshotChanges().pipe(map(vote => {
        return vote.map(a => {
          const data = a.payload.doc.data() as Credito;
          data.id = a.payload.doc.id;

          return data;

        });
      }));

    } catch (error) {

    }

  }
  private getUsers() {
    return this.afs.collection('user').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  private async getUseMail() {
    //this.authSvc.user$.
    this.mail = (await this.authSvc.getUserAuth()).email;
   // console.info("mail", (await this.authSvc.getUserAuth()).email);
    //   this.rol = (await this.authSvc.getUser()).rol;
  }



  async checkCredit() {

    this.credito = await this.getCreditos()

    if (this) {


    }

  }
  getCredito() {
  //  let users = [];
    this.getUseMail();

    try {

      //  return this.afs.collection('credito').ref.where("email", "==", "admin@admin.com").get();
      //   return this.afs.collection('credito').valueChanges({ idField: 'email' }) as Observable<Credito[]>;
      // return this.afs.collection("credito", ref => ref.where('email', '==', this.mail)).valueChanges() as Observable<Credito[]>;

      // return this.afs.collection('credito').ref.where("email", "==", "admin@admin.com").get().then;

      return this.afs.collection('credito').snapshotChanges().pipe(map(vote => {
        return vote.map(a => {
          const data = a.payload.doc.data() as Credito;
          data.id = a.payload.doc.id;

          return data;

        })
      })).toPromise();

    } catch (error) {

    }

  }



}
