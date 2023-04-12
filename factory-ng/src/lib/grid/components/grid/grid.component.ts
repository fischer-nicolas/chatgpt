import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { GridColumn } from '../../models/grid-column.model';
import { RowAction } from '../../models/row-action.model';
import { SortBy } from '../../models/sort-by.model';
import { CellGridPipe } from '../../pipes/cell-grid.pipe';
import { FactoryNgConfig } from '../../../api/factory-ng-config';
import { PrivilegeService } from '../../../security/privilege.service';

@Component({
  selector: 'fwk-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() headerHeight: string = '70px';
  @Input() loading: boolean = false;
  @Input() pageSize: number;
  @Input() rows = [];
  @Input() rowActions: RowAction[] = [];
  @Input() showDownload: boolean = false;
  @Input() storageName: string;
  @Input() virtualRowHeight: number;
  @Input() cellTooltipPosition: string = "right";

  private _columns: GridColumn[] = [];
  get columns(): GridColumn[] {
    return this._columns;
  }
  @Input() set columns(cs: GridColumn[]) {
    this._columns = cs;
    this.colsUserVisible = cs?.filter(c => c.userVisible);
    this.colsGridVisible = this.colsUserVisible;
  }

  @Input() set rowsDataChange(value: any) {
    if (value && value.pageNumber !== -1) {
      const first = this.pageSize * value.pageNumber;
      this.virtualRows.splice(first, this.pageSize, ...this.rows);
      this.virtualRows = [...this.virtualRows];

      if (this.virtualPages.findIndex(p => p === value.pageNumber) === -1) {
        this.virtualPages.push(value.pageNumber);
      }
    }
  }
  
  private _totalCount: number;
  get totalCount(): number {
    return this._totalCount;
  }
  @Input() set totalCount(v: number) {
    this._totalCount = v;
    this.reloadGrid();
  }

  @Output('onLazyLoad') onLazyLoadEvent = new EventEmitter<any>();
  @Output('onDownload') onDownload = new EventEmitter<void>();

  virtualRows: any[] = [];
  virtualPages: number[] = [];
  colsUserVisible: GridColumn[] = [];
  colsGridVisible: GridColumn[] = [];
  first: number;
  newRows: number;
  showActionColumn: boolean = false;
  rowSelected: any;
  visible: boolean = true;
  previousSortBy: SortBy = new SortBy(null, null);

  /**Total height of the table, sum of the header and the scrollable content */
  get tableHeight(): string {
    return `calc(${this.headerHeight} + ${this.virtualRows?.length * this.virtualRowHeight}px)`;
  }

  constructor(
    private cellGridPipe: CellGridPipe,
    private config: FactoryNgConfig,
    private privilegeService: PrivilegeService,    
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.rowActions.length > 0) {
      this.showActionColumn = true;
    }
  }
  

  loadLazy(event: LazyLoadEvent) {
    event["sortBy"] = this.getSortBy(event);
    event["pagesToLoad"] = this.getPagesToLoad(event);

    this.onLazyLoadEvent.emit(event);
  }
  download(){
    this.onDownload.emit();
  }

  private getSortBy(event: LazyLoadEvent) {
    let sortBy = null;
    if (event.sortField) {
      sortBy = new SortBy(event.sortField, event.sortOrder === 1 ? 'asc' : 'desc');
    }
    return sortBy;
  }

  getPagesToLoad(event) {
    if (event.sortBy && (
        this.previousSortBy.property != event.sortBy.property
        || this.previousSortBy.direction != event.sortBy.direction
    )) {
      this.previousSortBy.property = event.sortBy.property;
      this.previousSortBy.direction = event.sortBy.direction;
      this.resetVirtualProps();
    }
    const firstPageNumber = Math.floor(event.first / this.pageSize);
    let lastElement = event.last ?? (event.first + this.pageSize);
    const pageCount = Math.ceil(lastElement / this.pageSize);
    let pagesToLoad = [];

    for (let index = 0; index < pageCount; index++) {
      const pageNumber = firstPageNumber + index;
      if (this.virtualPages.findIndex(p => p === pageNumber) === -1) {
        pagesToLoad.push(pageNumber);
      }
    }
    return pagesToLoad;
  }

  getColumnWidthStyle(width: string): string {
    if (!width) {
      return '';
    }
    return `min-width: ${width};`;
  }

  getRowHeightStyle() {
    return 'height: ' + this.virtualRowHeight + 'px;';
  }

  rowActionColumnClick(rowData) {
    this.rowSelected = rowData;
  }

  handleActionItemClick(action: RowAction) {
    this.rowActions.find(a => a.code === action.code).onClick(this.rowSelected);
  }

  disableToolTip(tooltipContent) {
    const contentFormated = this.cellGridPipe.transform(tooltipContent);
    return contentFormated === '' || contentFormated === null;
  }

  showActionItem(action: RowAction) {
    return action.visible(this.rowSelected) &&
      (!action.privilege 
        || typeof action.privilege === 'string' && this.privilegeService.isPrivilegeValid(action.privilege))
        || typeof action.privilege === 'function' && this.privilegeService.isPrivilegeValid(action.privilege(this.rowSelected));
  }

  updateCols() {
    const colsVisible = this.columns.filter(c => c.gridVisible);
    const frozenCols = colsVisible.filter(c => c.frozen).sort(this.sortGridColumns());
    const nonFrozenCols = colsVisible.filter(c => !c.frozen).sort(this.sortGridColumns());

    this.colsGridVisible = frozenCols.concat(nonFrozenCols);
  }

  private sortGridColumns(): (a: GridColumn, b: GridColumn) => number {
    return function (a, b) {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    };
  }

  navigateCellLink(column: GridColumn, row: any) {
    this.router.navigate(column.link(row));
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }


  private reloadGrid() {
    if (this.totalCount >= 0) {
      this.resetVirtualProps();

      this.visible = false;
      setTimeout(() => this.visible = true, 50);
    }
  }
  

  private resetVirtualProps() {
    this.virtualRows = Array.from({ length: this.totalCount });
    this.virtualPages = [];
  }

}
