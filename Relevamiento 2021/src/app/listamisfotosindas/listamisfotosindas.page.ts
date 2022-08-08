import { Component, OnInit } from '@angular/core';
import { BaserelevamientoService } from '../servicios/baserelevamiento.service';
import { AuthService } from '../servicios/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Votacion } from '../clases/votacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listamisfotosindas',
  templateUrl: './listamisfotosindas.page.html',
  styleUrls: ['./listamisfotosindas.page.scss'],
})
export class ListamisfotosindasPage implements OnInit {


  imagenes: any = [];
  usuario;
  votos;
  votadas: any = [];
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

    });

  }
  async getUsuario() {
    this.usuario = (await this.authSvc.getUserAuth()).email;
  }
  votar(id) {
    const voto: Votacion = {
      usuario: this.usuario,
      voto: 'linda',
      img: id,
      tipo: 'linda',

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
      console.log('usuario', element.usuario === this.usuario);
      if (element.usuario === this.usuario) {
        console.log('usuario', element.usuario, this.usuario);
        // eslint-disable-next-line eqeqeq
        console.log('votacion', element.usuario === this.usuario);
        return true;
      }
    });

    return false;
  }
  async singOut() {

    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }
}
