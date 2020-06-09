import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDenaiedComponent } from './sharing/components/access-denaied/access-denaied.component';
import { AuthGuard } from './@core/guards/auth.guard';
import { AuthorizedGuard } from './@core/guards/authorized.guard';
const routes: Routes = [
  { path: '', component: ListMoviesComponent },
  { path: ':id/update', component: UpdateMovieComponent },
  {
    path: 'create',
    component: CreateMovieComponent,
    canActivate: [AuthGuard, AuthorizedGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
  },
  {
    path: 'access-denaied',
    component: AccessDenaiedComponent
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
