import { Component, OnInit } from '@angular/core';
import { StorerService } from 'src/app/services/storer.service';

export interface Data {
  title: string;
  content: string;
  date?: Date;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  storedNotes: Data[] = [];
  public currentNote: Data = { title: '', content: '' }
  public showContent: boolean = true;
  public noActionDone: boolean = false;

  constructor(private storerService: StorerService) { }

  ngOnInit() {
    this.getStoredNotes();
  }

  isContentFilled() {
    if (this.currentNote.title.length !== 0)
      this.showContent = true;
    else
      this.showContent = true;
  }

  public getStoredNotes() {
    let fetchedFromStorage: string | null = localStorage.getItem('notes');
    if (fetchedFromStorage !== null) {
      this.storedNotes = JSON.parse(this.storerService.get('123456$#@$^@1ERF', fetchedFromStorage));
    }
  }

  save() {
    let tmp = { title: this.currentNote.title, content: this.currentNote.content, date: new Date() };
    this.storedNotes.push(tmp);
    localStorage.setItem('notes', this.storerService.set('123456$#@$^@1ERF', JSON.stringify(this.storedNotes)));
  }

}
