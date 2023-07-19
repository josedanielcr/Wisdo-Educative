import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, fromEvent, map, startWith } from 'rxjs';
import { ScreenSizeModel } from 'src/app/models/screenSize.model';
import { BreakpointsConfig } from 'src/config/breakpoints.config';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {

  private screenSize$: Observable<ScreenSizeModel>;

  constructor() {
    this.screenSize$ = fromEvent(window, 'resize')
      .pipe(
        startWith(null),
        map(() => this.getScreenSize())
      );
  }

  private getScreenSize() {
    const screenWidth = window.innerWidth;

    const isDesktop = screenWidth >= BreakpointsConfig.desktop; 
    const isTablet = screenWidth >= BreakpointsConfig.tablet && screenWidth < BreakpointsConfig.desktop;
    const isPhone = screenWidth >= BreakpointsConfig.phone && screenWidth < BreakpointsConfig.tablet;

    return new ScreenSizeModel(isDesktop, isTablet, isPhone);
  }

  public getScreenSizeObservable(): Observable<ScreenSizeModel> {
    return this.screenSize$;
  }

}