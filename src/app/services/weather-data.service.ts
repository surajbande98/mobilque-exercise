import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ConfigurationService } from 'src/shared/http/configuration.service';
import { HttpService } from 'src/shared/http/http.service';
import { map, filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(
    private httpService: HttpService,
    private configuration: ConfigurationService
  ) { }

  /**
 * This is the getCityDataByName function
 * @param payLoad any
 * @returns Observable<any>
 */
  getCityDataByName(city: string): Observable<any> {
    const endpoint = this.getEndPoint(this.configuration.getCityDataByNameUrl);
    
    const apiCall = fetch(`${endpoint}?q=${city}&appid=${environment.apiKey}`)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson as any
      })
      .catch((err) => {
        return err;
      })
    return from(apiCall)
  }

  getCityForecast(city: string) {
    const endpoint = this.getEndPoint(this.configuration.getCityForecast);
    
    const apiCall = fetch(`${endpoint}?q=${city}&appid=${environment.apiKey}`)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson as any
      })
      .catch((err) => {
        return err;
      })
    return from(apiCall);
    
  }

  getEndPoint(url) {
    return `${this.configuration.baseUrl}/${url}`;
  }

}
