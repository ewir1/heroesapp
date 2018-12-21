import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL = 'https://heroesapp-ebbdf.firebaseio.com/heroes.json';
  heroeUrl = 'https://heroesapp-ebbdf.firebaseio.com/heroes/';

  constructor(private http: Http) { }

  nuevoHeroe(heroe: Heroe) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.heroesURL, body, {headers})
               .pipe( map( res => {
                  console.log(res.json());
                  return res.json();
               }));
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroeUrl}/${key$}.json`;

    return this.http.put(url, body, { headers })
      .pipe(map(res => {
        console.log(res.json());
        return res.json();
      }));
  }

  getHeroe(key$: string) {
    const url = `${this.heroeUrl}/${key$}.json`;
    return this.http.get(url)
               .pipe(map( res => res.json()));
  }

  getHeroes() {
    return this.http.get(this.heroesURL)
      .pipe(map(res => res.json()));
  }

  borrarHeroe( key$: string ) {
    const url = `${this.heroeUrl}/${key$}.json`;

    return this.http.delete(url)
               .pipe(map( res => res.json()));
  }

}
