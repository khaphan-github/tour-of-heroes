import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  heroes: Array<Hero> = [];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes = (): void => {
    this.heroService
      .fetchHeroFromDataSource()
      .subscribe(heroes => { this.heroes = heroes })
  }
  add = (heroName: string): void => {
    console.log("Hero from input box: ", heroName);
    heroName = heroName.trim();
    if (!heroName) { return; };

    const newHero: Hero = { 
      id: Guid.create().toString(),
      name: heroName
    };
    console.log(newHero.id);
    this.heroService.addHero(newHero).subscribe(hero => { this.heroes.push(hero)});
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  
}
