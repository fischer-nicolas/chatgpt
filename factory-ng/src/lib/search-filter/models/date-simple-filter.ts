import { Type } from "@angular/core";
import { Validators } from "@angular/forms";
import { CalendarTypeView } from "primeng/calendar";
import { DateSimpleFilterComponent } from "../filters/date-simple-filter/date-simple-filter.component";
import { Filter } from "./filter";
import { IFilter } from "./ifilter";

export class DateSimpleFilter extends Filter implements IFilter {

    minDate:Date;
    maxDate:Date;
    view:CalendarTypeView;

    constructor(
        value: Date, 
        controlName: string, 
        label: string, 
        validations: Validators[],        
        minDate:Date,
        maxDate:Date,
        view:CalendarTypeView = 'date'
    ) {
        let valueConst=null;
        if(!!value){
            valueConst=value;
        }
        super(valueConst, controlName, label, validations, false);
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.view = view;
    }

    getQueryString() {
        const value = this.getData().currentValue;
        if(value == undefined || value == null) {
            return [''];
        }
        else {
            return [this.getData().controlName + '=' + value];
        }
    }

    getState() {
        return this.getData().currentValue;
    }

    getComponent(): Type<any> {
        return DateSimpleFilterComponent;
    }


    getData() {
        return this;
    }

    checkStatus() {
        this.isApply = (this.currentValue != null && this.currentValue.length > 0);
        this.itemsApply = (this.currentValue != null && this.currentValue.length > 0 ? 1 : 0);
    }

}
