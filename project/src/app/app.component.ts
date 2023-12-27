import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  noteIndexes(): number[] {
    const numberOfNotes = 3; // Adjust this based on the number of notes you want
    return Array.from({ length: numberOfNotes }, (_, index) => index);
  }
}
