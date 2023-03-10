import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, tap, catchError } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HEROES } from '../mocks-heros';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
  public fetchHeroFromDataSource = (): Observable<Hero[]> => {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(tap(_ => console.log("Fetch data to server")));
  }

  public fetchHeroFromDataSourceById = (id: string): Observable<Hero> => {
    const hero = HEROES.find(h => h.id.toString() === id)!;
    return of(hero);
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {

    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => console.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => console.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
      console.log(`found heroes matching "${term}"`) :
      console.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

} 