import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class PreviousRouteService {

  private previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log('prev-------------' + this.currentUrl);

        console.log('prev-------------' + this.previousUrl);
      };
    });
  }

  public getPreviousUrl() {

    return this.previousUrl;
  }


  isStillActive(route: string) {
    let flag = false;
    if (route !== this.currentUrl && this.currentUrl==='/dashboard/documents') {
        if(route===this.previousUrl)
        return true;
    }
    return false;
  }
}