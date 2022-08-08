import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash-animado',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash-animado',
    loadChildren: () => import('./splash-animado/splash-animado.module').then(m => m.SplashAnimadoPageModule)
  },
  {
    path: 'chata',
    loadChildren: () => import('./chata/chata.module').then(m => m.ChataPageModule)
  },
  {
    path: 'chatb',
    loadChildren: () => import('./chatb/chatb.module').then(m => m.ChatbPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
