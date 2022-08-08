import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdministrarService } from '../servicios/administrar.service';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  imagenes: any = [];
  constructor(private fotosService: AdministrarService, private router: Router, private authSvc: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fotosService.getImagenes().subscribe(fotos => {

      this.imagenes = fotos;

    })

  }
  go() {
    this.router.navigate(['home']);
  }
  async singOut() {

    await this.authSvc.logOut();
    this.router.navigate(['login']);
  }

}
