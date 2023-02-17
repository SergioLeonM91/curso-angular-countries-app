import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _apiURL: string = 'https://restcountries.com/v3.1';
  private _fields: string = 'flag,name,capital,population,cca2,translations';

  get httpParams(): HttpParams {
    return new HttpParams()
      .set( 'fields', this._fields );
  }

  constructor(
    private _http: HttpClient
  ) { }

  searchCountry( term: string): Observable<Country[]> {

    const url = `${this._apiURL}/name/${term}`;

    return this._http.get<Country[]>(url, { params: this.httpParams });
  }

  searchCapital( term: string): Observable<Country[]> {

    const url = `${this._apiURL}/capital/${term}`;

    return this._http.get<Country[]>(url);
  }

  getCountryByCode( id: string ): Observable<Country> {
    const url = `${this._apiURL}/alpha/${id}`;

    return this._http.get<Country>(url, { params: this.httpParams });
  }

  searchRegion( region: string ): Observable<Country[]> {

    const url = `${this._apiURL}/region/${region}`;

    return this._http.get<Country[]>(url, { params: this.httpParams });
  }
}
