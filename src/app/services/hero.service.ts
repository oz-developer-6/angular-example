import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    // TODO: Send the message after Heros are fetched
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHeroById(id: number): Observable<Hero> {
    // TODO: send the message _afteR_ fetching the hero
    this.messageService.add('HeroService fetched hero id=' + id);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`Hero Service: ${message}`);
  }
}
