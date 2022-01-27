import { Component, OnInit } from '@angular/core';

interface notesData {
  title: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  data!: notesData;
  title: string = '';
  content: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
