import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  GetMovieDetailsAction,
  GetMovieDetailsFailureAction,
  GetMovieDetailsSuccessAction,
  GetMoviesAction,
  GetMoviesFailureAction,
  GetMoviesSuccessAction,
  UpdateSearchPayloadAction,
} from './movie.actions';
import { MovieDetailsResponse, MovieListResponse } from './movie.interfaces';
import {
  ReducerMovieDetails,
  ReducerMovieList,
  reducerUpdateSearchPayload,
} from './movie.reducer';

describe('MovieReducer', () => {
  let initialState;
  beforeEach(
    () =>
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [],
      }),

    (initialState = {
      ...initialState,
      movieList: {
        Search: [],
        totalResults: '0',
        Response: '',
        Error: '',
      },
      movieDetails: {
        imdbID: '',
        Title: '',
        Year: '',
        Type: '',
        Poster: '',
        Plot: '',
        imdbRating: '',
        Runtime: '',
        Genre: '',
        Response: '',
        Error: '',
      },
      isPending: false,
    })
  );
  it('GetMoviesAction should return isPending true', () => {
    const newState = ReducerMovieList(initialState, GetMoviesAction);
    expect(newState.isPending).toBe(true);
  });

  it('GetMoviesSuccessAction should return isPending=false, Response="True" Error=""', () => {
    const response: MovieListResponse = {
      Search: [
        {
          imdbID: '001',
          Title: 'Test movie 1',
          Year: '2000',
          Type: 'movie',
          Poster: '',
        },
      ],
      totalResults: '1',
      Response: 'True',
      Error: '',
    };
    const newState = ReducerMovieList(
      initialState,
      GetMoviesSuccessAction({ payload: response })
    );
    expect(newState.isPending).toBe(false);
    expect(newState.movieList.Response).toEqual('True');
    expect(newState.movieList.Error).toEqual('');
  });

  it('GetMoviesFailureAction should return isPending=false, Response="False" Error="some message"', () => {
    const response: MovieListResponse = {
      Search: undefined,
      totalResults: undefined,
      Response: 'False',
      Error: 'Some message',
    };
    const newState = ReducerMovieList(
      initialState,
      GetMoviesFailureAction({ payload: response })
    );
    expect(newState.isPending).toBe(false);
    expect(newState.movieList.Response).toEqual('False');
    expect(newState.movieList.Error).not.toBe('');
  });

  it('GetMovieDetailsAction should return isPending true', () => {
    const newState = ReducerMovieDetails(initialState, GetMovieDetailsAction);
    expect(newState.isPending).toBe(true);
  });

  it('GetMovieDetailsSuccessAction should return isPending=false, Response="True" Error=""', () => {
    const response: MovieDetailsResponse = {
      imdbID: '1',
      Title: 'Test movie 1',
      Year: '2000',
      Type: 'movie',
      Poster: '',
      Plot: '',
      imdbRating: '',
      Runtime: '',
      Genre: '',
      Response: 'True',
      Error: '',
    };
    const newState = ReducerMovieDetails(
      initialState,
      GetMovieDetailsSuccessAction({ payload: response })
    );
    expect(newState.isPending).toBe(false);
    expect(newState.movieDetails.Response).toEqual('True');
    expect(newState.movieDetails.Error).toEqual('');
  });

  it('GetMovieDetailsFailureAction should return isPending=false, Response="False" Error="some message"', () => {
    const response: MovieDetailsResponse = {
      imdbID: undefined,
      Title: undefined,
      Year: undefined,
      Type: undefined,
      Poster: undefined,
      Plot: undefined,
      imdbRating: undefined,
      Runtime: undefined,
      Genre: undefined,
      Response: 'False',
      Error: 'Some message',
    };
    const newState = ReducerMovieDetails(
      initialState,
      GetMovieDetailsFailureAction({ payload: response })
    );
    expect(newState.isPending).toBe(false);
    expect(newState.movieDetails.Response).toEqual('False');
    expect(newState.movieDetails.Error).not.toBe('');
  });
});

describe('SearchPayloadReducer', () => {
  let initialState;
  beforeEach(
    () =>
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [],
      }),

    (initialState = {
      ...initialState,
      s: '',
      page: '1',
      type: '',
      y: '',
      isAdvancedSearch: false,
    })
  );
  it('GetMoviesAction should return isPending true', () => {
    const payload = {
      s: 'test',
      page: '1',
      type: 'movie',
      y: '2000',
      isAdvancedSearch: true,
    };
    const newState = reducerUpdateSearchPayload(
      initialState,
      UpdateSearchPayloadAction({ payload })
    );
    expect(newState.s).toEqual('test');
    expect(newState.type).toEqual('movie');
    expect(newState.y).toEqual('2000');
    expect(newState.isAdvancedSearch).toBe(true);
  });
});
