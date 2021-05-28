import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  public baseUrl = 'https://api.openweathermap.org/data/2.5/';
  
  /** Weather Url's **/
  public readonly getCityDataByNameUrl = "weather";

  public readonly getCityForecast = `forecast`;
 
}