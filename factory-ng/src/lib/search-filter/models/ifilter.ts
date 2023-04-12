import { Type } from "@angular/core";

export interface IFilter {  

    getData(): any;

    getComponent():Type<any>;    

    updateValue(value:any);

    rollback();

    clear();

    getQueryString(): string[];
        
    getState(): any;
}
