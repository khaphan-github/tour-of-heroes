import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Array<Hero> = [];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes = () => {
    this.heroService
      .fetchHeroFromDataSource()
      .subscribe(heroes => { this.heroes = heroes.slice(0,4) })
  }
}
