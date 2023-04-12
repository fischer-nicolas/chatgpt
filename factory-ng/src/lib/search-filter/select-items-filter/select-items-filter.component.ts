import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItemFilter } from '../models/select-item-filter';

@Component({
  selector: 'factory-select-items-filter',
  templateUrl: './select-items-filter.component.html',
  styleUrls: ['./select-items-filter.component.css']
})
export class SelectItemsFilterComponent implements OnInit {

  @Input() items:SelectItemFilter[];
  @Output('onRemove') removeEvent = new EventEmitter<SelectItemFilter>();  
  @Input() removable:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem(event: any, item: any) {    
    this.items.splice(this.items.indexOf(item),1);
    this.removeEvent.emit(item);
  }

}
