import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'cellGrid'
})
export class CellGridPipe implements PipeTransform {

  constructor(
    private datepipe: DatePipe,
    private translateService: TranslateService
  ) { }

  transform(value): string {
    return (
      value instanceof Date ? 
        this.datepipe.transform(value,'dd/MM/yyyy') :
        typeof value == "boolean" 
          ? (value ? this.translateService.instant('general.yesUppercase') : this.translateService.instant('general.noUppercase')) 
          : value
    );
  }
}
