import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AutoComplete } from 'primeng/autocomplete';
import { Subscription } from 'rxjs';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { ILookupService } from '../../models/ilookup-service';
import { SelectItemFilter } from '../../models/select-item-filter';
import { SelectedItems } from '../../models/selected-items';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.css']
})
export class AutocompleteFilterComponent implements OnInit, AdComponent, OnDestroy, SelectedItems {

  @Input() data: any;
  filter: IFilter;
  textValues: SelectItemFilter[] = [];
  controlName: string;
  optionLabel: string;
  options: any[] = [];
  lookupService: ILookupService;
  valueSelected: any;
  subscrption: Subscription;
  @ViewChild('input') inputElement: AutoComplete;

  constructor(private searchFilterService: SearchFilterService, public panelFilter: PanelFilterComponent) { }

  label: string;
  value: any;

  ngOnDestroy(): void {
    this.subscrption?.unsubscribe();
  }

  ngOnInit(): void {
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.controlName = this.data.controlName;
    this.optionLabel = this.data.optionLabel;
    this.lookupService = this.data.lookupService;
    this.initSelectedValues();

    this.searchFilterService.listenUpdateModel$.subscribe(
      update => {
        this.initSelectedValues();
      }
    );

  }

  initSelectedValues() {
    this.textValues = [];
    const values = this.filter.getData().currentValue;
    values?.forEach(value => {
      this.textValues.push(new SelectItemFilter(value[this.optionLabel], value));
    });
    this.panelFilter.updateControl(this.controlName, values);
  }

  search(event) {
    this.lookupService.getResults(event.query).then(data => {
      this.options = data;
    });
  }

  onAddSelected(event) {
    this.handleNewValueSelected();
  }

  private handleNewValueSelected() {
    if (this.textValues.filter(v => v.label == this.valueSelected[this.optionLabel]).length == 0) {
      let values = [];
      if (this.data.allowMultipleValues || this.textValues.length == 0) {
        values = this.textValues.map(t => t.value);
      }
      else {
        this.textValues = [];
      }
      const addValue = this.valueSelected;
      let val = JSON.stringify(addValue);
      val = JSON.parse(val);
      values.push(val);
      this.panelFilter.updateControl(this.controlName, values);
      this.addItem(new SelectItemFilter(this.valueSelected[this.optionLabel], this.valueSelected));
      this.valueSelected = null;
      this.options = [];
    }
  }

  onAddText() {
    const value = this.valueSelected;
    this.valueSelected = {};
    this.valueSelected[this.optionLabel] = value;
    this.handleNewValueSelected();
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

  setFocus(): void{
    this.inputElement.focusInput();
  }

}
