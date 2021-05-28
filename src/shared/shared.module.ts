import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http/http.service';
import { ConfigurationService } from './http/configuration.service';
import { HelperService } from './services/helper.service';
import { LoginLoaderService } from './services/login-loader.service';
import { LoginLoaderComponent } from './components/login-loader/login-loader.component';
import { FormatTimePipe } from './pipes/format-time.pipe';



@NgModule({
  declarations: [
    LoginLoaderComponent,
    FormatTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginLoaderComponent,
    FormatTimePipe
  ],
  providers: [
    HttpService,
    ConfigurationService,
    HelperService,
    LoginLoaderService
  ]
})
export class SharedModule { }
