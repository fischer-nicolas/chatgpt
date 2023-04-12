import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarTypeView } from 'primeng/calendar';
import { Subscription } from 'rxjs';
import { FactoryNgConfig } from '../../../api/factory-ng-config';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-date-simple-filter',
  templateUrl: './date-simple-filter.component.html',
  styleUrls: ['./date-simple-filter.component.scss']
})
export class DateSimpleFilterComponent implements AdComponent, OnInit, OnDestroy {

  @Input() data: any;
  minDate:Date;
  maxDate:Date;
  view:CalendarTypeView;
  suscription: Subscription;
  filter: IFilter;
  label: string;
  controlName: string;
  subscrption: Subscription;
  selectedValue: any;
  datePickerValue: Date;  
  @ViewChild('input') inputElement: Calendar;

  constructor(private searchFilterService: SearchFilterService, 
    public panelFilter: PanelFilterComponent,
    private config: FactoryNgConfig) { }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.controlName = this.data.controlName;
    this.minDate = this.data.minDate;
    this.maxDate = this.data.maxDate;
    this.view = this.data.view;
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.initSelectedValues();
    this.subscrption = this.searchFilterService.listenUpdateModel$.subscribe(
      update => {        
        this.selectedValue = null;
        this.datePickerValue = null;
        this.initSelectedValues();
      }
    );
  }

  initSelectedValues() {
    let value = this.filter.getData().currentValue;
    if (value && value.length > 0) {            
        this.selectedValue = value;
        this.datePickerValue = new Date(value);
    } 
    this.updateFormFilter(value);
  }

  updateFormFilter(value: any) {
    this.panelFilter.updateControl(this.controlName, value);
  }

  updateCalendarValue(value: any) {    
    this.selectedValue = value;
    this.updateFormFilter(value);
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
