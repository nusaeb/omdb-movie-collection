import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MovieClientService } from './movie-client.service';
import { MovieDetailsResponse } from './movie.interfaces';

describe('MovieClientService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieClientService],
    })
  );
  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it('should be created', () => {
    const service: MovieClientService = TestBed.inject(MovieClientService);
    expect(service).toBeTruthy();
  });

  it('should get movies when found', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovies = [
        {
          imdbID: '1',
          Title: 'Movie 1',
          Poster: 'test.jpg',
          Type: 'movie',
          Year: '2019',
        },
        {
          imdbID: '2',
          Title: 'Movie 2',
          Poster: 'test.jpg',
          Type: 'movie',
          Year: '1955',
        },
        {
          imdbID: '3',
          Title: 'Series 1',
          Poster: 'test.jpg',
          Type: 'series',
          Year: '2003',
        },
      ];
      const mockMovieListResponse = {
        Search: mockMovies,
        totalResults: '3',
        Response: 'True',
      };

      const mockSearchPayload = {
        s: 'test',
        page: '1',
      };

      movieClient.getMovies(mockSearchPayload).subscribe((response) => {
        expect(JSON.stringify(response.Search)).toEqual(
          JSON.stringify(mockMovieListResponse.Search)
        );
        expect(response.totalResults).toBe('3');
        expect(response.Response).toBe('True');
      });
      const mockUrl =
        movieClient.baseUrl +
        '&s=' +
        mockSearchPayload.s +
        '&page=' +
        mockSearchPayload.page;
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovieListResponse);
    }
  ));

  it('should return error when movies not found', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovieListResponse = {
        Response: 'False',
      };
      const mockSearchPayload = {
        s: 'test_test',
        page: '1',
      };

      movieClient.getMovies(mockSearchPayload).subscribe((response) => {
        expect(response.Response).toBe('False');
      });
      const mockUrl =
        movieClient.baseUrl +
        '&s=' +
        mockSearchPayload.s +
        '&page=' +
        mockSearchPayload.page;
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovieListResponse);
    }
  ));

  it('should get movie details', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovie: MovieDetailsResponse = {
        imdbID: '1',
        Title: 'Movie 1',
        Poster: 'test.jpg',
        Type: 'movie',
        Year: '2019',
        Plot: 'Test plot',
        imdbRating: '6.0',
        Runtime: '100 min',
        Genre: 'Action',
        Response: 'True',
      };

      movieClient.getMovieDetails({ imdbID: '1' }).subscribe((response) => {
        expect(response).toEqual(mockMovie);
      });
      const mockUrl = movieClient.baseUrl + '&i=1';
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovie);
    }
  ));
});
