import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(value: any, args?: any) {
    if(!value) return null;
    if(!args) return value;

    args = args.toLowerCase();
    return value.filter( movie => {
      return  JSON.stringify(movie['movieName']).toLowerCase().includes(args); 
    });
  }

}