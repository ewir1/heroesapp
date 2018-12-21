import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any[] = [];
  loading = true;

  constructor(private _heroesService: HeroesService) {

    this._heroesService.getHeroes()
        .subscribe( data => {
          console.log(data);
          setTimeout(() => {
            this.heroes = data;
            this.loading = false;
          }, 2000);

        });

  }

  ngOnInit() {
  }

  borrarHeroe(key$: string) {

    this._heroesService.borrarHeroe(key$)
        .subscribe( respuesta => {
          if ( respuesta ) {
            console.error(respuesta);
          } else {
            // Todo bien
            delete this.heroes[key$];
          }
        });

  }



}
