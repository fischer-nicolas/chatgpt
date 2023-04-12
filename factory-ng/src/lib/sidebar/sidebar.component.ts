import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();
  
  @Input() transitionDuration: number = 100;
  content: TemplateRef<any>;

  constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef) { }
  

  ngOnInit(): void {
    document.getElementById('sidebar').style.transitionDuration = this.transitionDuration.toString() + 'ms';

    this.sidebarService.visibilityChange$.pipe(takeUntil(this._destroying$)).subscribe(visible => {
      this.onVisibilityChange(visible);
    });

    this.sidebarService.sidebarContent$.pipe(takeUntil(this._destroying$)).subscribe(content => {
      this.content = content;
      this.cdr.detectChanges();
    });
  }


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  
  private onVisibilityChange(visible: boolean) : void {
    const sidebar = document.getElementById('sidebar');
    
    if(visible) {
      setTimeout(() => {
        sidebar.classList.add('expanded');
        document.getElementById('sidebar-content').style.display = 'block';
      }, 50);
    } else {
      sidebar.classList.remove('expanded');
      document.getElementById('sidebar-content').style.display = 'none';
    }
  }
}
