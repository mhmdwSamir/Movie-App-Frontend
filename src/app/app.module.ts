import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from './Models/pop-up/pop-up.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthInterceptor } from './@core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListMoviesComponent,
    UpdateMovieComponent,
    CreateMovieComponent,
    NotFoundComponent,
    HeaderComponent,
    PopUpComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
