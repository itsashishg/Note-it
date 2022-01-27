import { Component, OnInit } from '@angular/core';
import { Data, StartComponent } from '../start/start.component';

@Component({
  selector: 'app-sidelist',
  templateUrl: './sidelist.component.html',
  styleUrls: ['./sidelist.component.css']
})
export class SidelistComponent implements OnInit {
  //Variables Declaration
  isExpanded: boolean = false;
  data!: Data;
  storedNotes: Data[] = [];
  constructor(private start: StartComponent) { }

  ngOnInit() {
    this.getStoredNotes();
  }

  getStoredNotes() {
    let fetchedFromStorage: string | null = localStorage.getItem('notes');
    if (fetchedFromStorage !== null) {
      let tmp: Data[] = JSON.parse(fetchedFromStorage);
      this.storedNotes = tmp;
    }
    else {
      console.log('No previously stored notes found...');
    }
  }

  selectNote(row: Data) {
    this.start.currentNote = row;
    this.start.noActionDone = true;
    this.start.showContent = true;
  }
}
