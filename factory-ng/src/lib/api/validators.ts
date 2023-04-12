import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cuilValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        let rv: boolean = false;

        if ((control.value == null) || (control.value.replaceAll('-', '').length != 11)) {
            return { cuil: { value: control.value } };
        }

        let verificador: number;
        let resultado: number = 0;
        let cuit_nro: string = control.value.replaceAll('-', '');

        const codes: string = "6789456789";

        let cuit_long: number = 0;

        if (/^-?\d+$/.test(cuit_nro)) {
            cuit_long = parseInt(cuit_nro);
            verificador = parseInt(cuit_nro[cuit_nro.length - 1]);
            let x: number = 0;
            while (x < 10) {
                let digitoValidador = parseInt(codes.substring(x, x + 1));
                let digito = parseInt(cuit_nro.substring(x, x + 1));
                let digitoValidacion = digitoValidador * digito;
                resultado += digitoValidacion;
                x++;
            }
            resultado = resultado % 11;
            rv = (resultado == verificador);
        }
        return rv ? null : { cuil: { value: control.value } };
    };
}


export function vehicleDomainValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        let domain : string = control.value;

        if(domain !== null) {
            if(domain.length === 7 && /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/.test(domain)){
                return null;    //XX123XX
            }

            if(domain.length === 6 && /^[A-Z]{3}[0-9]{3}$/.test(domain)){
                return null;    //XXX123
            }
        }

        return { domain: { value: control.value } };
    };
}


/** Evaluates the validator on the control if the predicate function returns true*/
export function conditionalValidator(predicate: () => boolean, validator: ValidatorFn): ValidatorFn  {
    return (control: AbstractControl): ValidationErrors | null => {

        if (predicate()) {
            return validator(control); 
        }
        return null;

    };
}


/**Validator that requires the control's value date to be greater than or equal to the provided Date */
export function minDateValidator(minDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value || minDate <= new Date(control.value)) {
            return null;
        }
        return { min: { min: minDate, actual: control.value } };
    };
}


/**Validator that requires the control's value date to be less than or equal to the provided Date */
export function maxDateValidator(maxDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value || maxDate >= new Date(control.value)) {
            return null;
        }
        return { max: { max: maxDate, actual: control.value } };
    };
}