import { Validators } from "@angular/forms";

export class Filter {

    public label: string;
    public validations: Validators[];
    public initialValue: any[];
    public currentValue:any[];
    public controlName: string;
    public isApply: boolean;
    public itemsApply: number;
    public allowMultipleValues: boolean;
    public inputType: string;

    constructor(value: any[], controlName: string, label: string, validations: Validators[],allowMultipleValues) {
        this.label = label;
        this.initialValue = value;
        this.currentValue = value;
        this.validations = validations;
        this.label = label;
        this.controlName = controlName;
        this.allowMultipleValues = allowMultipleValues;
        this.isApply = (value != null && value.length > 0);
        this.itemsApply = (value != null ? value.length : 0);
    }

    getData() {
        return this;
    }

    updateValue(value:any){
        this.currentValue = value;
        this.checkStatus();        
    }

    rollback(){
        this.currentValue = this.initialValue;
        this.checkStatus();        
    }

    checkStatus(){
        this.isApply = (this.currentValue != null && this.currentValue.length > 0);
        this.itemsApply = (this.currentValue != null ? this.currentValue.length : 0);
    }

    clear(){
        this.currentValue = [];
        this.checkStatus();
    }

}