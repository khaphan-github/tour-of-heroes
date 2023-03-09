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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.heroService.fetchHeroFromDataSourceById(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack = () => {
    this.location.back();
  }
}