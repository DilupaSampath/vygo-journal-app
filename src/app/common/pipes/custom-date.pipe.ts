import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipe extends 
             DatePipe implements PipeTransform {
  transform(value: any, format: string): any {
    // perform inbuilt ate pipe with given format
    return super.transform(value, format);
  }
}