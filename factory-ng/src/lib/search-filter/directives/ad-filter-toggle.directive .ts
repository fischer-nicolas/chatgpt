import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adFilterToggle]'
})
export class AdFilterToggleDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
