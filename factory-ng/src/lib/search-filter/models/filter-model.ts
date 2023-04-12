export class FilterModel{

    controlName:string;
    label:string;
    value:any;

    constructor(controlName:string,label:string,value:any){
        this.controlName = controlName;
        this.label = label;
        this.value = value;
    }

}