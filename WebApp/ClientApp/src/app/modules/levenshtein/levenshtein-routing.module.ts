import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinimumDistanceComponent } from './components/minimum-distance/minimum-distance.component';

const routes: Routes = [
  {
    path: '',
    component: MinimumDistanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevenshteinRoutingModule { }
