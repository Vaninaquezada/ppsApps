import { Component, OnInit } from '@angular/core';
import { BaserelevamientoService } from '../servicios/baserelevamiento.service';
import { AuthService } from '../servicios/auth.service';
import { Imagen } from '../clases/imagen';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Votacion } from '../clases/votacion';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listafotos-feas',
  templateUrl: './listafotos-feas.page.html',
  styleUrls: ['./listafotos-feas.page.scss'],
})
export class ListafotosFeasPage implements OnInit {

  imagenes: any = [];
  usuario;
  votos;
  votadas: any = [];
  public user$: Observable<any> = this.authSvc.afAuth.user;
  constructor(private router: Router,
    public fotoLindaService: BaserelevamientoService,
    private authSvc: AuthService,
    private sanitizer: DomSanitizer) {
    this.getVotaciones();
  }

  ngOnInit() {

    this.getUsuario();

    this.fotoLindaService.getImagenes().subscribe(fotos => {

      this.imagenes = fotos;

      this.imagenes.forEach(element => {
        element.votaste = false;
        element.votacion.forEach(v => {
          if (v.usuario === this.usuario) {
            element.votaste = true;
          }
        });
      });
    });

  }
  async getUsuario() {
    this.usuario = (await this.authSvc.getUserAuth()).email;
  }
  votar(id) {
    const voto: Votacion = {
      usuario: this.usuario,
      voto: 'feo',
      img: id,
      tipo: 'feo',
    };
    console.log(voto);
    //this.fotoLindaService.sendVotoToFirebase(voto)
    this.fotoLindaService.sendVoteToFirebase(voto, id);

  }
  getVotaciones() {

    this.fotoLindaService.getVotacion().subscribe(fotos => {

      this.votos = fotos;
      // console.log("votos", this.votos);
    });



  }

  votada(id, votacion) {

    votacion.forEach(element => {
      console.log('usuario antes', element.usuario === this.usuario);
      if (element.usuario === this.usuario) {
        console.log('usuario', element.usuario, this.usuario);
        console.log('votacion', element.usuario === this.usuario);
        return true;
      }
    });

    return false;
  }
  async singOut() {
    console.log('hola');
    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
