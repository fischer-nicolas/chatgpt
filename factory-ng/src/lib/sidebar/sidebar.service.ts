import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _expanded: boolean = false;

  public visibilityChange$ = new BehaviorSubject<boolean>(false);
  public sidebarContent$ = new BehaviorSubject<TemplateRef<any>>(null);

  constructor() { }

  
  public toggleSidebar() : void {
    if(this._expanded) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }
  
  public openSidebar() : void {
    this.setExpanded(true);
  }
  
  public closeSidebar() : void {
    this.setExpanded(false);
  }


  private setExpanded(value: boolean) : void {
    if(this._expanded !== value) {
      this._expanded = value;
      this.visibilityChange$.next(value);
    }
  }


  public setSidebarContent(content: TemplateRef<any>, left: boolean = true) : void {
    this.sidebarContent$.next(content);
    let doc = document.getElementById('page-content');
    if(!!doc){
      if(left) {           
        doc.style.flexDirection = 'row';      
      } else {
        doc.style.flexDirection = 'row-reverse';
      }
    }
    
  }


  public clearSidebar() {
    this.closeSidebar();
    this.setSidebarContent(null);
    let doc = document.getElementById('page-content');
    if(!!doc){
      doc.style.flexDirection = 'row';
    }    
  }
}
