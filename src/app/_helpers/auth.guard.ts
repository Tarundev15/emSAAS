import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  originRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // console.log('o_opath',state.url.split('/')[2]);

    const currentUser = this.authenticationService.currentUserValue;
    this.router.navigate(['/eManager']); 
    console.log('currentUser', currentUser);

    if (currentUser) {
        this.router.navigate(['/eManager']); 
      }
      return true;

    }

 

  public hasOriginRoute(): boolean {
    return this.originRoute != null;
  }

 
}
