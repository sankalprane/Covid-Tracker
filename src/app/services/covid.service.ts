import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(
    private http: HttpClient
  ) { }


  getAllData(yesterday = false, lastTwoDays = false) {
    return this.http.get(environment.covid_endpoint + '/all')
  }

  getCountryData(country,yesterday=false,twoDaysAgo=false) {
    let _httpOptions = {
      params: new HttpParams()
      .append('yesterday',yesterday.toString())
      .append('twoDaysAgo',twoDaysAgo.toString())
    }
    return this.http.get(environment.covid_endpoint + '/countries/' + country,_httpOptions)
  }

  getHistData() {
    return this.http.get(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
    );
  }

}
