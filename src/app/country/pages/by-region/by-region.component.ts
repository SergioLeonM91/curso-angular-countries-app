import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [ `
    button {
      margin-right: 5px;
    }
    `
  ]
})
export class ByRegionComponent {

  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  activeRegion: string = '';
  countries: Country[] = [];

  constructor(
    private _countryService: CountryService
  ) { }

  getCSSClass( region: string): string {
    return (region === this.activeRegion) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activateRegion( region: string ) {
    
    if( this.activeRegion === region ) {
      return;
    }
    
    this.activeRegion = region;

    this._countryService.searchRegion(this.activeRegion)
      .subscribe( {
        next: (countries) => {
          this.countries = countries;
        },
        error: (err) => {
          this.countries = [];
        }
      });
  }
}
