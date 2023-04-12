import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { GridColumn } from '../../models/grid-column.model';
import { FactoryNgConfig } from '../../../api/factory-ng-config';

@Component({
  selector: 'fwk-table-configuration',
  templateUrl: './table-configuration.component.html',
  styleUrls: ['./table-configuration.component.scss']
})
export class TableConfigurationComponent implements OnInit {

  @Input() storageName: string = null;
  @Input("modelFromGrid") modelFromGrid: GridColumn[];

  @Output("onApply") orderApply = new EventEmitter<any[]>(); 

  @ViewChild("cp") panel: OverlayPanel;

  modelCopy: GridColumn[]=[];
  usePreviousStateFromStorage: boolean = true;

  constructor(private config: FactoryNgConfig) { }

  private saveColumnsState() {
    if (this.storageName) {
      const list = this.modelCopy.map(e => { 
        let c = {};
        c["frozen"] = e.frozen;
        c["gridVisible"] = e.gridVisible;
        c["field"] = e.field;
        return c;
      });
      const storageValue = JSON.stringify(list);
      localStorage.setItem(this.getStoragekey(), storageValue);
    }
  }

  private getStoragekey(): string {
    return 'gridConfig.' + this.storageName;
  }

  private getColumnsPreviousState() {
    return JSON.parse(localStorage.getItem(this.getStoragekey()));
  }

  ngOnInit(): void {
    this.loadModelFromGrid();
    this.overrideModelFromStorage();
    this.updateModelFromGrid();
  }

  private overrideModelFromStorage() {
    if (this.storageName && this.usePreviousStateFromStorage) {
      const columnsPreviousState = this.getColumnsPreviousState();
      columnsPreviousState?.forEach(e => this.updateColumnProps(e));
      this.usePreviousStateFromStorage = false;
    }
  }

  private updateColumnProps(e: any) {
    const column = this.modelCopy.find(m => m.field === e.field);
    if (column) {
      column.frozen = e.frozen;
      column.gridVisible = e.gridVisible;
    }
  }

  private loadModelFromGrid() {
    this.modelCopy = JSON.parse(JSON.stringify(this.modelFromGrid));
  }

  showPanel() {       
    this.panel.toggle(event);
  }

  updateModelFromGrid() { 
    this.modelFromGrid.forEach((v,i)=>{
      v.gridVisible = this.modelCopy[i].gridVisible;
      v.frozen = this.modelCopy[i].frozen;
    });   
    this.saveColumnsState();
    this.orderApply.emit();
  }

  onVisibleCheckBoxChange(column) {
    if(!column.visibleGrid) {
      column.frozen = false;
    }
  }

  onShowPanel() {
    this.loadModelFromGrid();
  }

  getTranslation(option: string) {
    return this.config.getTranslation(option);
  }
}
