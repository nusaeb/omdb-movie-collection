import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MovieClientService } from './movie-client.service';
import {
  GetMovieDetailsAction,
  GetMovieDetailsFailureAction,
  GetMovieDetailsSuccessAction,
  GetMoviesAction,
  GetMoviesFailureAction,
  GetMoviesSuccessAction,
} from './movie.actions';

@Injectable()
export class MovieEffects {
  constructor(
    private movieClient: MovieClientService,
    private action$: Actions
  ) {}

  getMovies$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(GetMoviesAction),
      mergeMap((action) => {
        return from(this.movieClient.getMovies(action.payload)).pipe(
          map((res) =>
            !res.Error
              ? GetMoviesSuccessAction({ payload: res })
              : GetMoviesFailureAction({ payload: res })
          ),
          catchError((err) => {
            return of(GetMoviesFailureAction({ payload: err }));
          })
        );
      })
    )
  );

  getMovieDetails$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(GetMovieDetailsAction),
      mergeMap((action) => {
        return from(this.movieClient.getMovieDetails(action.payload)).pipe(
          map((res) =>
            !res.Error
              ? GetMovieDetailsSuccessAction({ payload: res })
              : GetMovieDetailsFailureAction({ payload: res })
          )
        );
      })
    )
  );
}
