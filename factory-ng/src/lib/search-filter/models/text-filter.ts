import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { TextFilterComponent } from "../filters/text-filter/text-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";

export class TextFilter extends Filter implements IFilter {
    
    public inputValidations: Validators[];      
    public mask: any;  

    constructor(
        value:String[],
        controlName:string,
        label:string,
        validations:Validators[],
        inputValidations:Validators[],
        allowMultipleValues: boolean = false,
        inputType:string = 'text',
        mask: any = null
    ){
        super(value,controlName,label,validations,allowMultipleValues);                   
        this.inputValidations = inputValidations;    
        this.inputType = inputType;
        this.mask = mask;
    }
    
    getQueryString() {
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [''];
        }
        if(Array.isArray(value)) {
            return value.map(e => this.getData().controlName + '=' + e);
        }
        else {
            return [this.getData().controlName + '=' + value];
        }
    }

    getState() {
        return this.getData().currentValue;
    }

    getComponent(): Type<any> {
        return TextFilterComponent;
    }
     
}
