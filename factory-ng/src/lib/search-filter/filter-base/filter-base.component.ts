import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import FilterPanelCollapseEvent from '../models/filter-panel-collapse-event.model';
import { IFilter } from '../models/ifilter';
import { SearchFilterService } from '../search-filter.service';

@Component({
  selector: 'app-filter-base',
  templateUrl: './filter-base.component.html',
  styleUrls: ['./filter-base.component.css']
})
export class FilterBaseComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();

  @Input('filter') filter: IFilter;
  dataFilter:any;
  collapsed: boolean = true;
  @Output() onShow = new EventEmitter<void>();

  constructor(private searchFilterService: SearchFilterService) {}
  
  ngOnInit(): void {
    this.dataFilter = this.filter.getData();

    this.searchFilterService.toggleFilterPanelCollapse$.pipe(takeUntil(this._destroying$)).subscribe((event: FilterPanelCollapseEvent) => {
      if(event.target(this.dataFilter)) {
        this.collapsed = event.collapsed;
        this.onAfterToggle();
      }
    });
  }

  onAfterToggle(): void{
    if(!this.collapsed){
      setTimeout(() => {
        this.onShow.emit();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
