import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FactoryNgConfig } from '../../../api/factory-ng-config';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { SelectItemFilter } from '../../models/select-item-filter';
import { SelectedItems } from '../../models/selected-items';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent implements OnInit, AdComponent, OnDestroy, SelectedItems {

  private readonly _destroying$ = new Subject<void>();
  
  @Input() data: any;
  filter: IFilter;
  controlName: string;
  optionLabel: string;
  optionDisabled: string;
  options: any[];
  selectedValues: any[] = [];
  subscrption: Subscription;
  selectValue: any;
  @ViewChild("p") dropDown:Dropdown;

  constructor(private searchFilterService: SearchFilterService, 
    public panelFilter: PanelFilterComponent,
    private config: FactoryNgConfig
    ) { }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  ngOnInit(): void {
    this.controlName = this.data.controlName;
    this.optionLabel = this.data.optionLabel;
    this.optionDisabled = this.data.allowMultipleValues ? 'selected' : 'disabled';
    this.options = this.data.options;
    this.controlName = this.data.controlName;
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.initSelectedValues();
    this.searchFilterService.listenUpdateModel$.pipe(takeUntil(this._destroying$)).subscribe(
      update => {
        this.initSelectedValues();
      }
    );
    this.data.optionsChanged$.pipe(takeUntil(this._destroying$)).subscribe((os: SelectItemFilter[]) => {
      this.options = os;
      this.initSelectedValues();
    });
  }

  initSelectedValues() {
    this.options = this.options.map(o => {
      return { ...o, selected: false }
    });
    this.selectValue = null;
    this.selectedValues = [];
    let value = this.filter.getData().currentValue;
    if (value) {
      value.forEach(v => {
        let option = this.options.find(o => o.value == v);               
        if(option) {
          let item = new SelectItemFilter(option[this.optionLabel], v);
          this.addItem(item); 
          option.selected = true;
        } 
      });
      this.panelFilter.updateControl(this.controlName, value);
    }
  }

  addItem(item: SelectItemFilter) {
    this.selectedValues.push(item);
    let option = this.options.find(f => f.value == item.value);
    if(option) {
      option.selected = true;
    }
  }

  removeItem(item: SelectItemFilter) {
    this.options.find(f => f.value == item.value).selected = false;
    this.selectedValues = this.selectedValues.filter(v => v.value != item.value);
    let values = this.panelFilter.formFilter.get(this.controlName).value;
    if (values) {
      const index = values.indexOf(item.value);
      values.splice(index, 1);
      this.panelFilter.updateControl(this.controlName, values);
    }
  }

  updateModel(event) {
    if (this.selectValue != null) {
      let values = [];
      if (this.data.allowMultipleValues || this.selectedValues.length == 0) {
        values = this.selectedValues.map(t => t.value);
      }
      else {
        this.selectedValues = [];
      }
      values.push(this.selectValue);
      this.panelFilter.updateControl(this.controlName, values);      
      this.addItem(new SelectItemFilter(this.getOptionByValue(this.selectValue), this.selectValue));
      this.selectValue = null;
      this.dropDown.clear(event);
    }
  }

  convert(value: any) {
    let addValue = {};
    addValue["value"] = value;
    return addValue;
  }

  private getOptionByValue(value){
    const option = this.options.find(f => f.value == value);
    if(option){
      return option[this.optionLabel];
    }else{
      return null;
    }
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
