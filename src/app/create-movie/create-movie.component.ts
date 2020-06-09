import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieSService } from '../MovieServices/movies.service';
import { is_Poster } from '../@core/helpers/custom-validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../@core/models';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  errorMessage: string;
  constructor(private _movieService: MovieSService, private _router: Router) {}
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    poster: new FormControl('', [is_Poster]),
  });
  ngOnInit(): void {}
  // create
  movieCreate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    const movieToCreate = {
      name: this.form.value.name,
      poster: this.form.value.poster,
    } as Movie;

    this._movieService.createMovie(movieToCreate).subscribe(
      () => this._router.navigate(['']),
      (err) => {
        this.errorMessage = err.error;
        console.error(err.error);
      }
    );
  }
}
