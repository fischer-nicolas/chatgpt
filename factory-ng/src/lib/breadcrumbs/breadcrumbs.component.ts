import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();
  
  @Input() home: MenuItem;
  @Input() useHash: boolean = false;

  breadcrumbItems: MenuItem[] = [];
  showBreadcrumbs: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) { }


  ngOnInit(): void {
    this.breadcrumbItems = this.createBreadcrumbs(this.route.root);

    this.router.events
      .pipe(takeUntil(this._destroying$), filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbItems = this.createBreadcrumbs(this.route.root);
      });
  }

  
  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }


  //Constructs the breadcrumbs by diving recursively into routes children
  //Parameters url and breadcrumbs are accumulators that allow each route to inherit data from their parent routes
  private createBreadcrumbs(route: ActivatedRoute, url?: string, breadcrumbs: MenuItem[] = []): MenuItem[] {
    if(!url) {
      url = this.useHash ? '#' : '';
    }
    this.showBreadcrumbs = true;
    const child = route.firstChild;

    if (child) {
      //Append child url segment to the parent routes current url
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      //Append child breadcrumb to the current list
      if(child.snapshot.data && child.snapshot.data.breadcrumb) {
        //Hide breadcrumbs if any node of the tree does
        if(child.snapshot.data.breadcrumb.hidden) {
          this.showBreadcrumbs = false;
          return [];
        }

        let breadcrumb = { 
          label: this.translateService.instant(child.snapshot.data.breadcrumb.label),
          routerLink: url
        };
        breadcrumbs.push(breadcrumb);
      } 
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    //When there is no child, return the current list (base case)
    return breadcrumbs;
  }

}
