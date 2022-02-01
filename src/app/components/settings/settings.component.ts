import { Component } from '@angular/core';
import { SwitchThemeService } from 'src/app/services/switch-theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  isDarkMode: boolean = false;
  constructor(private mode: SwitchThemeService) { }

  clearAllNotes() {
    document.getElementById('delButton')?.addEventListener('click', e => {
      if (!document.getElementById('delButton')?.classList.contains('delete')) {
        document.getElementById('delButton')?.classList.add('delete');
        setTimeout(() => document.getElementById('delButton')?.classList.remove('delete'), 3200);
      }
      e.preventDefault();
    });
    localStorage.removeItem('notes');
    window.location.reload();
  }

  switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.mode.switchMode(!this.isDarkMode);
  }
}
