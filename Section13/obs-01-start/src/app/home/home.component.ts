import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscriptions : Subscription

  constructor() { }

  ngOnInit() {
    // this.firstSubscriptions = interval(1000).subscribe( count =>{
    //   console.log('Timer : ' + count)
    //   }
    // )

    const customIntervalObservable = new Observable(observer =>{
      let count = 0
      setInterval(() =>{
        observer.next(count)
        count++
        if(count === 5){
          observer.complete()
        }
        if(count > 3){
          observer.error(new Error("Counter Reached 3"))
        }
      },1000);
    })



    this.firstSubscriptions =     customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }),map((data : number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data =>{
      console.log(data)
    } , error => {
      console.log(error);
    },() =>{
      console.log('Completed')
    })
  }

  ngOnDestroy(): void {
    this.firstSubscriptions.unsubscribe()
  }

}
