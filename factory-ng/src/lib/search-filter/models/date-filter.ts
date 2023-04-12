import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { DateFilterComponent } from "../filters/date-filter/date-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";

export class DateFilter extends Filter implements IFilter {

    constructor(
        value: Date[], 
        controlName: string, 
        label: string, 
        validations: Validators[],
        allowMultipleValues: boolean = false
    ) {
        super(value, controlName, label, validations, allowMultipleValues);
    }

    getQueryString() {
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [''];
        }
        else {
            let list = [];
            if(value[0]) {
                list.push(this.getData().controlName + 'From=' + value[0])
            }
            if(value[1]) {
                list.push(this.getData().controlName + 'To=' + value[1])
            }
            return list;
        }
    }

    getState() {
        return this.getData().currentValue;
    }

    getComponent(): Type<any> {
        return DateFilterComponent;
    }


    getData() {
        return this;
    }

    checkStatus() {
        this.isApply = (this.currentValue != null && this.currentValue.length > 0);
        this.itemsApply = (this.currentValue != null && this.currentValue.length > 0 ? 1 : 0);
    }

}
