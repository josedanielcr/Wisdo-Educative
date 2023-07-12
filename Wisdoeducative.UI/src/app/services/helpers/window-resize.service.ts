import { HostListener, Injectable } from '@angular/core';
import { BreakpointsConfig } from 'src/config/breakpoints.config';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {

    public isDesktop: boolean;
    public isTablet: boolean;
    public isPhone: boolean;
  
    constructor() {
      this.updateScreenSize();
    }
  
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.updateScreenSize();
    }
  
    private updateScreenSize() {
      const screenWidth = window.innerWidth;
      this.isDesktop = screenWidth >= BreakpointsConfig.desktop; 
      this.isTablet = screenWidth >= BreakpointsConfig.tablet 
        && screenWidth < BreakpointsConfig.desktop;
      this.isPhone = screenWidth < BreakpointsConfig.tablet 
        && screenWidth >= BreakpointsConfig.phone;
    }
}