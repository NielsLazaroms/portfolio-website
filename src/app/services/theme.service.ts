import { Injectable } from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    if(localStorage.getItem(this.themeKey) == null) {
      localStorage.setItem(this.themeKey, Theme.DARK);
    }
    this.activateTheme(this.getCurrentTheme());
  }

  public getCurrentTheme() : Theme {
    let theme = localStorage.getItem(this.themeKey);
    return theme as Theme;
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem(this.themeKey, theme);
    this.activateTheme(theme);
  }


  private activateTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}
