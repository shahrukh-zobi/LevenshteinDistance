import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from 'src/shared/utilities/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'minimum-distance', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'minimum-distance',
    loadChildren: () => import('./modules/levenshtein/levenshtein.module').then(m => m.LevenshteinModule),
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
