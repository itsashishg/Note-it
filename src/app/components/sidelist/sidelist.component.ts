import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../start/start.component';

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
  constructor(private router: Router) { }

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
}
