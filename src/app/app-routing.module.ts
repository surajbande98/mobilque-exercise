import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CitiesForecastComponent } from './components/cities-forecast/cities-forecast.component';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

/* Routes at the app level */

const routes: Routes = [

  { path: '', redirectTo: 'cities', pathMatch: 'full' },

  {
    path: 'cities', component: CitiesForecastComponent,
    children: [
      {
        path: ":name",
        component: CityForecastComponent
      },
      // {
      //   path: "London",
      //   component: CityForecastComponent
      // },
      // {
      //   path: "Florence",
      //   component: CityForecastComponent
      // },
      // {
      //   path: "Prague",
      //   component: CityForecastComponent
      // },
      // {
      //   path: "Florence",
      //   component: CityForecastComponent
      // }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
  // { path: '**', redirectTo: `
  // <ng-template>
  // <p>404</p>
  // </ng-template>
  // `, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true, // debugging purpose (in development mode)
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
