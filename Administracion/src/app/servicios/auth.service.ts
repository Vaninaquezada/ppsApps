import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../clases/user.interface';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario;
  public user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`userD/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      //    this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('error->', error);
    }

  }
  async registro(usuario: User, password: string): Promise<User> {
    try {
      console.log('usuario1 ', usuario);
      const { user } = await this.afAuth.createUserWithEmailAndPassword(usuario.email, password);
      console.log('usuario ', user);
      //   await this.sendVerificarionEmail();
      this.updateUserDataT(usuario, user);
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
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('error->', error);
    }
  }
  async sendVerificarionEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
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
  private updateUserDataT(usuario: User, user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`userD/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      photoURL: usuario.photoURL,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }

  getUsuario() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  getUserAuth() {

    return this.afAuth.authState.pipe(first()).toPromise();

  }
}