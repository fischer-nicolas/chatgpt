import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FieldOrder } from '../../models/field-order.model';


@Component({
  selector: 'fwk-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  @Input("fields") fields: FieldOrder[];
  fieldSelected: FieldOrder;
  directionSelected: string;
  directions: string[] = ["asc", "desc"];
  dataSelected: any;
  @ViewChild("op") panel: OverlayPanel;

  constructor() { }

  ngOnInit(): void {
  }

  showPanel() {
    if (this.dataSelected) {
      this.fieldSelected = this.dataSelected.field;
      this.directionSelected = this.dataSelected.direction;
    } else {
      this.fieldSelected = null;
      this.directionSelected = null;

    }
    this.panel.show(event);

  }

  updateModel() {
    this.dataSelected = { field: this.fieldSelected, direction: this.directionSelected };
  }

}
