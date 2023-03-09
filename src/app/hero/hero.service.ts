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
}
