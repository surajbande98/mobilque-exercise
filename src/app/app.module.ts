import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/shared/shared.module';
import { CitiesForecastComponent } from './components/cities-forecast/cities-forecast.component';
import { WeatherDataService } from './services/weather-data.service';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';

@NgModule({
  declarations: [AppComponent, CitiesForecastComponent, CityForecastComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [ 
    WeatherDataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
}