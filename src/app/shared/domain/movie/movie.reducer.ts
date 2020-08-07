import { Action, createReducer, on } from '@ngrx/store';
import {
  GetMovieDetailsAction,
  GetMovieDetailsFailureAction,
  GetMovieDetailsSuccessAction,
  GetMoviesAction,
  GetMoviesFailureAction,
  GetMoviesSuccessAction,
  UpdateSearchPayloadAction,
} from './movie.actions';
import {
  IMovieState,
  initialStateMovie,
  initialStateSearchPayload,
  ISearchPayloadState,
} from './movie.state';

const createReducerMovieList = createReducer(
  initialStateMovie,
  on(GetMoviesAction, (state: IMovieState, { payload }) => {
    return { ...state, isPending: true };
  }),
  on(GetMoviesSuccessAction, (state: IMovieState, { payload }) => {
    return {
      ...state,
      movieList: payload,
      isPending: false,
    };
  }),
  on(GetMoviesFailureAction, (state: IMovieState, { payload }) => {
    return {
      ...state,
      movieList: payload,
      isPending: false,
    };
  })
);

const createReducerMovieDetails = createReducer(
  initialStateMovie,
  on(GetMovieDetailsAction, (state: IMovieState, { payload }) => {
    return {
      ...state,
      isPending: true,
    };
  }),
  on(GetMovieDetailsSuccessAction, (state: IMovieState, { payload }) => {
    return {
      ...state,
      movieDetails: payload,
      isPending: false,
    };
  }),
  on(GetMovieDetailsFailureAction, (state: IMovieState, { payload }) => {
    return {
      ...state,
      movieDetails: payload,
      isPending: false,
    };
  })
);

export function ReducerMovieList(state: IMovieState, action: Action) {
  return createReducerMovieList(state, action);
}

export function ReducerMovieDetails(state: IMovieState, action: Action) {
  return createReducerMovieDetails(state, action);
}

export const reducerUpdateSearchPayload = createReducer(
  initialStateSearchPayload,
  on(UpdateSearchPayloadAction, (state: ISearchPayloadState, { payload }) => {
    return {
      ...state,
      s: payload.s,
      page: payload.page,
      type: payload.type,
      y: payload.y,
      isAdvancedSearch: payload.type || payload.y ? true : false,
    };
  })
);
