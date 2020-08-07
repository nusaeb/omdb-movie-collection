import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetMovieDetailsAction } from 'src/app/shared/domain/movie/movie.actions';
import { MovieDetailsResponse } from 'src/app/shared/domain/movie/movie.interfaces';
import { selectMovieDetails } from 'src/app/shared/domain/movie/movie.selectors';
import { IMovieState } from 'src/app/shared/domain/movie/movie.state';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass'],
})
export class MovieDetailsComponent implements OnInit {
  isPending: boolean;
  movieDetails: MovieDetailsResponse;
  movieState$: Observable<IMovieState>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<IMovieState>
  ) {}

  ngOnInit() {
    this.movieState$ = this.store.pipe(select(selectMovieDetails));
    this.movieState$.subscribe((data) => {
      if (data) {
        this.movieDetails = data.movieDetails;
        this.isPending = data.isPending;
      }
    });
    this.route.params.subscribe((params) => {
      if (!this.movieDetails || this.movieDetails.imdbID !== params.imdbID) {
        this.store.dispatch<Action>(
          GetMovieDetailsAction({
            payload: { imdbID: params.imdbID },
          })
        );
      }
    });
  }

  backToSearchResult() {
    this.location.back();
  }
}
