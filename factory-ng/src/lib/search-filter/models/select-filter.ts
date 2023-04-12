import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { SelectFilterComponent } from "../filters/select-filter/select-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";
import { SelectItemFilter } from "./select-item-filter";

export class SelectFilter extends Filter implements IFilter {

    options: any[];
    optionLabel: string;
    optionsChanged$ = new Subject<SelectItemFilter[]>();

    constructor(
        options: any[], 
        optionLabel: string, 
        value: any[], 
        controlName: string, 
        label: string, 
        validations: Validators[], 
        allowMultipleValues: boolean = false,
        public showFiltering: boolean = false
    ) {
        super(value, controlName, label, validations,allowMultipleValues);
        this.options = options;
        this.optionLabel = optionLabel;
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
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [];
        }

        return value;
    }

    getComponent(): Type<any> {
        return SelectFilterComponent;
    }
    
    getData() {
        return this;
    }

    setOptions(options: SelectItemFilter[]) {
        this.options = options;
        this.optionsChanged$.next(this.options);
    }
}
