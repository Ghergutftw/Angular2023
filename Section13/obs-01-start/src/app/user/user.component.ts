import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from "../user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private ActivatedSubs: Subscription[]

  constructor(private route: ActivatedRoute,
              private service: UserService) {
  }

  ngOnDestroy(): void {
    this.ActivatedSubs.forEach(value => {
      value.unsubscribe()
    })
  }

  ngOnInit() {
    this.ActivatedSubs.push(this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    }))


  }

  onActivate() {
    this.service.thing.next(!this.service.thing.getValue())
  }


}
