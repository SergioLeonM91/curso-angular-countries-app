import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class ByCountryComponent {

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(
    private _countryService: CountryService
  ) { }

  search( term: string ) {

    this.isError = false;
    this.term = term;
    this.showSuggestions = false;

    this._countryService.searchCountry(this.term)
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

  suggestions( term: string ) {
    this.isError = false;
    this.term = term;

    this._countryService.searchCountry(term)
      .subscribe(  {
        next: (countries) => {
          this.suggestedCountries = countries.splice(0,5);
          this.showSuggestions = true;
        },
        error: (err) => {
          this.suggestedCountries = [];
        }
      });
  }
}
