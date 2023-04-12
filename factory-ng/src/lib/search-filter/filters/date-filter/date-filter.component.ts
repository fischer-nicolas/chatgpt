import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactoryNgConfig } from '../../../api/factory-ng-config';
import { AdComponent } from '../../models/ad.component';
import { IFilter } from '../../models/ifilter';
import { PanelFilterComponent } from '../../panel-filter/panel-filter.component';
import { SearchFilterService } from '../../search-filter.service';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements AdComponent, OnInit, OnDestroy {

  @Input() data: any;
  suscription: Subscription;
  filter: IFilter;
  label: string;
  controlName: string;
  subscrption: Subscription;
  defaultValues: any[];
  selectedValue: any
  showCalendar: boolean = false;

  todayRange: Date[] = [
    new Date(
      new Date().getFullYear(), 
      new Date().getMonth(), 
      new Date().getDate()
    ), 
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        new Date().getDate()
      )
      .setHours(23, 59, 59, 999)
    )
  ];
  yesterdayRange: Date[] = [
    new Date(
      new Date(
        new Date()
        .setDate(new Date().getDate() - 1)
      )
      .setHours(0, 0, 0, 0)
    ), 
    new Date(
      new Date(
        new Date()
        .setDate(new Date().getDate() - 1)
      )
      .setHours(23, 59, 59, 999)
    )
  ];
  last7DaysRange: Date[] = [
    new Date(
      new Date(
        new Date()
        .setDate(new Date().getDate() - 7)
      )
      .setHours(0, 0, 0, 0)
    ), 
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        new Date().getDate()
      )
      .setHours(23, 59, 59, 999)
    )
  ];
  last30DaysRange: Date[] = [
    new Date(
      new Date(
        new Date()
        .setDate(new Date().getDate() - 30)
      )
      .setHours(0, 0, 0, 0)
    ), 
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        new Date().getDate()
      )
      .setHours(23, 59, 59, 999)
    )
  ];
  currentMonth: Date[] = [
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        1
      )
      .setHours(0, 0, 0, 0)
    ), 
    new Date()
  ];
  lastMonth: Date[] = [
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth()-1, 
        1
      )
      .setHours(0, 0, 0, 0)
    ), 
    new Date(
      new Date(
        new Date().getFullYear(), 
        new Date().getMonth(), 
        0
      )
      .setHours(23, 59, 59, 999)
    )
  ];
  customRange: Date[] = [new Date(), new Date()];
  datePickerValues: Date[];


  constructor(private searchFilterService: SearchFilterService, 
    public panelFilter: PanelFilterComponent,
    private config: FactoryNgConfig) {

    this.defaultValues = [
      { label: this.getTranslation("todayRange"), value: this.todayRange, key: '1' },
      { label: this.getTranslation("yesterdayRange"), value: this.yesterdayRange, key: '2' },
      { label: this.getTranslation("last7DaysRange"), value: this.last7DaysRange, key: '3' },
      { label: this.getTranslation("last30DaysRange"), value: this.last30DaysRange, key: '4' },
      { label: this.getTranslation("currentMonth"), value: this.currentMonth, key: '5' },
      { label: this.getTranslation("lastMonth"), value: this.lastMonth, key: '6' },
      { label: this.getTranslation("customRange"), value: this.customRange, key: '7' }
    ];
  }

  ngOnInit(): void {
    this.controlName = this.data.controlName;
    this.filter = this.searchFilterService.getFilterByControl(this.data.controlName);
    this.initSelectedValues();
    this.subscrption = this.searchFilterService.listenUpdateModel$.subscribe(
      update => {
        this.showCalendar = false;
        this.selectedValue = null;
        this.datePickerValues = null;
        this.initSelectedValues();
      }
    );
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  initSelectedValues() {
    let value = this.filter.getData().currentValue;
    if (value && value.length > 0) {
      const valueFilter = this.defaultValues.find(v => {
        if (v.value[1] != null) {
          return this.isEqual(v.value[0], new Date(value[0])) && this.isEqual(v.value[1], new Date(value[1]));
        } else {
          return this.isEqual(v.value[0], new Date(value[0]))
        }
      }
      );

      if (valueFilter && valueFilter?.key != '7') {
        this.showCalendar = false;
        this.selectedValue = valueFilter.value;
      } else {
        this.showCalendar = true;
        let valueSel = [new Date(value[0]), value[1] != null ? new Date(value[1]) : null];
        this.defaultValues[6].value = valueSel;
        this.datePickerValues = valueSel;
        this.selectedValue = valueSel;
      }
    }
    this.updateFormFilter(value);
  }

  onSelectOption(key: string) {
    if (key === '7') {
      this.showCalendar = true;
      this.updateFormFilter(this.datePickerValues);
    } else {
      this.showCalendar = false;
      this.updateFormFilter(this.selectedValue);
    }
  }

  private isEqual(value1: Date, value2: Date): boolean {
    return value1.getFullYear() == value2.getFullYear() &&
      value1.getMonth() == value2.getMonth() &&
      value1.getDate() == value2.getDate();

  }

  updateCalendarValue(value: any) {
    this.defaultValues.pop();
    this.defaultValues.push({ label: this.getTranslation("customRange"), value: this.datePickerValues, key: '7' });
    this.selectedValue = this.datePickerValues;
    this.updateFormFilter(this.datePickerValues);
  }

  updateFormFilter(value: any) {
    this.panelFilter.updateControl(this.controlName, value);
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
