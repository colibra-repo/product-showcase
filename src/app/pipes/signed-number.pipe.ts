import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'signedNumber'
})
export class SignedNumberPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (!value && value !== 0) {
      return '';
    }
    return (value > 0 ? '+' : '') + value;
  }

}
