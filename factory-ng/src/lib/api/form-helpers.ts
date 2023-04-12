import { AbstractControl, UntypedFormArray, UntypedFormGroup } from "@angular/forms";


/**Marks a control and its descendants as dirty and updates their validities*/
export function markAllAsDirtyAndUpdateValidity(control: AbstractControl<any,any> | null) {
    if(control) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
        //Propagate recursively to children
        if(control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
            for (const child in control.controls) {
                markAllAsDirtyAndUpdateValidity(control.get(child));
            }
        }
    }
}


/**Updates a control and its descendants values and validites*/
export function updateAllValuesAndValidites(control: AbstractControl<any,any> | null) {
    if(control) {
        control.updateValueAndValidity({ onlySelf: true });
        //Propagate recursively to children
        if(control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
            for (const child in control.controls) {
                updateAllValuesAndValidites(control.get(child));
            }
        }
    }
}


export function shouldDisplayFormControlError(control: AbstractControl | null | undefined) : boolean {
    if(!control) {
        return false;
    }
    return control.invalid && control.dirty && control.touched;
}