import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetailsResponse, MovieListResponse } from './movie.interfaces';
import { ISearchPayloadState } from './movie.state';

@Injectable({
  providedIn: 'root',
})
export class MovieClientService {
  baseUrl = 'http://www.omdbapi.com/?apikey=f79aeba3';
  constructor(private httpClient: HttpClient) {}

  getMovies(payload: ISearchPayloadState) {
    let url = `${this.baseUrl}&s=${payload.s}&page=${payload.page}`;
    if (payload.type) {
      url = `${url}&type=${payload.type}`;
    }
    if (payload.y) {
      url = `${url}&y=${payload.y}`;
    }
    return this.httpClient.get<MovieListResponse>(url);
  }

  getMovieDetails(payload: { imdbID: string }) {
    return this.httpClient.get<MovieDetailsResponse>(
      `${this.baseUrl}&i=${payload.imdbID}`
    );
  }
}
