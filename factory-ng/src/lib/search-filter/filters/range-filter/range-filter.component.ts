import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { InputNumber } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import { FactoryNgConfig } from '../../../api/factory-ng-config';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent implements OnInit, AdComponent, OnDestroy {

  @Input() data: any;
  filter: IFilter;

  controlName: string;
  min: number;
  max: number;
  mask: string;

  subscrption:Subscription;
  @ViewChild('input') inputElement: InputNumber;
  @ViewChild('inputMask') inputMaskElement: InputMask;

  constructor(private searchFilterService: SearchFilterService, 
    public panelFilter: PanelFilterComponent,
    private config: FactoryNgConfig) { }
  
  ngOnDestroy(): void {
    this.subscrption?.unsubscribe();
  }

  ngOnInit(): void {
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.controlName = this.data.controlName;
    this.mask = this.data.mask;
    this.initSelectedValues();

    this.subscrption = this.searchFilterService.listenUpdateModel$.subscribe(
      update => {
        this.initSelectedValues();
      }
    );
  }

  initSelectedValues() {
    let value = this.filter.getData().currentValue;
    this.min = value ? value[0] : null;
    this.max = value ? value[1] : null;
    this.panelFilter.updateControl(this.controlName, value);
  }

  modelChange(event: any) {
    let selectedValues = [this.min ? this.min : null, this.max ? this.max : null];
    if (selectedValues[0] == null && selectedValues[1] == null) {
      selectedValues = null;
    }
    this.panelFilter.updateControl(this.controlName, selectedValues);
  }
  
  setFocus(): void{
    if(this.mask){
      this.inputMaskElement.focus();
    }
    else{
      this.inputElement.input.nativeElement.focus();
    }
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
