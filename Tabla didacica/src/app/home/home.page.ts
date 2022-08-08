/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

enum Idiomas {
  espanol,
  ingles,
  portugues
}
enum Sonidos {
  numero,
  color,
  animal
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authSvc: AuthService, private router: Router) {
    this.animal = true;
    this.color = false;
    this.numero = false;
    this.portugues = false;
    this.espanol = true;
    this.ingles = false;



  }
  idioma: Idiomas = Idiomas.espanol;
  rutaSonido = '/assets/sonidos/';
  rutaIdioma: string;
  rutaBanderitas = '/assets/img/banderitas/argRedonda.png';
  sonido: Sonidos = Sonidos.animal;
  rutaCosa = '';
  animal: boolean;
  numero: boolean;
  color: boolean;
  portugues: boolean;
  espanol: boolean;
  ingles: boolean;
  audio = new Audio();

  onClick1() {
    console.log('Hola');
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {
      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'oveja.aac';
    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '1.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'rojo.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.audio.src);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }

  }
  onClick2() {
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {
      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'raton.aac';

    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '2.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'verde.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.audio.src);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }


  }
  onClick3() {
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {
      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'gato.aac';
    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '3.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'rosa.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.audio.src);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }


  }
  onClick4() {
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {
      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'caballo.aac';
    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '4.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'negro.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.audio.src);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }


  }
  onClick5() {
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {

      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'perro.aac';
    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '5.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'azul.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.rutaCosa);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }


  }
  onClick6() {
    if (this.idioma === Idiomas.espanol) {

      this.rutaIdioma = 'espanol/';
    } else if (this.idioma === Idiomas.ingles) {
      this.rutaIdioma = 'ingles/';
    } else if (this.idioma === Idiomas.portugues) {
      this.rutaIdioma = 'portugues/';
    }

    if (this.sonido === Sonidos.animal) {

      this.rutaCosa = 'conejo.aac';
    } else if (this.sonido === Sonidos.numero) {

      this.rutaCosa = '6.aac';
    } else if (this.sonido === Sonidos.color) {

      this.rutaCosa = 'amarillo.aac';
    }
    this.audio.src = this.rutaSonido + this.rutaIdioma + this.rutaCosa;
    console.log(this.audio.src);
    try {
      this.audio.load();
      this.audio.play();
    } catch (error) {
      console.log('Error: ' + error);
    }


  }
  onClickE() {
    this.portugues = false;
    this.espanol = true;
    this.ingles = false;
    this.idioma = Idiomas.espanol;

  }
  onClickI() {
    this.idioma = Idiomas.ingles;
    this.portugues = false;
    this.espanol = false;
    this.ingles = true;

  }
  onClickP() {
    this.idioma = Idiomas.portugues;
    this.portugues = true;
    this.espanol = false;
    this.ingles = false;

  }
  onClickA() {
    this.sonido = Sonidos.animal;
    this.animal = true;
    this.color = false;
    this.numero = false;

  }
  onClickC() {
    this.sonido = Sonidos.color;
    this.animal = false;
    this.color = true;
    this.numero = false;

  }
  onClickN() {
    this.sonido = Sonidos.numero;
    this.animal = false;
    this.color = false;
    this.numero = true;

  }
  async singOut() {
    console.log('hola');
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }


}
