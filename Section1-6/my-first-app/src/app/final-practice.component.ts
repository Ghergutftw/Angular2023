import { Component } from '@angular/core';

@Component({
  selector: 'app-final-practice',
  templateUrl: './final-practice.component.html',
  styleUrls: ['./final-practice.component.css']
})
export class FinalPracticeComponent {

  isPressed : boolean = false;
  loggedText : string[] = []
  text : string = ''
  logMessage: string;

  logText(logMessage : string) {
    this.loggedText.push(logMessage);
  }
}
