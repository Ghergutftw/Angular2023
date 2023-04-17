import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten',
  pure: false
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number, anotherarg: number): string {
    if (value.length > limit) {
      return value.slice(0, limit) + ' ...'
    }
    return value
  }

}
