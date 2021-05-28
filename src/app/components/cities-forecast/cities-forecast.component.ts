import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { HttpErrorResponse } from '@angular/common/http';

import { forkJoin, Subscription } from 'rxjs';
import { HelperService } from 'src/shared/services/helper.service';
import { LoginLoaderService } from 'src/shared/services/login-loader.service';

@Component({
  selector: 'cities-forecast',
  templateUrl: './cities-forecast.component.html',
  styleUrls: ['./cities-forecast.component.less']
})
export class CitiesForecastComponent implements OnInit, OnDestroy {

  allCitiesData: any = [];

  getAllCitiesDataSubscription: Subscription;

  constructor(
    private dataService: WeatherDataService,
    private helper: HelperService,
    private loader: LoginLoaderService
  ) { }

  ngOnInit(): void {
    this.getAllCitiesData();
  }

  /** This is the getAllCitiesData function
* @param 
* @returns
*/
  getAllCitiesData() {
    this.loader.show();
    this.getAllCitiesDataSubscription = forkJoin([
      this.dataService.getCityDataByName('London'),
      this.dataService.getCityDataByName('Barcelona'),
      this.dataService.getCityDataByName('Florence'),
      this.dataService.getCityDataByName('Prague'),
      this.dataService.getCityDataByName('Paris')
    ]).subscribe((weatherData: any[]) => {

      this.loader.hide();

      if (weatherData) {
        this.allCitiesData = weatherData;
      }

    },
      (error: HttpErrorResponse) => {
        this.loader.hide();
        console.log(error);
      })
  }

  /** This is the getFormattedTime function
* @param 
* @returns 
**/
  getFormattedTime(timestamp) {
    return this.helper.getTimeFromTimestamp(timestamp);
  }

  ngOnDestroy() {
    this.getAllCitiesDataSubscription.unsubscribe();
  }

}
