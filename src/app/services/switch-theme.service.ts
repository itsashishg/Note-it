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
        localStorage.setItem('mode', 'dark');
      });
    }
    else {
      let active = light;
      Object.keys(active.properties).forEach(property => {
        document.documentElement.style.setProperty(property, active.properties[property]);
        localStorage.setItem('mode', 'light');
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
    "--quill-toolbar-color": "#fff",
  }
};

export var dark: Mode = {
  name: "dark",
  properties: {
    "--bg-color": "#1B262C",
    "--border-color": "1px solid #626262",
    "--font-color": "#fff",
    "--quill-toolbar-color": "#fff",
  }
};
