import { CompareComponent } from './compare/compare.component';
import { CurrentComponent } from './current/current.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverallComponent } from './overall/overall.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'current',
    pathMatch: 'full'
  },
  {
    path: 'current',
    component: CurrentComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: 'overall',
    component: OverallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
