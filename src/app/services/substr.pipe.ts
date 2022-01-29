import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})
export class SubstrPipe implements PipeTransform {

  transform(text: string) {
    if (!text) {
      return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, ' ');

    return without_html.substring(0,10).concat('...');
  }

}
