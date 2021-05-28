import { TestBed } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { ConfigurationService } from 'src/shared/http/configuration.service';
import { HttpService } from 'src/shared/http/http.service';
import { HttpClientModule } from '@angular/common/http';
import { TestModule } from '../test/test.module';

describe('WeatherDataService', () => {
  let service: WeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [

      ]
    });
    service = TestBed.inject(WeatherDataService);
  });

  it('----------------Should create-----------------', () => {
    expect(service).toBeTruthy();
  });
});
