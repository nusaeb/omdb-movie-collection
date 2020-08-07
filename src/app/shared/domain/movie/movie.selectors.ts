import { createFeatureSelector } from '@ngrx/store';
import { IMovieState, ISearchPayloadState } from './movie.state';

export const selectSearchPayload = createFeatureSelector<ISearchPayloadState>(
  'searchPayload'
);
export const selectMovieList = createFeatureSelector<IMovieState>('movieList');
export const selectMovieDetails = createFeatureSelector<IMovieState>(
  'movieDetails'
);
