import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../clases/user.interface';
import firebase from "firebase/app";
import "firebase/database";
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('error->', error);
    }

  }
  async registro(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      //   await this.sendVerificarionEmail();
      this.afAuth.idToken
      return user;
    } catch (error) {
      console.log('error->', error);
    }
  }
  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('error->', error);
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('error->', error);
    }
  }

  async sendVerificarionEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
      (await this.afAuth.currentUser).reauthenticateWithCredential
    } catch (error) {
      console.log('error->', error);
    }
  }
  async isEmailVerified(user: User) {
    try {
      return user.emailVerified === true ? true : false;
    } catch (error) {
      console.log('error->', error);
    }
  }
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  getUsuario() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  validatePassword(mail, password) {
    let reultado;
    const credential = firebase.auth.EmailAuthProvider.credential(mail, password);
    /*   let user = firebase.auth().currentUser;
       user.reauthenticateWithCredential(credential).then(function () {
         console.log("creden", mail);
         reultado = true;
         // return firebase.auth().currentUser.email;
       }).catch(function (error) {
         // An error happened.
         reultado = false;
       });
   return reultado;
     }
     */
    let user = firebase.auth().currentUser;

    return new Promise((resolve) => {
      user.reauthenticateWithCredential(credential).then(function () {
        console.log("creden", mail);
        resolve(true);
        // return firebase.auth().currentUser.email;
      }).catch(function (error) {
        // An error happened.
        resolve(false);
      });
    });

  }
}
