import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FactoryNgConfig } from '../../api/factory-ng-config';
import { IFilter } from '../models/ifilter';
import { SearchFilterService } from '../search-filter.service';

@Component({
  selector: 'fwk-toolbar-filter',
  templateUrl: './toolbar-filter.component.html',
  styleUrls: ['./toolbar-filter.component.scss']
})
export class ToolbarFilterComponent implements OnInit, OnDestroy {

  @Input() storageName: string = null;
  @Input() showFilterApply: boolean = true;
  
  @Output('onShowFilters') onShowFilters = new EventEmitter<any>();
  subscription:Subscription;
  filtersApply:IFilter[];

  constructor(private filterService: SearchFilterService,
    private config: FactoryNgConfig) { }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.filtersApply = this.filterService.getFilter().filter(f => f.getData().isApply);
    this.filterService.listenUpdateModel$.subscribe(
      update =>{
        this.filtersApply = this.filterService.getFilter().filter(f => f.getData().isApply);
      }
    );
    
  }

  onShowPanel(){
    this.filterService.collapseAllFilters();
    this.onShowFilters.emit();
  }

  showFilter(filter: IFilter) {
    this.filterService.collapseAllFilters();
    this.filterService.expandFilterPanel(filter);
    this.onShowFilters.emit();
  }

  onRemove(filter:IFilter){    
    this.filterService.cleanFilter(filter);       
  }
    
  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
