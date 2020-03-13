import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var gtag;
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  started = 0;

  constructor() {}

  trackPage(page: string): void {
    //console.log('track page: ', `/${page}`);

    gtag('config', environment.gtagId, {
      'page_title': page,
      'page_path': `/${page}`
    });
  }

  trackPrint(): void {
    gtag('event', 'print', {
      event_category: 'print'
    });
  }

  trackGift(brinde: any): void {
    const attributes = {
      event_category: 'brinde',
      event_label: brinde.type,
      value: brinde.name
    };

    //console.log('print: ', attributes);
    gtag('event', 'brinde', attributes);
  }

  trackTiming(ms: number) {
    gtag('event', 'timing_complete', {
      'name': 'print',
      'value': ms
    });
  }
  
  startTrackingTime() {
    this.started = Date.now();
    //console.log('started tracking time');
  }

  endTrackingTime() {
    const elapsed = Date.now() - this.started;

    //console.log('end timing print: ', elapsed);
    this.trackTiming(elapsed);
  }
}
