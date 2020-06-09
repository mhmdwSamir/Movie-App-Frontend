import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MovieSService } from '../MovieServices/movies.service';
import { Movie } from '../@core/models';
import { AuthenticationService } from '../signingService/authenitcation.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css'],
})
export class ListMoviesComponent implements OnInit {
  totalCount = 0;
  showModal = false;
  @ViewChild('searchInputElement')
  searchInputElement: ElementRef<HTMLInputElement>;
  defaultImage =
    'https://www.thebristolarms.com.au/wp-content/uploads/2018/03/img-not-found.png';
  sortBy: string;
  searchTerm: string;
  pageNumber = 0;
  pageSize = 5;

  sortByFeild = [
    { label: 'Name', value: 'name' },
    { label: 'Id', value: '_id' },
    { label: 'image_Url', value: 'imgUrl' },
  ];
  movies: Movie[];
  constructor(
    private _movieService: MovieSService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this._movieService
      .ListMovies(this.sortBy, this.searchTerm, this.pageSize, this.pageNumber)
      .subscribe(({ movies, count }) => {
        this.movies = movies;
        this.totalCount = count;
      });
  }

  ngAfterViewInit() {
    // this.searchInputElement.nativeElement.addEventListener(
    //   'input',
    //   debounce(500, (e) => {
    //     const searchTerm = e.target.value;
    //     this.searchTerm = searchTerm;
    //     this.loadMovies(this.sortBy, this.searchTerm);
    //   })
    // );
    // fromEvent => Turn event into observable sequence
    fromEvent(this.searchInputElement.nativeElement, 'input')
      .pipe(
        map((res) => (res.target as HTMLInputElement).value.trim()),
        filter((res) => res.length > 0),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        this.searchTerm = searchText;
        this.loadMovies(this.sortBy, this.searchTerm);
        console.log(this.searchTerm);
      });
  }
  togglleModalVisibilty() {
    this.showModal = !this.showModal;
  }
  moveieIdToRemove;
  onRemoveMovie(movieId: string) {
    //Add Modal Popup
    // const confirm = window.confirm('Really want to remove Movie');
    this.togglleModalVisibilty();
    if (confirm) {
      this._movieService.removeMovie(movieId).subscribe(
        (deletedMovie: Movie) => {
          console.log(deletedMovie);
          this.loadMovies(this.sortBy, this.searchTerm); // same behaviour when adding it (why )
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  loadMovies(sortBy: string, searchTerm: string) {
    this._movieService
      .ListMovies(sortBy, searchTerm)
      .subscribe(({ movies, count }) => {
        this.movies = movies;
      }),
      (err) => {
        console.error(err);
      };
  }

  setSortBy(value: string) {
    this.sortBy = value;
    this.loadMovies(this.sortBy, this.searchTerm);
  }
  setSearchTerm(search: string) {
    // callBack is the setSearchTerm function
    this.searchTerm = search;
    this.loadMovies(this.sortBy, this.searchTerm);
  }

  trimiming(text: string) {
    const res = text
      .replace(/(^\s*)|(\s*$)/gi, '') // removes leading and trailing spaces
      .replace(/[ ]{2,}/gi, ' ') // replaces multiple spaces with one space
      .replace(/\n +/, '\n'); // Removes spaces after newlines
    console.log(res);
    this.searchTerm = res;
    return;
  }
  onChangePageNumber(pageNumber: number) {
    this.pageNumber = pageNumber - 1;
    this._movieService
      .ListMovies(this.sortBy, this.searchTerm, this.pageSize, this.pageNumber)
      .subscribe((val) => {
        this.movies = val.movies;
        console.log(val);
      });
  }
}

/*
  http://localhost:3000/api/genres?sortBy=_id&limit=2&pageNumber=1
*/
