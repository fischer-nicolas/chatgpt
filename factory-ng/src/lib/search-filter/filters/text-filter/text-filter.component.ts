import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { InputMask } from 'primeng/inputmask';
import { Subscription } from 'rxjs';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { SelectItemFilter } from '../../models/select-item-filter';
import { SelectedItems } from '../../models/selected-items';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.css']
})
export class TextFilterComponent implements OnInit, AdComponent, SelectedItems, OnDestroy {

  @Input() data: any;
  filter: IFilter;

  label: string;
  controlName: string;
  formInput: UntypedFormGroup;

  selectedValues: any[] = [];

  textValues: SelectItemFilter[] = [];

  controlInput: string = "inputControl";
  subscrption: Subscription;
  inputType: string;
  mask: any = null;
  @ViewChild('input') inputElement: ElementRef;
  @ViewChild('inputMask') inputMaskElement: InputMask;

  constructor(private searchFilterService: SearchFilterService, 
    public panelFilter: PanelFilterComponent) { }

  ngOnDestroy(): void {
    this.subscrption?.unsubscribe();
  }

  ngOnInit(): void {
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.initFormInput();
    this.controlName = this.data.controlName;
    this.inputType = this.data.inputType;
    this.mask = this.data.mask;
    this.initSelectedValues();

    this.subscrption = this.searchFilterService.listenUpdateModel$.subscribe(
      update => {
        this.initSelectedValues();
      }
    );
  }

  initFormInput() {
    const formControl = new UntypedFormControl();
    if (this.data.inputValidations) {
      formControl.setValidators(this.data.inputValidations);
    }
    this.formInput = new UntypedFormGroup({});
    this.formInput.addControl(this.controlInput, formControl);
  }

  onAddText(event = null) {
    if(!event || event.code === 'Enter') {
      const addValue = this.formInput.get(this.controlInput).value;
      if (
        this.formInput.valid && addValue &&
        this.textValues.filter(v => v.label == addValue).length == 0
      ) {
        let values = []
        let val = JSON.stringify(addValue);
        val = JSON.parse(val);

        if (this.data.allowMultipleValues || this.textValues.length == 0) {
          values = this.textValues.map(t => t.value);
        }
        else {
          this.textValues = [];
        }
        values.push(val);
        this.panelFilter.updateControl(this.controlName, values);
        this.textValues.push(new SelectItemFilter(val, val));
        this.formInput.reset();;
      }
    }
  }

  addItem(item: SelectItemFilter) {
    this.textValues.push(item);
  }

  removeItem(item: SelectItemFilter) {
    let values = this.panelFilter.formFilter.get(this.controlName).value;
    if (values) {
      const index = values.indexOf(item.value);
      values.splice(index, 1);
      this.panelFilter.formFilter.get(this.controlName).setValue(values);
    }
  }

  initSelectedValues() {
    this.textValues = [];
    const values = this.filter.getData().currentValue;
    values?.forEach(value => {
      this.textValues.push(new SelectItemFilter(value, value));
    });
    this.panelFilter.updateControl(this.controlName, values);
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let arrayText = pastedText.split("\n");
    arrayText.filter(f => f.length > 0).forEach(v => { this.formInput.get(this.controlInput).setValue(v); this.onAddText(); });
    event.preventDefault();
  }

  setFocus(): void{
    if(this.mask){
      this.inputMaskElement.focus();
    }
    else{
      this.inputElement.nativeElement.focus();
    }
  }
}
