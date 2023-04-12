import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adFilterCollapse]'
})
export class AdFilterCollapseDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
