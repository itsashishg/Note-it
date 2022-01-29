import { Component, OnInit } from '@angular/core';
import { Data, StartComponent } from '../start/start.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StorerService } from 'src/app/services/storer.service';

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

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());
  constructor(private breakpointObserver: BreakpointObserver, private start: StartComponent, private storerService: StorerService) { }

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
    this.start.wordsCount = row.content.length;
    this.start.noActionDone = true;
    this.start.showContent = true;
  }
}
