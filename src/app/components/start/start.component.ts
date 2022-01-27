import { Component, OnInit } from '@angular/core';

interface Data {
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

  data!: Data;
  storedNotes: Data[] = [];
  title: string = '';
  content: string = '';
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getStoredNotes();
  }

  isContentFilled() {
    if (this.title.length !== 0)
      this.isExpanded = true;
    else
      this.isExpanded = false;
  }

  getStoredNotes() {
    let fetchedFromStorage: string | null = localStorage.getItem('notes');
    if (fetchedFromStorage !== null) {
      let tmp: Data = JSON.parse(fetchedFromStorage);
      console.log(tmp);
    }
    else {
      console.log('No previously stored notes found...');
    }
  }

  save() {
    this.data = { title: this.title, content: this.content, date: new Date() };
    console.log('Storing note:', this.storedNotes.push(this.data));
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
