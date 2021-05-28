import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { WeatherDataService } from 'src/app/services/weather-data.service';

import { map, without } from 'lodash';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginLoaderService } from 'src/shared/services/login-loader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.less']
})
export class CityForecastComponent implements OnInit, OnDestroy {

  foreCastData: any = [];

  getCityDataSubscription: Subscription;

  city: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: WeatherDataService,
    private location: Location,
    private loader: LoginLoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let city = '';

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        console.log(event.url);

        city = event.url.split("/")[2];

        this.getForecast(city);
      }
    });

    if(!city) {
      city = window.location.pathname.split("/")[2];
      this.getForecast(city);
    }
  }

  /** This is the getForecast function
* @param city string
* @returns 
**/
  getForecast(city: string) {
    this.loader.show();

    this.getCityDataSubscription = this.dataService.getCityForecast(city)
      .subscribe(data => {
        this.loader.hide();

        const { list } = data;

        const finalData = map(list, (city) => {
          if (city.dt_txt.includes('9:00:00')) return city;
        });

        // Remove undefines from the array
        this.foreCastData = without(finalData, undefined)
      },
      (error: HttpErrorResponse) => {
        this.loader.hide();
        console.log(error);
      });
  }

  /** This is the goBack function
* @param 
* @returns 
**/
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.getCityDataSubscription.unsubscribe();
  }

}
