import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../models/loader-state';

@Injectable({
  providedIn: 'root'
})
export class LoginLoaderService {

  loaderSubject = new Subject<LoaderState>();

  constructor() { }

  show(text: string = '') {
      this.loaderSubject.next(<LoaderState>{ show: true, text: text });
  }

  hide() {
      this.loaderSubject.next(<LoaderState>{ show: false, text: '' });
  }
}
