import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import FilterPanelCollapseEvent from './models/filter-panel-collapse-event.model';
import { IFilter } from './models/ifilter';
import { QueryParamFilter } from './models/query-param-filter';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService { 

  private filters:IFilter[]=[];
  private updateModel: Subject<void> = new Subject<void>();
  public listenUpdateModel$: Observable<any> = this.updateModel.asObservable();

  private removeFilter: Subject<IFilter> = new Subject<IFilter>();
  public listenRemoveFilter$: Observable<any> = this.removeFilter.asObservable();
     
  /**Should be triggered when some filter panels must collapse or expand */
  public toggleFilterPanelCollapse$ = new Subject<FilterPanelCollapseEvent>();
    
  constructor() {           
  }  

  public getFilterByControl(controlName:string):IFilter{
    return this.filters.find(f => f.getData().controlName === controlName);
  }

  public setFilterModel(filter:IFilter[]){
    this.filters = filter;    
  }
  
  public getFilter():IFilter[]{
    return this.filters;
  }
  
  public notifyUpdateModel(){
    this.updateModel.next();
  }

  public cleanFilter(filter:IFilter){
    this.removeFilter.next(filter);
  }
  
  public collapseAllFilters() {
    this.toggleFilterPanelCollapse$.next(new FilterPanelCollapseEvent(true, (f) => true));
  }

  public expandFilterPanel(filter: IFilter) {
    this.toggleFilterPanelCollapse$.next(new FilterPanelCollapseEvent(false, (f) => f.controlName === filter.getData().controlName))
  }

  //#region FilterPanelStorage
  getFilterPanelKey(filterPanelName: string) {
    return 'filterPanel.' + filterPanelName;
  }

  removeFilterPanelState(filterPanelName: string) {
    const filterPanelKey = this.getFilterPanelKey(filterPanelName);
    sessionStorage.removeItem(filterPanelKey);
  }

  savePanelFilterState(filterPanelName: string, queryFilter: any[], filters: IFilter[]) {
    const filterPanelKey = this.getFilterPanelKey(filterPanelName);

    sessionStorage.setItem(filterPanelKey, JSON.stringify(queryFilter));
  } 

  setFilterSavedValue(filters, filterPanelName: string, filterCode) {
    let filterValue = this.getFilterSavedState(filterPanelName, filterCode);
    filters.find(f => f.getData().controlName === filterCode).updateValue(filterValue);
  }

  private getFilterSavedState(filterPanelName: string, filterCode): any[] {
    const filterPanelKey = this.getFilterPanelKey(filterPanelName);
    const filterPanelState = JSON.parse(sessionStorage.getItem(filterPanelKey));
    const filterState = this.findFilterSavedState(filterPanelState,filterCode);
    return filterState;
  }

  private findFilterSavedState(filterPanelState: any[],filterCode: string) {
    let filter = null;

    if(filterPanelState) {
      const index = filterPanelState.findIndex(e => e.name === filterCode);
  
      if ((index || index === 0) && index !== -1) {
        filter = filterPanelState[index].lastState;
      }
    }

    return filter;
  }

  getQueryFilter(filterPanelName: string,queryFilter: QueryParamFilter[],useFiltersFromStorage: boolean): QueryParamFilter[] {
    if (useFiltersFromStorage) {
      const filterPanelKey = this.getFilterPanelKey(filterPanelName);
      const filterPanelState = JSON.parse(sessionStorage.getItem(filterPanelKey));

      if(filterPanelState) {                
        const filters = filterPanelState.map(element => new QueryParamFilter(element.name,element.value,element.lastState));
        return filters;
      }
      else {
        return queryFilter;
      }
    }
    else {
      return queryFilter;
    }

  }
  //#endregion
}
