import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles:[`
    h3{
        color : navajowhite;
    }`
  ]
})
export class AppComponent {
  title = 'my-first-app';

  username : string = ''
  serverCreationStatus : string = "No server was created!"
  isAvailable = false

  servers =['TestServer' , 'TestServer1']


  constructor() {
    setTimeout(() =>{
      this.isAvailable = true
    },2000)
  }

  onCreateServer(){
    this.serverCreationStatus = " A server has been created"
    this.servers.push(this.serverCreationStatus);
  }

  onUpdateServerName(event: Event) {
    console.log(event)
    this.serverCreationStatus = (<HTMLInputElement>event.target).value;

  }

  doThis() {
    this.username =''
    this.serverCreationStatus = (<HTMLInputElement>event.target).value;
    this.servers.push(this.serverCreationStatus);


  }

  getColor(){

  }
}
