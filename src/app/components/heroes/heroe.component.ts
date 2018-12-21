import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  private heroe: Heroe = {
          nombre: '',
          bio: '',
          casa: 'Marvel'
        };

  nuevo = false;
  id: string;
  loading = false;

  constructor(private _heroesService: HeroesService, private router: Router, private route: ActivatedRoute) {
    this.route.params
        .subscribe( parametros => {
          this.id = parametros['id'];

          if ( this.id !== 'nuevo' ) {
            this._heroesService.getHeroe(this.id)
                .subscribe(heroe => this.heroe = heroe);
          }
        });
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);
    this.loading = true;

    setTimeout(() => {

      if (this.id === 'nuevo') {
        // insertando
        this._heroesService.nuevoHeroe(this.heroe)
          .subscribe(data => {
            this.router.navigate(['/heroe', data.name]);
          },
            error => console.error(error)
          );
      } else {
        // actualizando
        this._heroesService.actualizarHeroe(this.heroe, this.id)
          .subscribe(data => {
            console.log(data);
          },
            error => console.error(error)
          );
      }

      this.loading = false;
    }, 3000);
  }

  agregarNuevo(forma: NgForm) {

    this.router.navigate(['/heroe', 'nuevo']);

    forma.reset({
      casa: 'Marvel'
    });

  }

}
