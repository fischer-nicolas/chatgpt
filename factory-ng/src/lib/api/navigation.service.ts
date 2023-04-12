import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router, UrlCreationOptions } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router, private location: Location) { }


    navigateOnNewTab(commands: any[], navigationExtras?: UrlCreationOptions) {
        const url = this.location.prepareExternalUrl(this.router.serializeUrl(
            this.router.createUrlTree(commands, navigationExtras)
        ));  
        window.open(url, '_blank');
    }

}