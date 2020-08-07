import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { UpdateSearchPayloadAction } from '../shared/domain/movie/movie.actions';
import {
  initialStateSearchPayload,
  ISearchPayloadState,
} from '../shared/domain/movie/movie.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<ISearchPayloadState>
  ) {}

  ngOnInit(): void {}

  goToHome() {
    this.store.dispatch<Action>(
      UpdateSearchPayloadAction({ payload: initialStateSearchPayload })
    );
    this.router.navigate(['/']);
  }
}
