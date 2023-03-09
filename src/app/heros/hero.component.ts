import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mocks-heros';
import { Hero } from './hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  selectedHero?: Hero;
  heroes: Array<Hero> = HEROES;

  constructor() { }

  ngOnInit() {
  }
  onSelectAHero(hero: Hero): void {
    console.log("Slected Hero: ", hero);
    this.selectedHero = hero;
  }
}
