import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [
  ]
})
export class ShowCountryComponent implements OnInit {

  country!: Country;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _countryService: CountryService
  ) {}

  ngOnInit(): void {
    // this._activatedRoute.params
    //   .subscribe( ({id}) => {
    //     this._countryService.getCountryByCode(id)
    //       .subscribe( country => {
    //         console.log(country);
    //       });
    //   });

    this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._countryService.getCountryByCode(id) ),
        tap( console.log )
      )
      .subscribe( ( country ) => {
          this.country = country;
      });
  }

}
