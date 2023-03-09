import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  selectedHero?: Hero;
  heroes: Array<Hero> = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }
  onSelectAHero = (hero: Hero): void => {
    this.selectedHero = hero;
    this.messageService.pushMessage(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes = (): void => {
    this.heroService
      .fetchHeroFromDataSource()
      .subscribe(heroes => { this.heroes = heroes })
  }
}
