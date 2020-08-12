import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { MovieClientService } from './movie-client.service';
import {
  GetMovieDetailsAction,
  GetMovieDetailsFailureAction,
  GetMovieDetailsSuccessAction,
  GetMoviesAction,
  GetMoviesFailureAction,
  GetMoviesSuccessAction,
} from './movie.actions';
import { MovieEffects } from './movie.effects';
import { MovieDetailsResponse, MovieListResponse } from './movie.interfaces';
import { IMovieState } from './movie.state';

describe('MovieEffects', () => {
  let actions$: Observable<any>;
  let effects: MovieEffects;
  let mockStore: MockStore<IMovieState>;
  let movieClient: MovieClientService;

  const initialState: IMovieState = {
    movieList: undefined,
    movieDetails: undefined,
    isPending: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieEffects,
        MovieClientService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });

    effects = TestBed.inject(MovieEffects);
    mockStore = TestBed.inject(MockStore);
    movieClient = TestBed.inject(MovieClientService);
  });

  describe('GetMovies$', () => {
    it('should return a stream with get movies success action', (done) => {
      const movieListResponse: MovieListResponse = {
        Search: [
          {
            imdbID: '1',
            Title: 'Movie 1',
            Poster: 'test.jpg',
            Type: 'movie',
            Year: '2019',
          },
        ],
        totalResults: '1',
        Response: 'True',
      };
      const spy = spyOn(movieClient, 'getMovies').and.callFake(() => {
        return of(movieListResponse);
      });
      actions$ = of(GetMoviesAction);
      effects.getMovies$.subscribe((res) => {
        expect(res).toEqual(
          GetMoviesSuccessAction({ payload: movieListResponse })
        );
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should return a stream with get movies failure action', (done) => {
      const movieListResponse: MovieListResponse = {
        Search: undefined,
        totalResults: undefined,
        Response: 'False',
        Error: 'Error message',
      };
      const spy = spyOn(movieClient, 'getMovies').and.callFake(() => {
        return of(movieListResponse);
      });
      actions$ = of(GetMoviesAction);
      effects.getMovies$.subscribe((res) => {
        expect(res).toEqual(
          GetMoviesFailureAction({ payload: movieListResponse })
        );
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('GetMovieDetails$', () => {
    it('should return a stream with get movie details success action', (done) => {
      const movieDetailsResponse: MovieDetailsResponse = {
        imdbID: '1',
        Title: 'Movie 1',
        Poster: 'test.jpg',
        Type: 'movie',
        Year: '2019',
        Plot: 'Test plot',
        imdbRating: '6.0',
        Runtime: '100 min',
        Genre: 'Action',
        Response: 'True',
      };
      const spy = spyOn(movieClient, 'getMovieDetails').and.callFake(() => {
        return of(movieDetailsResponse);
      });
      actions$ = of(GetMovieDetailsAction({ payload: { imdbID: '1' } }));
      effects.getMovieDetails$.subscribe((res) => {
        expect(res).toEqual(
          GetMovieDetailsSuccessAction({ payload: movieDetailsResponse })
        );
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should return a stream with get movie details failure action', (done) => {
      const movieDetailsResponse: MovieDetailsResponse = {
        imdbID: undefined,
        Title: undefined,
        Poster: undefined,
        Type: undefined,
        Year: undefined,
        Plot: undefined,
        imdbRating: undefined,
        Runtime: undefined,
        Genre: undefined,
        Response: 'False',
        Error: 'Error message',
      };
      const spy = spyOn(movieClient, 'getMovieDetails').and.callFake(() => {
        return of(movieDetailsResponse);
      });
      actions$ = of(GetMovieDetailsAction({ payload: { imdbID: '111' } }));
      effects.getMovieDetails$.subscribe((res) => {
        expect(res).toEqual(
          GetMovieDetailsFailureAction({ payload: movieDetailsResponse })
        );
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
