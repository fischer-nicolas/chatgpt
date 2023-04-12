import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { AutocompleteFilterComponent } from "../filters/autocomplete-filter/autocomplete-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";
import { ILookupService } from "./ilookup-service";

export class AutocompleteFilter extends Filter implements IFilter{
   
    lookupService:ILookupService;
    optionLabel:string;
    optionCode:string;

    constructor(
        lookupService:ILookupService,
        optionCode:string,
        optionLabel:string,
        value:any[],
        controlName:string,
        label:string,
        validations:Validators[],
        allowMultipleValues: boolean = false
    ){
        super(value, controlName, label, validations, allowMultipleValues);                   
        this.lookupService = lookupService;
        this.optionLabel = optionLabel;              
        this.optionCode = optionCode;            
    }

    getQueryString() {
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [''];
        }
        if(Array.isArray(value)) {
            return value.map(e => this.getData().controlName + '=' + e[this.optionCode]);
        }
        else {
            return [this.getData().controlName + '=' + value];
        }
    }

    getState() {
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [];
        }

        return value;
    }

    getComponent(): Type<any> {
        return AutocompleteFilterComponent;
    }
            
}


