import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HEROES } from '../mocks-heros';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  public fetchHeroFromDataSource = (): Observable<Hero[]> => {
    const heros = of(HEROES);
    this.messageService.pushMessage("Fetch heroes success");
    return heros;
  }

  public fetchHeroFromDataSourceById = (id: number): Observable<Hero> => {
    console.log("FetchHeroFromDataSource")
    const hero = HEROES.find(h => h.id === id)!;
    return of(hero);
  }
}