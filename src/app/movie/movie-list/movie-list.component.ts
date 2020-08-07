import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  GetMoviesAction,
  UpdateSearchPayloadAction,
} from 'src/app/shared/domain/movie/movie.actions';
import { MovieListResponse } from 'src/app/shared/domain/movie/movie.interfaces';
import {
  selectMovieList,
  selectSearchPayload,
} from 'src/app/shared/domain/movie/movie.selectors';
import {
  IMovieState,
  ISearchPayloadState,
} from 'src/app/shared/domain/movie/movie.state';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass'],
})
export class MovieListComponent implements OnInit {
  itemsPerPage = '10';
  maxSize = '5';
  isPending: boolean;
  searchPayload: ISearchPayloadState = {
    s: '',
    page: '1',
    y: '',
    type: '',
    isAdvancedSearch: false,
  };
  movieList: MovieListResponse;
  movieState$: Observable<IMovieState>;
  searchPayloadState$: Observable<ISearchPayloadState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IMovieState>
  ) {}

  ngOnInit() {
    this.movieState$ = this.store.pipe(select(selectMovieList));
    this.movieState$.subscribe((data) => {
      if (data) {
        this.movieList = data.movieList;
        this.isPending = data.isPending;
      }
    });
    this.searchPayloadState$ = this.store.pipe(select(selectSearchPayload));
    this.searchPayloadState$.subscribe((data) => {
      if (data) {
        this.searchPayload = {
          ...this.searchPayload,
          s: data.s,
          page: data.page,
          type: data.type,
          y: data.y,
          isAdvancedSearch: data.isAdvancedSearch,
        };
      }
    });

    this.route.queryParams.subscribe((params) => {
      // to prevent api call when coming back from movie details
      if (
        this.searchPayload.s !== params.s ||
        this.searchPayload.page !== params.page ||
        this.searchPayload.type !== params.type ||
        this.searchPayload.y !== params.y
      ) {
        this.searchPayload = {
          ...this.searchPayload,
          s: params.s,
          page: params.page,
          type: params.type ? params.type : '',
          y: params.y ? params.y : '',
        };
        this.store.dispatch<Action>(
          UpdateSearchPayloadAction({ payload: this.searchPayload })
        );
        this.store.dispatch<Action>(
          GetMoviesAction({
            payload: this.searchPayload,
          })
        );
      }
    });
  }

  pageChange(event) {
    this.searchPayload = {
      ...this.searchPayload,
      page: event,
    };
    const queryParams: ISearchPayloadState = {
      s: this.searchPayload.s,
      page: this.searchPayload.page,
    };
    if (this.searchPayload.type) {
      queryParams.type = this.searchPayload.type;
    }
    if (this.searchPayload.y) {
      queryParams.y = this.searchPayload.y;
    }

    this.router.navigate(['/movies'], {
      queryParams,
      relativeTo: this.route,
    });
  }
}
