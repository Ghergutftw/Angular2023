import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map} from "rxjs/operators";
import {PostModel} from "./models/post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts: PostModel[] = [];
  isFetching: boolean = false
  error = null;
  errorCode : number= 0;
  errorMessage : any

  private errorSub: Subscription;



  constructor(private http: HttpClient, private service: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.service.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.service.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  onCreatePost(postData: PostModel) {
    this.service.createAnDStorePost(postData)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.service.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.service.deletePosts().subscribe(value => {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.error = null
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
