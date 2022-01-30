import { Component, OnInit } from '@angular/core';
import { Data, StartComponent } from '../start/start.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StorerService } from 'src/app/services/storer.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-sidelist',
  templateUrl: './sidelist.component.html',
  styleUrls: ['./sidelist.component.css']
})
export class SidelistComponent implements OnInit {
  //Variables Declaration
  isExpanded: boolean = true;
  data!: Data;
  storedNotes: Data[] = [];
  selectedNoteId: number = -5;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());
  constructor(private breakpointObserver: BreakpointObserver, private start: StartComponent, private storerService: StorerService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getStoredNotes();
  }

  public getStoredNotes() {
    let fetchedFromStorage: string | null = localStorage.getItem('notes');
    if (fetchedFromStorage !== null) {
      let tmp: Data[] = JSON.parse(this.storerService.get('123456$#@$^@1ERF', fetchedFromStorage));
      this.storedNotes = tmp;
      this.start.getStoredNotes();
    }
    else {
      console.log('No previously stored notes found...');
    }
  }

  selectNote(row: Data) {
    this.start.currentNote = row;
    this.selectedNoteId = row.id;
    this.start.wordsCount = row.content.split(' ').length;
    this.start.noActionDone = true;
    this.start.showContent = true;
  }

  deleteNote(index: number) {
    console.log('Delete', index);
    this.storedNotes.splice(index, 1);
    localStorage.setItem('notes', this.storerService.set('123456$#@$^@1ERF', JSON.stringify(this.storedNotes)));
  }

  openSettings() {
    this.bottomSheet.open(SettingsComponent);
  }
}
