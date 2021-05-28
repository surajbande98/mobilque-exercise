import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CitiesForecastComponent } from './components/cities-forecast/cities-forecast.component';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';

/* Routes at the app level */

const routes: Routes = [

  { path: '', redirectTo: 'cities', pathMatch: 'full' },

  {
    path: 'cities', component: CitiesForecastComponent,
    children: [
      {
        path: ":name",
        component: CityForecastComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: 'cities'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // debugging purpose (in development mode)
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
