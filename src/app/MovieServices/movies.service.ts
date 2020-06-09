import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../@core/models';

@Injectable({
  providedIn: 'root',
})
export class MovieSService {
  Url = 'https://movie-app-v1.herokuapp.com/api/movies/';
  constructor(private _http: HttpClient) {}
  // fn load all movies
  ListMovies(
    sortBy = 'name',
    searchTerm?: string,
    limit?: number,
    pageNumber?: number
  ) {
    // return this._http.get<Movie[]>(this.Url);
    let params = new HttpParams().append('sortBy', sortBy);

    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (pageNumber != undefined) {
      params = params.append('pageNumber', pageNumber.toString());
    }
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }

    return this._http.get<{ movies: Movie[]; count: number }>(`${this.Url}`, {
      params,
    });
  }
  // http://localhost:3000/api/genres?searchTerm=Spider name&sortBy=_id&page
  ///searchTerm=${searchTerm}&
  // http://localhost:3000/api/genres?searchTerm=Spider name&sortBy=_id
  // fn to create a movie
  createMovie(movieName: Movie) {
    return this._http.post<Movie>(this.Url, movieName);
  }
  // fn to get a movie by id
  getMovieById(movieId: string) {
    return this._http.get(this.Url + movieId);
  }
  // fn to update a movie
  updateMovie(movieId: string, value: Partial<Movie>) {
    return this._http.put<Movie>(`${this.Url}${movieId}`, value);
  }
  //fn to remove A movie
  removeMovie(movieId: string) {
    return this._http.delete<Movie>(this.Url + movieId);
  }

  // getHieghlyRated() {
  //   return this._http.get<Movie[]>(`${this.Url}?rate=4`);
  // }
}
