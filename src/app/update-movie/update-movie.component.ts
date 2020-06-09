import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieSService } from '../MovieServices/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../@core/models';
import { is_Poster } from '../@core/helpers/custom-validation';
@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css'],
})
export class UpdateMovieComponent implements OnInit {
  movie: Movie;
  httpError: string;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    poster: new FormControl('', [is_Poster]),
  });

  constructor(
    private _MovService: MovieSService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._MovService
      .getMovieById(this._route.snapshot.params.id)
      .toPromise()
      .then((movie) => (this.movie = movie))
      .then(() => {
        this._setMovieValue(this.movie);
      });
  }
  private _setMovieValue(movie: Movie) {
    for (const key in movie) {
      const formControl = this.form.get(key);
      if (formControl) {
        formControl.setValue(movie[key]);
      }
    }
  }
  OnUpdateSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let movieToUpdate = new Movie();
    movieToUpdate.name = this.form.value.name;
    movieToUpdate.poster = this.form.value.poster;

    this._MovService.updateMovie(this.movie._id, movieToUpdate).subscribe(
      (movieUpdated) => {
        this._router.navigate(['']);
      },
      (err) => {
        const errorMessage = err.error.msg;
        this.httpError = errorMessage;
      }
    );
  }
}
