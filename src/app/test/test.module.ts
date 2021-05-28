import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/shared/http/http.service';
import { ConfigurationService } from 'src/shared/http/configuration.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    ConfigurationService
  ]
})
export class TestModule { }
