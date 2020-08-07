import { createAction, props } from '@ngrx/store';
import { MovieDetailsResponse, MovieListResponse } from './movie.interfaces';
import { ISearchPayloadState } from './movie.state';

export enum MovieActionTypes {
  GET_MOVIES_ACTION = 'GET_MOVIES_ACTION',
  GET_MOVIES_SUCCESS_ACTION = 'GET_MOVIES_SUCCESS_ACTION',
  GET_MOVIES_FAILURE_ACTION = 'GET_MOVIES_FAILURE_ACTION',
  GET_MOVIE_DETAILS_ACTION = 'GET_MOVIE_DETAILS_ACTION',
  GET_MOVIE_DETAILS_SUCCESS_ACTION = 'GET_MOVIE_DETAILS_SUCCESS_ACTION',
  GET_MOVIE_DETAILS_FAILURE_ACTION = 'GET_MOVIE_DETAILS_FAILURE_ACTION',
}

export const GetMoviesAction = createAction(
  MovieActionTypes.GET_MOVIES_ACTION,
  props<{ payload: ISearchPayloadState }>()
);

export const GetMoviesSuccessAction = createAction(
  MovieActionTypes.GET_MOVIES_SUCCESS_ACTION,
  props<{ payload: MovieListResponse }>()
);

export const GetMoviesFailureAction = createAction(
  MovieActionTypes.GET_MOVIES_FAILURE_ACTION,
  props<{ payload: MovieListResponse }>()
);

export const GetMovieDetailsAction = createAction(
  MovieActionTypes.GET_MOVIE_DETAILS_ACTION,
  props<{ payload: { imdbID: string } }>()
);

export const GetMovieDetailsSuccessAction = createAction(
  MovieActionTypes.GET_MOVIE_DETAILS_SUCCESS_ACTION,
  props<{ payload: MovieDetailsResponse }>()
);

export const GetMovieDetailsFailureAction = createAction(
  MovieActionTypes.GET_MOVIE_DETAILS_FAILURE_ACTION,
  props<{ payload: MovieDetailsResponse }>()
);

export const UpdateSearchPayloadAction = createAction(
  'UPDATE_SEARCH_PAYLOAD',
  props<{ payload: ISearchPayloadState }>()
);
