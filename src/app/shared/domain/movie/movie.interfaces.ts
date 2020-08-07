export interface SearchMovieItem {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieListResponse {
  Search: SearchMovieItem[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
  Response: string;
  Error?: string;
}
