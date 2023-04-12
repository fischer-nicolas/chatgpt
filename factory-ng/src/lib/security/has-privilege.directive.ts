import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PrivilegeService } from './privilege.service';

@Directive({
  selector: '[hasPrivilege]'
})
export class HasPrivilegeDirective implements OnInit {

  @Input('hasPrivilege') privilege: string;

  constructor(
    private privilegeService: PrivilegeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }


  ngOnInit(): void {
    this.applyPrivilege();
  }


  private applyPrivilege(): void {
    if(this.privilegeService.isPrivilegeValid(this.privilege)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
