import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorerService } from 'src/app/services/storer.service';
import { SwitchThemeService } from 'src/app/services/switch-theme.service';

export interface Data {
  title: string;
  content: string;
  date?: Date;
  id: number;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  storedNotes: Data[] = [];
  public currentNote: Data = { title: '', content: '', id: 0 }
  public showContent: boolean = true;
  public noActionDone: boolean = false;
  public wordsCount: number = 0;
  public currentNoteId: number = 1;
  public defaultTheme: string = 'snow';
  toolbarConfigs = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                       // remove formatting button
      ['link', 'image']                   // link and image, video

    ]
  };

  //To get mobile support
  destroyed = new Subject<void>();
  displayNameMap = new Map([[Breakpoints.XSmall, 'XSmall'], [Breakpoints.Small, 'Small'], [Breakpoints.Medium, 'Medium'], [Breakpoints.Large, 'Large'], [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(private storerService: StorerService, private breakpointObserver: BreakpointObserver, private modeService: SwitchThemeService) {
    breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge,])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            if ((this.displayNameMap.get(query) == 'Small' || this.displayNameMap.get(query) == 'XSmall')) {
              this.defaultTheme = (this.displayNameMap.get(query) == 'Small' || this.displayNameMap.get(query) == 'XSmall') ? 'bubble' : 'snow'
              this.toolbarConfigs = {
                toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'size': ['small', false, 'large', 'huge'] }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['clean']]
              };
            }
          }
        }
      });
  }

  ngOnInit() {
    this.getStoredNotes();
    this.setDefaultTheme();
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
    this.currentNoteId = this.storedNotes.length;
  }

  save() {
    let index = this.storedNotes.findIndex(e => e.id == this.currentNoteId);
    if (index !== -1) {
      let tmp: Data = { title: this.currentNote.title, content: this.currentNote.content, date: new Date(), id: this.currentNoteId };
      this.storedNotes[index] = tmp;
    }
    else {
      let tmp: Data = { title: this.currentNote.title, content: this.currentNote.content, date: new Date(), id: this.currentNoteId };
      this.storedNotes.push(tmp);
    }
    localStorage.setItem('notes', this.storerService.set('123456$#@$^@1ERF', JSON.stringify(this.storedNotes)));
  }

  newNote() {
    this.currentNoteId = this.currentNoteId + 1;
    this.currentNote = { title: '', content: '', date: new Date(), id: this.currentNoteId };
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    let tmp: string = event.editor.getText();
    this.wordsCount = tmp.split(' ').length;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  setDefaultTheme() {
    let tmp = localStorage.getItem('mode');
    if (tmp !== null) {
      if (tmp === 'dark') {
        this.modeService.switchMode(true);
      }
      else if (tmp === 'light') {
        this.modeService.switchMode(false);
      }
    }
  }
}
