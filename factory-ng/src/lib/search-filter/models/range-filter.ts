import { Type } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { RangeFilterComponent } from "../filters/range-filter/range-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";

export class RangeFilter extends Filter implements IFilter {
    
    constructor(
      value:number[],
      controlName:string,
      label:string,
      validations:Validators[],
      allowMultipleValues: boolean = false,
      public mask?: string
    ){
        super(value,controlName,label,validations,allowMultipleValues);
        if(validations==null){
          validations = [];
        } 
        validations.push(this.minMaxValidator);          
        this.validations = validations; 
        this.isApply = (value != null && value.length > 0);
        this.itemsApply = (value != null && value.length > 0 ? 1 : 0);        
    }

    getQueryString() {
      const value = this.getData().currentValue;
      if(value == undefined || value == null) {
          return [''];
      }
      else {
        let query = [];
        if(value[0]) {
          query.push(this.getData().controlName + 'From=' + value[0]);
        }
        if(value[1]) {
          query.push(this.getData().controlName + 'To=' + value[1]);
        }
        return query;
      }
    }

    getState() {
      return this.getData().currentValue;
    }

    getComponent(): Type<any> {
        return RangeFilterComponent;
    }
    
    checkStatus(){
      this.isApply = (this.currentValue != null && this.currentValue.length > 0);
      this.itemsApply = (this.currentValue != null && this.currentValue.length > 0 ? 1 : 0);
    }

    private minMaxValidator(control: UntypedFormControl) {
      let result;
      if(control.value){
        if(control.value[0] && control.value[1]){
          result = control.value[0]<=control.value[1];
        }else{
          result = true;
        }                   
      }else{
        result = true;
      }
      return result ? null : {wrongValues: control.value};        
    }
    
}




