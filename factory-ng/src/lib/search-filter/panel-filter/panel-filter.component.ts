import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FactoryNgConfig } from '../../api/factory-ng-config';
import { AdFilterToggleDirective } from '../directives/ad-filter-toggle.directive ';
import { IFilter } from '../models/ifilter';
import { QueryParamFilter } from '../models/query-param-filter';
import { SearchFilterService } from '../search-filter.service';


@Component({
  selector: 'fwk-panel-filter',
  templateUrl: './panel-filter.component.html',
  styleUrls: ['./panel-filter.component.scss']
})
export class PanelFilterComponent implements OnInit, OnDestroy {

  @Input('filters') filters: IFilter[]=[];
  @Input() storageName: string = null;

  @Output('onApply') onApplyEvent = new EventEmitter<any>();
  @Output('onCloseFilters') onCloseFilters = new EventEmitter<any>();
  
  @ViewChild(AdFilterToggleDirective, { static: true }) adFilterToggle!: AdFilterToggleDirective;

  formFilter:UntypedFormGroup
  itemsApply:number;
  filterUpdate:IFilter[]=[];
  subscription:Subscription;
  
  constructor(private filterService: SearchFilterService,
    private config: FactoryNgConfig) { }
  
  ngOnDestroy(): void {
    this.filterService.setFilterModel([]);
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadComponents(true);
    this.filterService.setFilterModel(this.filters);
    this.filterService.notifyUpdateModel();
    this.subscription = this.filterService.listenRemoveFilter$.subscribe(filter=>{
      this.cleanFilter(filter);
    });    
  }

  loadComponents(reset:boolean) {
    this.formFilter = new UntypedFormGroup({});        
    const viewContainerCollapseRef = this.adFilterToggle.viewContainerRef;  
    viewContainerCollapseRef.clear();   
    this.filters.forEach(f => {
      const adItem = f;
      const componentFactory = viewContainerCollapseRef.createComponent(adItem.getComponent());
      componentFactory.instance.data = adItem.getData();            
      this.formFilter.addControl(adItem.getData().controlName, this.generateFormControl(adItem.getData(),reset));           
    });
  }

  private generateFormControl(data: any, reset:boolean): UntypedFormControl {
    const formControl = new UntypedFormControl();
    formControl.setValidators(data.validations);    
    let value;
    if(!reset){
      value = data.currentValue;
    } else{
      value = data.initialValue;
    }   
    formControl.setValue(value);
    return formControl;
  }

  onCancelFilter(){        
    this.filters.forEach(f=>{
      this.formFilter.get(f.getData().controlName).setValue(f.getData().currentValue);
    }); 
    this.filterService.notifyUpdateModel();
    this.onClose();
  }

  onApplyFilter(){
    this.filters.forEach(f=>{
      let val= JSON.stringify(this.formFilter.get(f.getData().controlName).value);      
      if(val) {
        f.updateValue(JSON.parse(val));
      }
    });
    this.onApplyEvent.emit(this.emitFilter());
    this.filterService.notifyUpdateModel();
    this.onClose();
  }

  onCleanFilter(){
    this.filters.forEach(f=>{
      f.rollback();
      this.formFilter.get(f.getData().controlName).setValue(f.getData().initialValue);
    });
    this.filterService.notifyUpdateModel();
    this.onApplyEvent.emit(this.emitFilter());
    this.onCollapseFilters();        
  }
  
  updateControl(controlName:string,value:any){
    this.formFilter.get(controlName).setValue(value);
  }

  getItemsApply():number{
    let count = 0;
    this.filters.forEach(f=>{
      count+=f.getData().itemsApply;
    });
    this.itemsApply = count;
    return this.itemsApply;
  }

  private emitFilter():any{
    const queryFilter: QueryParamFilter[] = [];
    this.filters
      .filter(f=>f.getData().isApply)
      .forEach(r => queryFilter.push(
        new QueryParamFilter(
          r.getData().controlName,
          r.getQueryString(),
          r.getState()
        )
      ));

    return queryFilter;
  }

  cleanFilter(filter:IFilter){    
    filter.clear();
    this.formFilter.get(filter.getData().controlName).setValue(filter.getData().currentValue);   
    this.filterService.notifyUpdateModel();
    this.onApplyEvent.emit(this.emitFilter());
  }

  onCollapseFilters() {
    this.filterService.collapseAllFilters();
  }
  
  onClose() {
    this.onCollapseFilters();
    this.onCloseFilters.emit();
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
