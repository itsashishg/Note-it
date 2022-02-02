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
    "--bg-color": "#fff",
    "--border-color": "1px solid #f2f2f2",
    "--font-color": "#000",
  }
};

export var dark: Mode = {
  name: "dark",
  properties: {
    "--bg-color": "#233541",
    "--border-color": "1px solid #ff4e4e",
    "--font-color": "#fff",
  }
};
