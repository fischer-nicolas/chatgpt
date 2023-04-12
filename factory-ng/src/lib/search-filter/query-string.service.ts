import { Injectable } from '@angular/core';
import { QueryParamFilter } from './models/query-param-filter';

@Injectable({
  providedIn: 'root'
})
export class QueryStringService {

  constructor() { }
  

  getQueryString(params: Map<string,any> = new Map<string,any>(), queryFilter: QueryParamFilter[] = []) {
    let list = [];
    this.fillListWithParamsData(params, list);

    if(queryFilter?.length) {
      queryFilter.forEach(filter => list = list.concat(filter.value));
    }

    return list?.length ? '?' + list.join('&') : '';
  }


  private fillListWithParamsData(params: Map<string, any>, list: any[]) {
    params.forEach((value: any, key: string) => {
      if (value !== undefined && value !== null) {
        let paramValue;

        switch (key) {
          case 'sortBy':
            //Push sortBy directly into the list
            const properties = value.property.split(',');
            for (const i in properties) {
              list.push(key + '=' + properties[i] + '_' + value.direction);
            }
            break;
          default:
            paramValue = value;
            break;
        }

        //Push paramValue
        if(paramValue !== undefined && paramValue !== null){
          list.push(key + '=' + paramValue);
        }
      }
    });
  }
}
