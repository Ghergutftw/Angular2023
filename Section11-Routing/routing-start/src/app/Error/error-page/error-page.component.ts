import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.data.subscribe(value =>{
      this.errorMessage = value['message'];
    })
  }

}
