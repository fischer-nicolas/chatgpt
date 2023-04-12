import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss']
})
export class NavigateBackComponent implements OnInit, OnDestroy {

  private readonly _destroying$ = new Subject<void>();
  
  backRoute: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.backRoute = this.getBackRoute();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.backRoute = this.getBackRoute();
      });
  }

  
  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }


  private getBackRoute(): string[] {
    let route = this.route;
    if(!route) {
      return null;
    }

    //Get the first occurence of backRoute parameter among children routes
    while (route?.firstChild && !route?.snapshot?.data?.backRoute) {
      route = route?.firstChild;
    }
    return route?.snapshot?.data?.backRoute;
  }


  navigateBack() {
    this.router.navigate(this.backRoute, { state: { useStorageFilters: true } });
  }
}
