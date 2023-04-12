import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PrivilegeService } from './privilege.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate, CanLoad {

  constructor(
    private privilegeService: PrivilegeService,
    private router: Router
  ) { }

  
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    let privilege = route.data["privilege"];
    return of(this.validatePrivilege(privilege));
  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    let privilege = next.data["privilege"] ?? next.root.firstChild.data["privilege"];
    return of(this.validatePrivilege(privilege));
  }


  private validatePrivilege(privilege: string): boolean | UrlTree {
    if (!privilege || this.privilegeService.isPrivilegeValid(privilege)) {
      return true;
    }
    return this.router.createUrlTree(['forbidden']);
  }
  
}
