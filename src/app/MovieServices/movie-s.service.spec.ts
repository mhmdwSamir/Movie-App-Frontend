import { TestBed } from '@angular/core/testing';

// import { MovieSService } from './movie-s.service';
import { MovieSService } from './movies.service';

describe('MovieSService', () => {
  let service: MovieSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
