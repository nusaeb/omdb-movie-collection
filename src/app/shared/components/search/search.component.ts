import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TypeEnum } from 'src/app/shared/domain/movie/movie.enums';
import {
  GetMoviesAction,
  GetMoviesFailureAction,
  UpdateSearchPayloadAction,
} from '../../domain/movie/movie.actions';
import { selectSearchPayload } from '../../domain/movie/movie.selectors';
import { ISearchPayloadState } from '../../domain/movie/movie.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  formControl = new FormControl();
  years: string[] = [];
  types = TypeEnum;

  searchPayload: ISearchPayloadState = {
    s: '',
    page: '1',
    type: '',
    y: '',
    isAdvancedSearch: false,
  };

  searchPayloadState$: Observable<ISearchPayloadState>;
  constructor(
    private router: Router,
    private store: Store<ISearchPayloadState>
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i > 1899; i--) {
      this.years.push(i.toString());
    }
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
  }

  onSubmit() {
    if (!this.searchPayload.s) {
      this.store.dispatch<Action>(
        GetMoviesFailureAction({
          payload: {
            Search: [],
            totalResults: '0',
            Response: 'False',
            Error: 'Type a title to search for!',
          },
        })
      );
    } else {
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

      this.router.navigate(['movies'], {
        queryParams,
      });
      this.store.dispatch<Action>(
        UpdateSearchPayloadAction({ payload: this.searchPayload })
      );
      this.store.dispatch<Action>(
        GetMoviesAction({
          payload: this.searchPayload,
        })
      );
    }
  }

  toggleAdvancedSearch() {
    if (this.searchPayload.isAdvancedSearch) {
      this.searchPayload = {
        ...this.searchPayload,
        isAdvancedSearch: false,
        type: '',
        y: '',
      };
      this.onSubmit();
    } else {
      this.searchPayload = {
        ...this.searchPayload,
        isAdvancedSearch: true,
      };
    }
  }
}
