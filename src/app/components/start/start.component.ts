import { Component, OnInit } from '@angular/core';

export interface Data {
  title: string;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  storedNotes: Data[] = [];
  title: string = '';
  content: string = '';
  showContent: boolean = true;
  noActionDone: boolean = false;
  
  constructor() { }

  ngOnInit() {
    this.getStoredNotes();
  }

  isContentFilled() {
    if (this.title.length !== 0)
      this.showContent = true;
    else
      this.showContent = true;
  }

  getStoredNotes() {
    let fetchedFromStorage: string | null = localStorage.getItem('notes');
    if (fetchedFromStorage !== null) {
      this.storedNotes = JSON.parse(fetchedFromStorage);
    }
  }

  save() {
    let tmp = { title: this.title, content: this.content, date: new Date() };
    console.log('Storing note:', this.storedNotes.push(tmp));
    console.log(this.storedNotes)
    localStorage.setItem('notes', JSON.stringify(this.storedNotes));
  }

  // @HostListener('mouseover') onMouseOver() {
  //   this.isExpanded = true;
  //   console.log("mouseover")
  // }

  // @HostListener('mouseout') onMouseOut() {
  //   this.isExpanded = false;
  // }

}
