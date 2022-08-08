import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  /* {
     path: '',
     redirectTo: 'splash-animado',
     pathMatch: 'full'
   },
   */
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash-animado',
    loadChildren: () => import('./splash-animado/splash-animado.module').then(m => m.SplashAnimadoPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'listafotos-feas',
    loadChildren: () => import('./listafotos-feas/listafotos-feas.module').then( m => m.ListafotosFeasPageModule)
  },
  {
    path: 'listafotos-lindas',
    loadChildren: () => import('./listafotos-lindas/listafotos-lindas.module').then( m => m.ListafotosLindasPageModule)
  },
  {
    path: 'listamisfotosindas',
    loadChildren: () => import('./listamisfotosindas/listamisfotosindas.module').then( m => m.ListamisfotosindasPageModule)
  },
  {
    path: 'menufeo',
    loadChildren: () => import('./menufeo/menufeo.module').then( m => m.MenufeoPageModule)
  },
  {
    path: 'listamisfotosfeas',
    loadChildren: () => import('./listamisfotosfeas/listamisfotosfeas.module').then( m => m.ListamisfotosfeasPageModule)
  },
  {
    path: 'grafico-feo',
    loadChildren: () => import('./grafico-feo/grafico-feo.module').then( m => m.GraficoFeoPageModule)
  },
  {
    path: 'grafico-lindo',
    loadChildren: () => import('./grafico-lindo/grafico-lindo.module').then( m => m.GraficoLindoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
