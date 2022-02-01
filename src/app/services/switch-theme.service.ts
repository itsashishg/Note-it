import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchThemeService {

  public isDarkMode: boolean = false;

  constructor() { }

  switchMode(flag: boolean): void {
    this.isDarkMode = flag;
    if (this.isDarkMode) {
      let active = dark;
      Object.keys(active.properties).forEach(property => {
        document.documentElement.style.setProperty(property, active.properties[property]);
      });
    }
    else {
      let active = light;
      Object.keys(active.properties).forEach(property => {
        document.documentElement.style.setProperty(property, active.properties[property]);
      });
    }
  }
}

export interface Mode {
  name: string;
  properties: any;
}

export var light: Mode = {
  name: "light",
  properties: {
    // background color
    "--background-default": "#dde1e7",
    // card background color
    "--card-background-default": "#dde1e7",
    // card shadow
    "--background-tertiary-shadow": "-3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288)",
    // button shadow
    "--mat-button-shadow": "2px 2px 5px #babecc, -5px -5px 10px #ffffff73",
    "--mat-button-shadow-hover": "inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73",
    // font color contact
    "--primary-font-color": "#595959",
    "--secondary-font-color": "#595959",
    "--foreground-tertiary": "#000",
    // inner shadow
    "--inner-shadow": "inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73",
    // active status green
    "--active-status": "#467D1D",
    "--stop-status": "red",
    "--hover-status": "#195bab"
  }
};

export var dark: Mode = {
  name: "dark",
  properties: {
    "--background-default": "#233541",
    "--card-background-default": "#233541",
    "--background-tertiary-shadow": "2px 2px 9px #162128, -2px -2px 9px #2f4858",
    "--mat-button-shadow": " inset 0px 0px 0px #162128, inset 0px 0px 0px #2f4858, 4px 4px 9px #162128, -4px -4px 9px #2f4858",
    "--mat-button-shadow-hover": "inset 4px 4px 9px #162128,inset -4px -4px 6px #2f4858, 2px 2px 9px #162128, -2px -2px 9px #2f4858",
    "--primary-font-color": "#8c8c8c",
    "--secondary-font-color": "#f9f9f9",
    "--inner-shadow": "inset 2px 2px 5px #162128, inset -5px -5px 10px #2f4858",
    "--active-status": "#51ff0d",
    "--foreground-tertiary": "#fff",
    "--stop-status": "#DD0004",
    "--hover-status": "#b0a9ff"
  }
};
