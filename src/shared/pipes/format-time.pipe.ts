import { Pipe, PipeTransform } from '@angular/core';

declare var moment;

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(timestamp: number): string {
    if(!timestamp){
      return '';
    }

    return moment(timestamp).format("HH:MM:SS a");
 
  }

}
