import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityForecastComponent } from './city-forecast.component';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { HelperService } from 'src/shared/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { TestModule } from 'src/app/test/test.module';

import {FETCH_CITY_FORECAST} from '../../mocks/forecast.mock';

describe('CityForecastComponent', () => {
  let component: CityForecastComponent;
  let fixture: ComponentFixture<CityForecastComponent>,dataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityForecastComponent],
      imports: [
        TestModule
      ],
      providers: [
        WeatherDataService,
        HelperService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return 'London';
                },
              },
            },
          },
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityForecastComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(WeatherDataService);

    fixture.detectChanges();
  });

  it('----------------Should create-----------------', () => {
    expect(component).toBeTruthy();
  });

  it('Get city forecast for next 5 days @9:00', () => {
    spyOn(dataService, "getCityForecast").and.returnValue(FETCH_CITY_FORECAST);
    expect(dataService.getCityForecast().cnt).toBe(40);

  });

});
