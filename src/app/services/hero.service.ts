import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private heroesUrl = 'api/heroes';

  /*Get heroes from the server*/
  getHeroes(): Observable<Hero[]> {
    // TODO: Send the message after Heros are fetched
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heros')),
        catchError(this.handleError<Hero[]>('get heroes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      // TODO: send the error to remote loggin infrastructure.
      console.log(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed ${error.message}`);

      // let the app running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<any>(`ger hero by id: ${id}`))
      );
  }

  private log(message: string) {
    this.messageService.add(`Hero Service: ${message}`);
  }
}
