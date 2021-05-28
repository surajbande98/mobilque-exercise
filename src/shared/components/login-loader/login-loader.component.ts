import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginLoaderService } from 'src/shared/services/login-loader.service';
import { LoaderState } from 'src/shared/models/loader-state';

@Component({
  selector: 'app-login-loader',
  templateUrl: './login-loader.component.html',
  styleUrls: ['./login-loader.component.less']
})
export class LoginLoaderComponent implements OnInit {

  show = false;
  spinnerText: string;

  private subscription: Subscription;

  constructor(
      private loaderService: LoginLoaderService
  ) { }

  ngOnInit() {
      this.subscription = this.loaderService.loaderSubject
          .subscribe((state: LoaderState) => {
              this.show = state.show;
              this.spinnerText = state.text
          });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
