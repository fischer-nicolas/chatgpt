import { NgModule } from '@angular/core';
import { HasPrivilegeDirective } from './has-privilege.directive';



@NgModule({
  declarations: [
    HasPrivilegeDirective
  ],
  exports: [
    HasPrivilegeDirective
  ]
})
export class PrivilegeModule { }
