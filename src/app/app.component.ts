import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  $navigationSubscription: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private analytics: AnalyticsService
  ) {
    this.initializeApp();

    window.addEventListener("startTracking", () => {
      this.analytics.startTrackingTime();
    });

    window.addEventListener("endTracking", () => {
      this.analytics.endTrackingTime();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.$navigationSubscription = this.router.events.subscribe(async (event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        let url = event.url.replace('/', '');
        let index = url.indexOf('?');
        if (index != -1) {
          url = url.substr(0, url.indexOf('?'));
        }
        
        this.analytics.trackPage(url);
      }
    });
  }
}
