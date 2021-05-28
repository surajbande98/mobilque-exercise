import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesForecastComponent } from './cities-forecast.component';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { HelperService } from 'src/shared/services/helper.service';

import {FETCH_CITIES} from '../../mocks/forecast.mock';
import { ActivatedRoute } from '@angular/router';
import { TestModule } from 'src/app/test/test.module';

describe('CitiesForecastComponent', () => {
  let component: CitiesForecastComponent;
  let fixture: ComponentFixture<CitiesForecastComponent>;
  let dataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesForecastComponent],
      imports: [
        TestModule
      ],
      providers: [
        WeatherDataService,
        HelperService
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dataService = TestBed.get(WeatherDataService);
  });

  afterEach(() => {
    component = null;
    dataService = null;
  });

  it('----------------Should create-----------------', () => {
    expect(component).toBeTruthy();
  });

  it('Get all 5 cities data', () => {
    spyOn(dataService, "getCityDataByName").and.returnValue(FETCH_CITIES);
    expect(dataService.getCityDataByName().length).toBe(5);

  });

  it('Get time from timestamp', () => {
    expect(component.getFormattedTime(1622087614))
      .toBe('3:53:34');
  });

});
