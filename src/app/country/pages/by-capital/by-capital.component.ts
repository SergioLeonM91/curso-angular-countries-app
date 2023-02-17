import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent {

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];

  constructor(
    private _countryService: CountryService
  ) { }

  search( term: string ) {

    this.isError = false;
    this.term = term;

    this._countryService.searchCapital(this.term)
      .subscribe( {
        next: (countries) => {
          this.countries = countries;
        },
        error: (err) => {
          this.countries = [];
          this.isError = true;
        }
      });
  }

}
