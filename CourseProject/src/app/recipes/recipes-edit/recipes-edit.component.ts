import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit,OnDestroy {
  id : number;
  editMode = false;

  constructor(private actRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(value => {
      this.id = +value['id']
      this.editMode = value['id'] != null;
      console.log(this.editMode)
    })
  }

  ngOnDestroy(): void {
    this.actRoute.params.subscribe().unsubscribe()
  }

}
