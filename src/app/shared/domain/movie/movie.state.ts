import { MovieDetailsResponse, MovieListResponse } from './movie.interfaces';

export interface IMovieState {
  movieList: MovieListResponse;
  movieDetails: MovieDetailsResponse;
  isPending: boolean;
}
export const initialStateMovie: IMovieState = {
  movieList: undefined,
  movieDetails: undefined,
  isPending: false,
};
export interface ISearchPayloadState {
  s: string;
  page: string;
  type?: string;
  y?: string;
  isAdvancedSearch?: boolean;
}

export const initialStateSearchPayload: ISearchPayloadState = {
  s: '',
  page: '1',
  type: '',
  y: '',
  isAdvancedSearch: false,
};
