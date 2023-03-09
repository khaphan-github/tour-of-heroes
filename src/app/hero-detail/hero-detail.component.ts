import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  ngOnInit(): void   {
    this.getHero();
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  getHero = (): void => {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.heroService.fetchHeroFromDataSourceById(id.toString())
      .subscribe(hero => this.hero = hero);
  }
  saveHero = (): void => {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
  goBack = () => {
    this.location.back();
  }
}